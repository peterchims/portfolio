# Style Guide

## Brand direction

This portfolio should read like a serious product-engineering practice — not a
template. The tone is controlled, precise, and direct. The visual language
communicates systems thinking and delivery discipline through restraint:
generous whitespace, strong hierarchy, one confident accent, no decoration that
competes with reading.

Reference points: Linear, Vercel, Stripe — calm, high-contrast, editorial.

## Audience

- Hiring managers assessing senior frontend / full-stack capability
- Founders looking for a reliable product engineer
- Clients who need interface quality and backend execution in one person

## Theme architecture

Three tiers, all in CSS custom properties (`src/styles/theme.css`):

1. **Primitives** — raw scales (`--grey-0 … --grey-1000`, `--accent-300 … 700`).
   Never used directly in components.
2. **Semantic tokens** — what components consume: `--bg`, `--bg-subtle`,
   `--surface`, `--surface-raised`, `--border`, `--border-strong`, `--text`,
   `--text-muted`, `--text-faint`, `--accent`, `--accent-contrast`,
   `--accent-surface`, `--focus-ring`, `--shadow-sm/md/lg`.
   Defined on `:root` for **light**; re-mapped for **dark** under both
   `@media (prefers-color-scheme: dark)` (guarded by `:not([data-theme="light"])`)
   and `:root[data-theme="dark"]`. A colour is never defined only in a media query.
3. **Tailwind** — `tailwind.config.js` maps utility colours to the semantic
   tokens, so every utility is theme-aware. `darkMode: ['selector', '[data-theme="dark"]']`.

Theme is chosen with a `light / dark / system` toggle, stored in `localStorage`,
applied to `<html data-theme>` by an inline boot script before first paint.

## Colour

Light and dark are equals. Both are near-monochrome neutrals plus **one** accent
(`--accent`, a measured blue). Accent is for primary actions, links, active
states, and the mono kicker labels — nothing else. No gradients on text, no
glows, no second accent hue.

## Typography

- Display (`h1`, `h2`) — **Sora**, weight 600, tracking `-0.02em`
- Sub-heads (`h3`, `h4`), body, UI — **Inter**
- Micro-labels (kickers, metadata, "at a glance") — **IBM Plex Mono**, uppercase,
  `0.18em` tracking, `text-kicker` (0.7rem)

Scale is deliberately restrained — base body is `0.9375rem`. Display sizes are
`text-display-lg` `clamp(1.65rem, 3vw, 2.55rem)`, `-md` `clamp(1.45rem, 2.4vw,
1.95rem)`, `-sm` `clamp(1.2rem, 1.7vw, 1.5rem)`. Section copy and case-study prose
run at `text-sm` / `0.95rem`. Nothing shouts.

Rules: headlines short and assertive; no long paragraphs above the fold; one
`<h1>` per route; ordered heading levels.

## Layout

- Content column: `max-w-content` (68rem); reading column: `max-w-prose` (42rem)
- Section vertical rhythm: `py-20` mobile → `py-28` desktop, hairline border between
- Alternate `bg` / `bg-subtle` on consecutive sections for rhythm
- Left-aligned reading rhythm; asymmetric grids over centred template blocks
- Case studies: prose left, sticky "At a glance" rail right

## Imagery

The portfolio is bespoke-visual, not stock-photo.

- **`ProjectCover`** — a deterministic SVG cover per project, keyed off a `hue`
  (0–360) in the content: jewel-toned gradient field, concentric arcs, ghosted
  monogram. Used on Work cards, the hero window frame, and case-study banners.
- **Real screenshots** — a project may set `image` (a file in
  `/public/images`); `ProjectCover` renders it instead of the generated cover
  when `preferImage` is set.
- **`Figure`** — case-study in-body figure. Renders a screenshot when `src` is
  set, otherwise a designed wireframe placeholder tinted with the project hue —
  the page reads as finished before assets land.
- **Portrait** — the About section uses `profile.photoUrl` when set, else a
  monogram-on-grid panel.
- **Texture** — a fixed film-grain overlay (`body::before`, opacity ~0.04) and a
  `.bg-grid` dotted-grid helper for hero / portrait backdrops. Both theme-aware.
- **`og.png`** — 1200×630 social card, regenerable from
  `scratchpad`-style HTML → Chromium screenshot.

## Components

- **Header** — sticky, transparent until scrolled then `bg/80` + blur; brand
  lockup, minimal nav with scroll-spy `aria-current`, theme toggle, one CTA
- **Hero** — one engineering statement, short lead, two CTAs, a faint accent
  radial for depth, three restrained proof points (no fake uptime / metrics)
- **Cards** — `rounded-2xl`, `border-border`, `bg-surface`, `shadow-sm`; on hover
  lift `-0.5` + `border-strong` + `shadow-md`. Nothing heavier.
- **Contact form** — operational fields (type / budget / timeline) for lead
  quality; inline success with a real reference id; inline errors — the page
  never fails wholesale

## Motion

Every animation is disabled or frozen under `prefers-reduced-motion`.

- **Hero backdrop** — `AuroraBackground`: three blurred colour blobs drifting on
  22–28s loops over a gradient wash and dot-grid, faded to `--bg` at the base.
- **Hero entrance** — the headline reveals word-by-word (mask + `y` slide);
  eyebrow, lead, CTAs and socials stagger in after.
- **`Reveal` / `RevealItem`** — scroll-triggered opacity + `y` + `blur(6px)→0`,
  `once`, optional `stagger` container.
- **`SpotlightCard`** — cursor-following radial glow (CSS vars, no re-render),
  `-translate-y-1` + shadow on hover; project covers zoom `1.04` inside.
- **`Magnetic`** — wraps a CTA, springs toward the cursor and back.
- **`useCountUp`** — hero proof numbers count from 0 when scrolled into view.
- **`Marquee`** — seamless tech-stack ticker, pauses on hover.
- **Header** — scroll-progress hairline; the active-section pill slides between
  nav links via a shared `layoutId`.
- **Routes** — `AppRoutes` cross-fades pages with a small `y` shift.
- Hover elsewhere: small lift + shadow shift only.

## Accessibility

Skip link; visible `--focus-ring` on every control; focus-trapped, Esc-closable
mobile nav; AA contrast in both themes; semantic landmarks.

## Content voice

Direct. Professional. Proof over adjectives. No filler claims, no exaggerated
self-praise, no fake metrics.
