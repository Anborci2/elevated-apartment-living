---
phase: 01-foundation
plan: 03
subsystem: ui
tags: [next.js, react, tailwind, header, footer, scroll-listener, layout-shell]

# Dependency graph
requires:
  - phase: 01-foundation/01
    provides: tailwind.config.ts with luxury color tokens (luxury-black, luxury-gold, luxury-gold-muted, luxury-text-primary, luxury-text-secondary)
  - phase: 01-foundation/02
    provides: Playfair Display + Inter via next/font/google on <html>; font-playfair and font-inter Tailwind utilities

provides:
  - Fixed-position Header with scroll-based transparency transition (transparent → bg-luxury-black/92 backdrop-blur-[12px] after 80px)
  - Footer placeholder as Server Component with bg-luxury-black border-t border-luxury-gold-muted
  - app/layout.tsx wired with <Header /> and <Footer /> surrounding {children}
  - Complete layout shell visible at 375px mobile and 1280px desktop

affects: [04, 05, 06, 07]

# Tech tracking
tech-stack:
  added: []
  patterns: [Client Component with passive scroll listener + cleanup, Server Component placeholder, named exports from components/layout/]

key-files:
  created:
    - components/layout/Header.tsx
    - components/layout/Footer.tsx
  modified:
    - app/layout.tsx

key-decisions:
  - "Header is 'use client' — required for useState/useEffect and window.scrollY access"
  - "Footer is Server Component — no 'use client', year evaluated at build time"
  - "No pt-16 offset on <body> — hero section designed to sit under transparent header (full-bleed)"
  - "passive: true on scroll listener for better scroll performance"
  - "handleScroll() called once on mount to handle mid-page load or hash navigation"

patterns-established:
  - "components/layout/ directory: top-level layout shell components (Header, Footer)"
  - "Scroll-based header: passive listener, cleanup on unmount, threshold 80px"
  - "Named exports from component files (export function Header, not default)"

requirements-completed: [FOUND-04]

# Metrics
duration: 15min
completed: 2026-04-18
---

# Plan 03: Header + Footer Shell Summary

**Fixed-position Header with scroll-driven transparency and Footer placeholder shell both wired into app/layout.tsx, completing the layout skeleton for Phase 1**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-18
- **Completed:** 2026-04-18
- **Tasks:** 4
- **Files modified:** 3

## Accomplishments
- Header component with passive scroll listener transitions from transparent to `bg-luxury-black/92 backdrop-blur-[12px] border-b border-luxury-gold-muted` after 80px
- Logo renders "ELEVATED" in `font-playfair font-bold tracking-widest` with "Apartment Locating" subtitle in `font-inter tracking-[0.15em] uppercase`
- CTA button "Find My Apartment" scrolls to `#lead-form` anchor; `border-luxury-gold rounded-none hover:bg-luxury-gold hover:text-luxury-black`
- Footer placeholder as Server Component; `bg-luxury-black border-t border-luxury-gold-muted py-8` with copyright
- `npx tsc --noEmit` and `npm run build` both exit 0

## Task Commits

Each task was committed atomically:

1. **T03-01: Create Header component** - `d74af98` (feat)
2. **T03-02: Create Footer placeholder as Server Component** - `f9376fc` (feat)
3. **T03-03: Wire Header and Footer into app/layout.tsx** - `8212fef` (feat)
4. **T03-04: TypeScript and build verification** - (verification only, no source changes)

## Files Created/Modified
- `components/layout/Header.tsx` — Client Component; fixed header with scroll listener, logo, "Find My Apartment" CTA
- `components/layout/Footer.tsx` — Server Component; copyright placeholder with luxury border
- `app/layout.tsx` — Added Header/Footer imports and rendered inside `<body>`; font config from Plan 02 preserved exactly

## Decisions Made
- No top padding added to `<body>`: the hero section (Phase 2) is full-bleed and designed to render under the transparent header. Individual sections after the hero manage their own top spacing.
- `handleScroll()` called immediately on mount so initial scroll position is read correctly on direct-link or hash navigation.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Layout shell complete: Header and Footer present in every page via root layout
- `font-playfair` and `font-inter` Tailwind utilities available to all components
- Luxury color tokens (`luxury-gold`, `luxury-black`, etc.) used successfully in Header and Footer
- Ready for Plan 04 (Hero section) — no blockers

---
*Phase: 01-foundation*
*Completed: 2026-04-18*
