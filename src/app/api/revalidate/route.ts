import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireSanityRevalidateSecret, SANITY_TAG } from '@/lib/sanity';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== requireSanityRevalidateSecret()) {
    return NextResponse.json({ error: 'Invalid secret.' }, { status: 401 });
  }

  revalidateTag(SANITY_TAG);

  return NextResponse.json({ revalidated: true, tag: SANITY_TAG }, { status: 200 });
}
