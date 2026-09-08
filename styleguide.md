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

- Display / headings — **Sora**, weight 600, tight tracking (`-0.02em`)
- Body / UI — **Inter**
- Micro-labels (kickers, metadata, "at a glance") — **IBM Plex Mono**, uppercase,
  `0.2em` tracking

Rules: headlines short and assertive; no long paragraphs above the fold; one
`<h1>` per route; ordered heading levels.

## Layout

- Content column: `max-w-content` (68rem); reading column: `max-w-prose` (42rem)
- Section vertical rhythm: `py-20` mobile → `py-28` desktop, hairline border between
- Alternate `bg` / `bg-subtle` on consecutive sections for rhythm
- Left-aligned reading rhythm; asymmetric grids over centred template blocks
- Case studies: prose left, sticky "At a glance" rail right

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

- Entrance: subtle upward reveal (`Reveal`), staggered, `once`
- Hover: small lift + shadow shift only
- Everything behind `prefers-reduced-motion` — `Reveal` renders static

## Accessibility

Skip link; visible `--focus-ring` on every control; focus-trapped, Esc-closable
mobile nav; AA contrast in both themes; semantic landmarks.

## Content voice

Direct. Professional. Proof over adjectives. No filler claims, no exaggerated
self-praise, no fake metrics.
