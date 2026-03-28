export const cacheConfig = () => ({
  ttlSeconds: Number(process.env.CACHE_TTL_SECONDS || 60),
  maxItems: Number(process.env.CACHE_MAX_ITEMS || 1000),
});
