// In-memory fixed-window rate limiter.
// Serverless caveat (accepted): the Map lives per instance/runtime, so limits
// are approximate on platforms that scale horizontally. Good enough for a
// contact form; swap for a shared store if abuse becomes real.

const hits = new Map<string, { count: number; reset: number }>();

/** Returns true when the request is allowed under `limit` per `windowMs`. */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset <= now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
