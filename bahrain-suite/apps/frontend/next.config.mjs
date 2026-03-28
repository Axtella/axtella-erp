/**
 * Same-origin `/api/v1/*` → Nest is implemented in
 * `app/api/v1/[...path]/route.ts` (not here). That handler uses
 * `API_PROXY_TARGET` (default `http://127.0.0.1:3000`), returns 503/502 JSON
 * when the upstream is unreachable, and 404 when `NEXT_PUBLIC_API_BASE_URL`
 * is set (client then uses an absolute API URL — see `lib/api.ts`).
 * This file intentionally has no rewrites (avoids opaque 500s from external
 * rewrites when Nest is down).
 */
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
