# Peter Ogba Portfolio

A rebuilt portfolio application with a custom React frontend and a production-capable Node backend.

## Stack

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Node.js HTTP server with validation, rate limiting, persistence, and static asset serving
- Deployment: Docker or direct Node process

## Scripts

- `npm install` installs dependencies
- `npm run dev:web` starts the Vite frontend on `5173`
- `npm run dev:api` starts the API server on `8787`
- `npm run build` builds the frontend into `dist`
- `npm run start` serves the built frontend and API from the Node server
- `npm run lint` runs ESLint for the frontend code
- `npm run test` runs backend validation tests with Node's built-in test runner

## API

- `GET /api/health` runtime health signal
- `GET /api/site` portfolio content payload
- `POST /api/contact` validated contact submission with local persistence
- `POST /api/interactions` lightweight interaction tracking

Runtime submissions are written to `server/storage/` and ignored by git.

## Development flow

1. `npm install`
2. `npm run dev:api`
3. `npm run dev:web`
4. Open `http://localhost:5173`

For production details, read `production.md`.
For visual system rules, read `styleguide.md`.
