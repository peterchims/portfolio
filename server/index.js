import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { join, resolve } from 'node:path';
import { siteContent, siteMeta } from './content/site-data.js';
import {
  buildResponseHeaders,
  getClientIp,
  readJsonBody,
  sendJson,
  sendNoContent,
  serveStaticAsset,
} from './lib/http.js';
import { appendJsonRecord } from './lib/storage.js';
import {
  validateContactPayload,
  validateInteractionPayload,
} from './lib/validation.js';

const config = {
  appOrigin: process.env.APP_ORIGIN || '',
  contactRateLimitMax: Number(process.env.CONTACT_RATE_LIMIT_MAX || 5),
  contactRateLimitWindowMs: Number(
    process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 300_000
  ),
  interactionRateLimitMax: Number(
    process.env.INTERACTION_RATE_LIMIT_MAX || 40
  ),
  interactionRateLimitWindowMs: Number(
    process.env.INTERACTION_RATE_LIMIT_WINDOW_MS || 60_000
  ),
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8787),
};

const startedAt = new Date().toISOString();
const distDir = resolve(process.cwd(), 'dist');
const contactStoragePath = join(
  process.cwd(),
  'server',
  'storage',
  'contact-submissions.json'
);
const interactionStoragePath = join(
  process.cwd(),
  'server',
  'storage',
  'interaction-events.json'
);

const contactLimiter = createRateLimiter(
  config.contactRateLimitWindowMs,
  config.contactRateLimitMax
);
const interactionLimiter = createRateLimiter(
  config.interactionRateLimitWindowMs,
  config.interactionRateLimitMax
);

const server = createServer(async (request, response) => {
  const requestId = randomUUID();
  const requestUrl = new URL(
    request.url || '/',
    'http://' + (request.headers.host || 'localhost')
  );
  const headers = buildResponseHeaders(
    request.headers.origin,
    config.appOrigin,
    requestId
  );
  const startedMs = Date.now();
  const clientIp = getClientIp(request);

  try {
    if (request.method === 'OPTIONS') {
      sendNoContent(response, headers);
      return;
    }

    const handled = await handleApiRequest(
      request,
      response,
      requestUrl,
      headers,
      requestId,
      clientIp
    );

    if (handled) {
      return;
    }

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      (await serveStaticAsset(
        response,
        distDir,
        decodeURIComponent(requestUrl.pathname),
        headers,
        request.method === 'HEAD'
      ))
    ) {
      return;
    }

    sendJson(
      response,
      404,
      { message: 'Route not found.', requestId },
      headers
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error.';
    const statusCode =
      message === 'Invalid JSON body.'
        ? 400
        : message === 'Payload too large.'
          ? 413
          : 500;

    sendJson(response, statusCode, { message, requestId }, headers);
  } finally {
    console.log(
      JSON.stringify({
        durationMs: Date.now() - startedMs,
        ip: clientIp,
        method: request.method,
        path: requestUrl.pathname,
        requestId,
        statusCode: response.statusCode,
      })
    );
  }
});

server.listen(config.port, () => {
  console.log(
    JSON.stringify({
      event: 'server_started',
      environment: config.nodeEnv,
      port: config.port,
      startedAt,
    })
  );
});

async function handleApiRequest(
  request,
  response,
  requestUrl,
  headers,
  requestId,
  clientIp
) {
  if (request.method === 'GET' && requestUrl.pathname === '/api/health') {
    sendJson(
      response,
      200,
      {
        environment: config.nodeEnv,
        startedAt,
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.round(process.uptime()),
      },
      headers
    );
    return true;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/site') {
    sendJson(
      response,
      200,
      {
        data: siteContent,
        meta: siteMeta,
      },
      headers
    );
    return true;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/contact') {
    const limit = contactLimiter.check(clientIp);

    if (!limit.allowed) {
      sendJson(
        response,
        429,
        {
          message: 'Too many contact requests. Try again shortly.',
          requestId,
        },
        {
          ...headers,
          'Retry-After': String(limit.retryAfterSeconds),
        }
      );
      return true;
    }

    const payload = await readJsonBody(request);
    const result = validateContactPayload(payload);

    if (!result.valid) {
      sendJson(
        response,
        400,
        {
          errors: result.errors,
          message: result.errors[0],
          requestId,
        },
        headers
      );
      return true;
    }

    const submissionId = 'msg_' + randomUUID().slice(0, 8);
    const record = {
      ...result.value,
      id: submissionId,
      requestId,
      sourceIp: clientIp,
      submittedAt: new Date().toISOString(),
      userAgent:
        typeof request.headers['user-agent'] === 'string'
          ? request.headers['user-agent']
          : '',
    };

    await appendJsonRecord(contactStoragePath, record);

    sendJson(
      response,
      201,
      {
        ok: true,
        message: 'Message received.',
        submissionId,
      },
      headers
    );
    return true;
  }

  if (
    request.method === 'POST' &&
    requestUrl.pathname === '/api/interactions'
  ) {
    const limit = interactionLimiter.check(clientIp);

    if (!limit.allowed) {
      sendJson(
        response,
        429,
        {
          message: 'Too many interaction events. Try again shortly.',
          requestId,
        },
        {
          ...headers,
          'Retry-After': String(limit.retryAfterSeconds),
        }
      );
      return true;
    }

    const payload = await readJsonBody(request);
    const result = validateInteractionPayload(payload);

    if (!result.valid) {
      sendJson(
        response,
        400,
        {
          errors: result.errors,
          message: result.errors[0],
          requestId,
        },
        headers
      );
      return true;
    }

    await appendJsonRecord(interactionStoragePath, {
      ...result.value,
      id: 'evt_' + randomUUID().slice(0, 8),
      requestId,
      sourceIp: clientIp,
      timestamp: new Date().toISOString(),
    });

    sendJson(response, 202, { ok: true }, headers);
    return true;
  }

  return false;
}

function createRateLimiter(windowMs, max) {
  const buckets = new Map();

  return {
    check(key) {
      const now = Date.now();

      pruneBuckets(buckets, now);

      const current = buckets.get(key);

      if (!current || current.resetAt <= now) {
        buckets.set(key, {
          count: 1,
          resetAt: now + windowMs,
        });

        return {
          allowed: true,
          retryAfterSeconds: Math.ceil(windowMs / 1000),
        };
      }

      if (current.count >= max) {
        return {
          allowed: false,
          retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
        };
      }

      current.count += 1;

      return {
        allowed: true,
        retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
      };
    },
  };
}

function pruneBuckets(buckets, now) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
