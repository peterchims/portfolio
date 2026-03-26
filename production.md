# Production Guide

## Runtime Model

Production runs through the Node server in `server/index.js`.
The server exposes API routes and serves the built frontend from `dist/`.

## Environment Variables

- `PORT`: HTTP port, default `8787`
- `APP_ORIGIN`: allowed origin for CORS responses
- `CONTACT_RATE_LIMIT_WINDOW_MS`: contact rate-limit window in milliseconds
- `CONTACT_RATE_LIMIT_MAX`: max contact requests allowed per window
- `INTERACTION_RATE_LIMIT_WINDOW_MS`: analytics rate-limit window in milliseconds
- `INTERACTION_RATE_LIMIT_MAX`: max interaction requests allowed per window

## Local Production Run

1. `npm install`
2. `npm run build`
3. `npm run start`
4. Open `http://localhost:8787`

## Docker Run

1. `docker compose up --build -d`
2. Open `http://localhost:3000`
3. Check `http://localhost:3000/api/health`

## Operational Notes

- Contact submissions are persisted to `server/storage/contact-submissions.json`
- Interaction events are persisted to `server/storage/interaction-events.json`
- Runtime storage is intentionally excluded from git
- The server applies request ids, input validation, security headers, and memory-backed rate limiting

## Hardening Recommendations

- Replace local JSON persistence with a database or managed queue for real traffic
- Wire `POST /api/contact` into transactional email or CRM delivery
- Put the app behind a reverse proxy with TLS termination
- Add centralized logging and metrics shipping
- Add backups for `server/storage` if local persistence remains in use
