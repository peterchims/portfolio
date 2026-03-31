import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

export function buildResponseHeaders(origin, appOrigin, requestId) {
  const allowOrigin =
    appOrigin || (typeof origin === 'string' && origin.length > 0 ? origin : '*');

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    Vary: 'Origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Request-Id': requestId,
  };
}

export function sendJson(response, statusCode, payload, headers = {}) {
  const body = JSON.stringify(payload);

  response.writeHead(statusCode, {
    ...headers,
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(body);
}

export function sendNoContent(response, headers = {}) {
  response.writeHead(204, headers);
  response.end();
}

export function getClientIp(request) {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.socket.remoteAddress || 'unknown';
}

export function readJsonBody(request, maxBytes = 100_000) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;

    request.on('data', chunk => {
      size += chunk.length;

      if (size > maxBytes) {
        rejectBody(new Error('Payload too large.'));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on('end', () => {
      if (chunks.length === 0) {
        resolveBody({});
        return;
      }

      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        rejectBody(new Error('Invalid JSON body.'));
      }
    });

    request.on('error', rejectBody);
  });
}

export async function serveStaticAsset(
  response,
  rootDir,
  pathname,
  headers = {},
  omitBody = false
) {
  const cleanPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = resolve(rootDir, '.' + cleanPath);

  if (!filePath.startsWith(rootDir)) {
    return false;
  }

  try {
    const buffer = await readFile(filePath);
    sendStaticBuffer(response, buffer, filePath, headers, omitBody);
    return true;
  } catch {
    if (cleanPath.includes('.')) {
      return false;
    }
  }

  try {
    const fallbackPath = join(rootDir, 'index.html');
    const buffer = await readFile(fallbackPath);
    sendStaticBuffer(response, buffer, fallbackPath, headers, omitBody);
    return true;
  } catch {
    return false;
  }
}

function sendStaticBuffer(response, buffer, filePath, headers, omitBody) {
  const extension = extname(filePath).toLowerCase();
  const cacheControl = filePath.includes('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';

  response.writeHead(200, {
    ...headers,
    'Cache-Control': cacheControl,
    'Content-Length': buffer.byteLength,
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
  });

  if (omitBody) {
    response.end();
    return;
  }

  response.end(buffer);
}
