// Per-IP rate limiting for the public, no-account-required chat endpoint.
// In-memory: fine for a single instance, but resets on restart and isn't
// shared across instances on a multi-server deployment (e.g. serverless
// with multiple concurrent instances) — a real production deployment under
// real traffic would want Upstash/Redis instead. Flagged here rather than
// silently pretending this is bulletproof.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 20;

const hits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}
