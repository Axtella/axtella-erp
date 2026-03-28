import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Same default as `API_PROXY_TARGET` (see next.config / RUNBOOK).
 * Strips a trailing `/api/v1` so mis-set env like `http://host:3000/api/v1`
 * does not produce `/api/v1/api/v1/...` upstream URLs.
 */
function normalizeTargetBase(raw: string): string {
  let s = raw.trim().replace(/\/+$/, '');
  if (s.endsWith('/api/v1')) {
    s = s.slice(0, -'/api/v1'.length).replace(/\/+$/, '');
  }
  return s;
}

const targetBase = normalizeTargetBase(
  process.env.API_PROXY_TARGET || 'http://127.0.0.1:3000',
);

const hopByHop = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
]);

function forwardHeaders(req: NextRequest): Headers {
  const h = new Headers();
  req.headers.forEach((value, key) => {
    if (hopByHop.has(key.toLowerCase())) return;
    h.set(key, value);
  });
  return h;
}

/** Match `lib/api.ts` normalization so we can compare origins. */
function normalizedPublicApiBaseUrl(raw: string): URL {
  let s = raw.trim().replace(/\/+$/, '');
  if (!s.includes('://')) {
    s = `http://${s}`;
  }
  if (!s.endsWith('/api/v1')) {
    const u = new URL(s);
    u.pathname = '/api/v1';
    s = u.toString().replace(/\/+$/, '');
  }
  return new URL(s);
}

function canonicalHost(hostname: string): string {
  return hostname === 'localhost' ? '127.0.0.1' : hostname;
}

/**
 * When NEXT_PUBLIC_API_BASE_URL points at this Next app (wrong for split hosting),
 * still proxy to Nest — otherwise every same-origin /api/v1 call returns 404.
 * When it points at another host, keep legacy behavior: refuse proxy so the client must use the absolute API URL.
 */
function shouldRefuseProxyBecausePublicApiIsElsewhere(req: NextRequest): boolean {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) return false;
  try {
    const configured = normalizedPublicApiBaseUrl(raw);
    const here = req.nextUrl;
    const samePort =
      configured.port === here.port ||
      (configured.port === '' && here.port === '') ||
      (configured.port === '80' && here.port === '') ||
      (configured.port === '443' && here.port === '');
    const sameHost =
      canonicalHost(configured.hostname) === canonicalHost(here.hostname);
    if (sameHost && samePort) {
      return false;
    }
    return true;
  } catch {
    return true;
  }
}

async function proxy(req: NextRequest, segments: string[]) {
  if (shouldRefuseProxyBecausePublicApiIsElsewhere(req)) {
    return NextResponse.json(
      {
        message:
          'Next `/api/v1` proxy is disabled when NEXT_PUBLIC_API_BASE_URL points at a different host. Unset it for local dev (use the proxy) or call the API URL directly from the browser.',
        error: 'Not Found',
        statusCode: 404,
      },
      { status: 404 },
    );
  }

  const sub = segments.map(encodeURIComponent).join('/');
  const url = `${targetBase}/api/v1/${sub}${req.nextUrl.search}`;
  const headers = forwardHeaders(req);
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const body = hasBody ? await req.arrayBuffer() : undefined;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: req.method,
      headers,
      cache: 'no-store',
      body: body && body.byteLength > 0 ? body : undefined,
    });
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    const code = err?.code;
    if (
      code === 'ECONNREFUSED' ||
      code === 'ENOTFOUND' ||
      code === 'ECONNRESET'
    ) {
      return NextResponse.json(
        {
          statusCode: 503,
          message:
            'API server unreachable. Start Nest on port 3000 (e.g. apps/backend: npm run start:dev).',
          error: 'Service Unavailable',
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        statusCode: 502,
        message: err instanceof Error ? err.message : 'Proxy error',
        error: 'Bad Gateway',
      },
      { status: 502 },
    );
  }

  const outHeaders = new Headers(upstream.headers);
  // Node fetch may decompress the body but leave Content-Encoding; copying both
  // breaks JSON parsing in the browser. Let Next set length/encoding for the client.
  outHeaders.delete('content-encoding');
  outHeaders.delete('content-length');
  outHeaders.delete('transfer-encoding');
  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}

type Ctx = { params: { path: string[] } };

export async function GET(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function OPTIONS(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}

export async function HEAD(req: NextRequest, ctx: Ctx) {
  return proxy(req, ctx.params.path ?? []);
}
