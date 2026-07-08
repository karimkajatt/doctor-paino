// Limitador de tasa simple en memoria para proteger /api/chat de abuso.
// Nota: al vivir en memoria del proceso, no es compartido entre instancias
// serverless distintas (Vercel puede levantar varias). Es una protección
// básica de primera línea, no un rate limit distribuido — para eso se
// necesitaría un store externo (Upstash Redis, etc.) si el tráfico lo justifica.

type Entry = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;

const hits = new Map<string, Entry>();

export function checkRateLimit(id: string): { ok: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = hits.get(id);

  if (!entry || now > entry.resetAt) {
    hits.set(id, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}
