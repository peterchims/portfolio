# Peter Ogba — Portfolio

A world-class personal portfolio: a refined, dark-first React site backed by a
small .NET API for the contact form.

- **Frontend** — React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend** — ASP.NET Core 8 (contact form, health, interaction logging). No
  database — content lives in the frontend, submissions are stored as JSON and
  optionally emailed.
- **Theming** — a three-tier token system (primitives → semantic tokens →
  Tailwind), light and dark as equals, driven by `data-theme` with an
  anti-FOUC boot script and a `light / dark / system` toggle.

## Project structure

```
frontend/
  src/
    app/            # shell, router, providers (ThemeProvider), ScrollToTop
    components/
      ui/           # primitives: Button, Container, Section, Card, Chip,
                    #   Prose, Reveal, ThemeToggle, SkipLink, VisuallyHidden
      layout/       # Header, Nav, MobileNav (focus-trapped), Footer, Brand
      sections/     # Hero, Work, Services, Process, About, Contact
    content/        # typed static content — the single source of truth
    routes/         # HomePage, WorkDetailPage (case studies), NotFoundPage
    hooks/          # useTheme, useScrollSpy, useReducedMotion
    lib/            # api (contact + health), analytics, seo, cn
    styles/         # theme.css (tokens), base.css (reset + Tailwind)
    test/           # Vitest + Testing Library
backend/
  Controllers/      # ContactController
  Services/         # ContactService (JSON store + optional SMTP)
  DTOs/             # request/response contracts
  Program.cs        # minimal API: /api/health, /api/interactions
  storage/          # contact-submissions.json (git-ignored)
```

## Local development

Prerequisites: Node.js 20+, and .NET 8 SDK (only for the contact API).

```bash
npm install
npm run dev          # frontend on http://localhost:5173
npm run dev:api      # optional — API on http://localhost:5000 (dotnet run)
```

The site renders fully without the API running; only the contact form needs it.

## Scripts (run from the repo root)

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Vite dev server                                 |
| `npm run dev:api`   | `dotnet run --project backend`                  |
| `npm run build`     | Production build to `frontend/dist`             |
| `npm run preview`   | Serve the production build                      |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | `tsc -b`                                        |
| `npm run test`      | Vitest                                          |
| `npm run verify`    | lint + typecheck + build + test                 |

## Configuration

- **Frontend** — `frontend/.env` (see `.env.example`). Leave `VITE_API_BASE_URL`
  blank in dev; Vite proxies `/api` to `VITE_API_PROXY_TARGET`.
- **Backend** — `backend/appsettings.json` + environment (see `.env.example`).
  `Cors:AllowedOrigins` and the `Smtp:*` block (blank SMTP host = log only).

## Deployment

`docker compose up --build -d` builds the API and an nginx-served static
frontend that proxies `/api` to the API container. Frontend on
`http://localhost:3000`, API health at `http://localhost:3000/api/health`.

See [production.md](production.md) for the non-Docker path and
[styleguide.md](styleguide.md) for the design system.
