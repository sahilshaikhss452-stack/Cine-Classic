export async function getBookingApiMessage(response: Response): Promise<string | null> {
  try {
    const payload = await response.json() as { error?: unknown; message?: unknown } | null;

    if (typeof payload?.error === 'string' && payload.error.trim()) {
      return payload.error;
    }

    if (typeof payload?.message === 'string' && payload.message.trim()) {
      return payload.message;
    }
  } catch {
    // Ignore JSON parsing issues and fall back to a generic message.
  }

  return null;
}
