import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const RATE_LIMIT_MAX_REQUESTS = 6;
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const RATE_LIMIT_KEY_PREFIX = 'booking:ip:';
const LOCAL_CACHE_MAX_KEYS = 5000;

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const localRateLimitCache = new Map<string, number[]>();
let cachedUpstashLimiter: Ratelimit | null | undefined;

function getUpstashLimiter(): Ratelimit | null {
  if (cachedUpstashLimiter !== undefined) {
    return cachedUpstashLimiter;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    cachedUpstashLimiter = null;
    return cachedUpstashLimiter;
  }

  cachedUpstashLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, `${RATE_LIMIT_WINDOW_SECONDS} s`),
    analytics: false,
    prefix: 'ratelimit:booking',
  });

  return cachedUpstashLimiter;
}

function runLocalRateLimit(rateLimitKey: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_SECONDS * 1000;
  const existingHits = localRateLimitCache.get(rateLimitKey) ?? [];
  const recentHits = existingHits.filter((timestamp) => timestamp >= windowStart);

  if (recentHits.length >= RATE_LIMIT_MAX_REQUESTS) {
    const earliestHit = recentHits[0] ?? now;
    const retryAfterMs = Math.max(earliestHit + RATE_LIMIT_WINDOW_SECONDS * 1000 - now, 1000);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(retryAfterMs / 1000),
    };
  }

  recentHits.push(now);
  localRateLimitCache.set(rateLimitKey, recentHits);

  if (localRateLimitCache.size > LOCAL_CACHE_MAX_KEYS) {
    for (const [key, hits] of localRateLimitCache.entries()) {
      const filteredHits = hits.filter((timestamp) => timestamp >= windowStart);
      if (filteredHits.length === 0) {
        localRateLimitCache.delete(key);
      } else {
        localRateLimitCache.set(key, filteredHits);
      }

      if (localRateLimitCache.size <= LOCAL_CACHE_MAX_KEYS) {
        break;
      }
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

function resolveClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    if (firstIp?.trim()) {
      return firstIp.trim();
    }
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp?.trim()) {
    return realIp.trim();
  }

  return 'unknown';
}

export async function checkBookingRateLimit(request: NextRequest): Promise<RateLimitResult> {
  const rateLimitKey = RATE_LIMIT_KEY_PREFIX + resolveClientIp(request);
  const upstashLimiter = getUpstashLimiter();

  if (!upstashLimiter) {
    return runLocalRateLimit(rateLimitKey);
  }

  try {
    const result = await upstashLimiter.limit(rateLimitKey);
    const retryAfterSeconds = result.success
      ? 0
      : Math.max(Math.ceil((result.reset - Date.now()) / 1000), 1);

    return {
      allowed: result.success,
      retryAfterSeconds,
    };
  } catch (error) {
    console.warn('[booking] Upstash rate limit unavailable, falling back to in-memory limiter', error);
    return runLocalRateLimit(rateLimitKey);
  }
}
