# Production Guide

## Runtime model

Two independent pieces:

1. **Static frontend** — `npm run build` emits `frontend/dist/` (plain static
   files). Serve from any static host / CDN, or the bundled nginx image.
2. **Contact API** — a small ASP.NET Core 8 service. Only the contact form
   depends on it; the rest of the site is static and always renders.

They only need to share an origin so the SPA can call `/api/*`. The nginx image
in `frontend/Dockerfile` does this by proxying `/api/` to the `api` container.

## Environment

### Backend (`backend/appsettings.json` or env vars)

- `ASPNETCORE_URLS` — bind address, e.g. `http://+:5000`
- `Cors__AllowedOrigins__0` — allowed browser origin(s)
- `Smtp__Host` / `Port` / `Username` / `Password` / `From` / `To` — contact
  notification email. Blank `Host` = submissions are stored and logged only.

Submissions persist to `backend/storage/contact-submissions.json` (mount a
volume in containers — the compose file does).

### Frontend (build-time)

- `VITE_API_BASE_URL` — leave blank when the API is same-origin (nginx proxy);
  set to the API URL otherwise.

## Local production run

```bash
npm install
npm run build
npm run preview            # static preview on http://localhost:4173
dotnet run --project backend -c Release   # API on http://localhost:5000
```

## Docker

```bash
docker compose up --build -d
# Frontend  http://localhost:3000
# Health    http://localhost:3000/api/health
```

## Checklist before shipping

- `npm run verify` passes (lint + typecheck + build + test)
- Lighthouse ≥ 95 (performance / a11y / best-practices / SEO), both themes
- `Cors:AllowedOrigins` set to the real domain
- SMTP configured (or accept log-only submissions)
- `public/sitemap.xml`, `public/robots.txt`, and `og.png` reflect the live domain
