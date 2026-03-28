"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheConfig = void 0;
const cacheConfig = () => ({
    ttlSeconds: Number(process.env.CACHE_TTL_SECONDS || 60),
    maxItems: Number(process.env.CACHE_MAX_ITEMS || 1000),
});
exports.cacheConfig = cacheConfig;
//# sourceMappingURL=cache.config.js.map