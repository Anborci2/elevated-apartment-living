---
phase: 02-content-sections
plan: 02
subsystem: ui
tags: [next.js, react, tailwind, next/image, server-component, hero]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: components/sections/ directory, Unsplash remotePatterns in next.config.mjs, luxury color tokens, Playfair Display + Inter fonts

provides:
  - components/sections/Hero.tsx — full-viewport hero section with Unsplash background, overlay, headline, sub-headline, and gold CTA

affects:
  - 02-plan-05 — page assembly imports Hero and mounts it in app/page.tsx

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Three-layer hero pattern: next/image fill background → dark overlay div → relative z-10 content
    - Server Component with anchor-based scroll (no 'use client', no onClick)
    - Gold outlined CTA: <a href="#anchor"><span styled as button></span></a>

key-files:
  created:
    - components/sections/Hero.tsx
  modified: []

key-decisions:
  - "Server Component (no 'use client') — all content is static; scroll handled by CSS scroll-behavior: smooth"
  - "next/image with fill+priority rather than inline style backgroundImage — enables WebP conversion, responsive srcset, and priority loading"
  - "Separate overlay <div> with bg-luxury-black/60 rather than CSS filter on the image"
  - "CTA is <a href='#lead-form'> wrapping a styled <span> — not a <button> — pure HTML navigation, zero JS"
  - "alt='' on background image (decorative); aria-hidden='true' on overlay div"

patterns-established:
  - "Hero pattern: absolute inset-0 image layer + absolute inset-0 overlay + relative z-10 content"
  - "Section components live in components/sections/"
  - "Gold CTA button uses border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black rounded-none tracking-widest uppercase"

requirements-completed:
  - CONT-01

# Metrics
duration: 5min
completed: 2026-04-19
---

# Plan 02: Hero Section Summary

**Full-viewport hero with Unsplash background image, 60% dark overlay, Playfair Display headline, and gold-outlined CTA linking to #lead-form**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-19
- **Completed:** 2026-04-19
- **Tasks:** 2 (T02-01 file creation, T02-02 TypeScript verification)
- **Files modified:** 1

## Accomplishments
- Created `components/sections/Hero.tsx` as a Server Component with zero client-side JS
- Three-layer architecture: next/image fill background, bg-luxury-black/60 overlay, relative z-10 content
- All acceptance criteria passed: TypeScript clean, no 'use client', all required classes and copy present

## Task Commits

1. **T02-01 + T02-02: Create Hero.tsx and verify TypeScript** - `b90b4f1` (feat)

## Files Created/Modified
- `components/sections/Hero.tsx` — Full-viewport hero section; Server Component using next/image fill, Playfair Display headline, Inter sub-headline, gold outlined CTA anchor

## Decisions Made
- Used `<a href="#lead-form">` wrapping a styled `<span>` rather than a `<button onClick>` — keeps it a pure Server Component with no JavaScript required
- Used `next/image` with `fill` + `priority` rather than inline `style={{ backgroundImage }}` — enables Next.js image optimization, WebP conversion, and proper eager loading
- Separate overlay `<div className="absolute inset-0 bg-luxury-black/60">` as a distinct DOM layer — not a CSS filter on the image

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `components/sections/Hero.tsx` is ready to be imported in Plan 05 (page assembly)
- The `#lead-form` anchor target referenced in the CTA will be added by Plan 05 as a placeholder div
- No blockers for remaining phase plans

---
*Phase: 02-content-sections*
*Completed: 2026-04-19*
