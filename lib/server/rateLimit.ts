const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;

// Rate limit em memória, por IP. Funciona corretamente em um processo Node persistente
// (self-hosted / `next start`), mas NÃO é compartilhado entre múltiplas instâncias — em
// deploy serverless/multi-instância isso precisaria de um store externo (ex: Redis).
const requestLog = new Map<string, number[]>();

// Evita crescimento ilimitado do Map ao longo do tempo, removendo IPs sem atividade recente.
function cleanup(now: number) {
  for (const [ip, timestamps] of requestLog) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) {
      requestLog.delete(ip);
    } else {
      requestLog.set(ip, recent);
    }
  }
}

let lastCleanup = 0;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (now - lastCleanup > WINDOW_MS) {
    cleanup(now);
    lastCleanup = now;
  }

  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}
