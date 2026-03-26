# Production Guide

## Runtime Model

Production runs through `backend/index.js`.
The backend serves API routes and serves the built frontend from `frontend/dist/`.

## Directory Layout

- `frontend/`: Vite application and public assets
- `backend/`: HTTP server, validation, storage, and API contracts

## Environment Variables

### Backend

- `PORT`: HTTP port, default `8787`
- `APP_ORIGIN`: allowed origin for CORS responses
- `CONTACT_RATE_LIMIT_WINDOW_MS`: contact rate-limit window in milliseconds
- `CONTACT_RATE_LIMIT_MAX`: max contact requests allowed per window
- `INTERACTION_RATE_LIMIT_WINDOW_MS`: analytics rate-limit window in milliseconds
- `INTERACTION_RATE_LIMIT_MAX`: max interaction requests allowed per window
- `FRONTEND_DIST_DIR`: optional absolute path override for built frontend assets

### Frontend

- `VITE_API_BASE_URL`: optional API base URL override
- `VITE_API_PROXY_TARGET`: dev proxy target, default `http://localhost:8787`

## Local Run

1. `npm install`
2. `npm run dev:api`
3. `npm run dev:web`
4. Open `http://localhost:5173`

## Production Run

1. `npm install`
2. `npm run build`
3. `npm run start`
4. Open `http://localhost:8787`

## Docker Run

1. `docker compose up --build -d`
2. Open `http://localhost:3000`
3. Check `http://localhost:3000/api/health`

## Operational Notes

- Contact submissions persist to `backend/storage/contact-submissions.json`
- Interaction events persist to `backend/storage/interaction-events.json`
- Git hooks enforce staged-file linting before commit and full verification before push
