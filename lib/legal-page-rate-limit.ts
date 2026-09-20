import { createHash } from "node:crypto";
import { createClient } from "redis";

const LEGAL_PAGE_RATE_LIMIT_WINDOW_SECONDS = 60;
const LEGAL_PAGE_RATE_LIMIT_MAX_REQUESTS = 30;
const LEGAL_PAGE_RATE_LIMIT_SCRIPT = `
local current = tonumber(redis.call("GET", KEYS[1]) or "0")
if current >= tonumber(ARGV[1]) then
  return { 0, redis.call("TTL", KEYS[1]) }
end

local value = redis.call("INCR", KEYS[1])
if value == 1 then
  redis.call("EXPIRE", KEYS[1], tonumber(ARGV[2]))
end

return { 1, 0 }
`;

let redisClient: ReturnType<typeof createClient> | undefined;
let redisConnection: Promise<ReturnType<typeof createClient>> | undefined;

export type LegalPageRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export async function checkLegalPageRateLimit(ip: string): Promise<LegalPageRateLimitResult> {
  const redisUrl = process.env.REDIS_URL?.trim();
  if (!redisUrl) {
    return { allowed: true };
  }

  try {
    const redis = await getRedisClient(redisUrl);
    const result = await redis.eval(LEGAL_PAGE_RATE_LIMIT_SCRIPT, {
      keys: [`joyas-ai:legal-page-rate-limit:${hashIdentifier(ip)}:1m`],
      arguments: [String(LEGAL_PAGE_RATE_LIMIT_MAX_REQUESTS), String(LEGAL_PAGE_RATE_LIMIT_WINDOW_SECONDS)],
    });

    if (!Array.isArray(result) || result[0] !== 0) {
      return { allowed: true };
    }

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Number(result[1]) || LEGAL_PAGE_RATE_LIMIT_WINDOW_SECONDS),
    };
  } catch {
    // Legal information must remain accessible if the optional limiter is unavailable.
    return { allowed: true };
  }
}

async function getRedisClient(redisUrl: string) {
  if (redisClient?.isOpen) {
    return redisClient;
  }

  if (!redisConnection) {
    redisClient = createClient({ url: redisUrl });
    redisClient.on("error", () => {});
    redisConnection = redisClient.connect()
      .then(() => redisClient!)
      .catch((error) => {
        redisClient = undefined;
        redisConnection = undefined;
        throw error;
      });
  }

  return redisConnection;
}

function hashIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
