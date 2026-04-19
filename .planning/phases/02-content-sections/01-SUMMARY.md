---
phase: 02-content-sections
plan: 01
subsystem: infra
tags: [next.js, next/image, unsplash, typescript]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: next.js project scaffold, tailwind config, component structure

provides:
  - next.config.mjs configured with remotePatterns for images.unsplash.com
  - components/sections/ directory created for all Phase 2 section components

affects:
  - 02-hero
  - 02-gallery
  - 02-how-it-works
  - 02-our-story

# Tech tracking
tech-stack:
  added: []
  patterns:
    - remotePatterns (not domains) for next/image external hosts
    - .gitkeep for empty directory tracking in git

key-files:
  created:
    - components/sections/.gitkeep
  modified:
    - next.config.mjs

key-decisions:
  - "Used remotePatterns (not deprecated domains array) for next/image Unsplash config"
  - "pathname: '/**' allows all Unsplash CDN paths"
  - "Recreated node_modules from scratch due to pre-existing corruption (../server/require-hook missing)"

patterns-established:
  - "remotePatterns with protocol/hostname/pathname for all external next/image sources"

requirements-completed: []

# Metrics
duration: 15min
completed: 2026-04-19
---

# Phase 02 Plan 01: Infrastructure Summary

**next.config.mjs configured with Unsplash remotePatterns and components/sections/ directory created, unblocking all Phase 2 component plans**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-19T00:00:00Z
- **Completed:** 2026-04-19T00:15:00Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Configured `next/image` to allow `images.unsplash.com` via modern `remotePatterns` API
- Created `components/sections/` directory with `.gitkeep` placeholder, ready for Hero/Gallery/HowItWorks/OurStory components
- TypeScript check (`npx tsc --noEmit`) and production build (`npm run build`) both pass with exit code 0

## Task Commits

Each task was committed atomically:

1. **T01-01: Add Unsplash remotePatterns to next.config.mjs** - `df45af4` (feat)
2. **T01-02: Create components/sections/ directory** - `a7c6000` (feat)
3. **T01-03: Verify TypeScript and build** — verification only, no commit needed

## Files Created/Modified
- `next.config.mjs` - Added `images.remotePatterns` with `images.unsplash.com` using `protocol: 'https'` and `pathname: '/**'`
- `components/sections/.gitkeep` - Empty placeholder to track directory in git

## Decisions Made
- Used `remotePatterns` instead of deprecated `domains` array (Next.js 14 current API)
- `pathname: '/**'` chosen to allow all Unsplash CDN paths without restricting specific endpoints

## Deviations from Plan

### Auto-fixed Issues

**1. [Blocking] Pre-existing node_modules corruption caused build failure**
- **Found during:** Task 3 (verification)
- **Issue:** `node_modules/.bin/next` referenced `../server/require-hook` but `server/` directory was absent from `node_modules/next/` (only present under `dist/`), causing `MODULE_NOT_FOUND` on any `next` invocation
- **Fix:** Deleted `node_modules/` and `package-lock.json`, ran fresh `npm install`
- **Files modified:** `node_modules/` (system only), `package-lock.json` regenerated
- **Verification:** `npm run build` exits 0 after clean reinstall
- **Committed in:** Not committed (node_modules is gitignored)

---

**Total deviations:** 1 auto-fixed (blocking pre-existing environment issue)
**Impact on plan:** Fix was necessary for build verification. No scope creep. Config changes themselves were correct.

## Issues Encountered
- node_modules was corrupted prior to this plan's work — `next/server/require-hook` was missing. Resolved with clean `npm install`.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `images.unsplash.com` is now whitelisted for `next/image` — Hero and Gallery components can use Unsplash URLs without runtime errors
- `components/sections/` directory exists and is ready to receive Hero, Gallery, HowItWorks, and OurStory `.tsx` files
- Both TypeScript and production build are clean — subsequent plans can build on this without blockers

---
*Phase: 02-content-sections*
*Completed: 2026-04-19*
