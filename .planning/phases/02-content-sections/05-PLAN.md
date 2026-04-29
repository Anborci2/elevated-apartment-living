---
plan: 05
title: Wire all sections into app/page.tsx with lead-form anchor
wave: 3
depends_on: [02, 03, 04]
autonomous: true
requirements_addressed: [CONT-01, CONT-02, CONT-03, CONT-04, CONT-05]
files_modified:
  - app/page.tsx
---

# Plan 05: Wire all sections into app/page.tsx with lead-form anchor

## Objective

Replace the Phase 1 placeholder `app/page.tsx` (`<main className="min-h-screen bg-luxury-black" />`) with a full assembly of all four new section components (`Hero`, `Gallery`, `HowItWorks`, `OurStory`) plus a `#lead-form` anchor placeholder div that sits between `OurStory` and the `Footer`. This finalizes Phase 2: once this plan executes, the homepage renders the complete v1 visual experience end-to-end.

This plan re-references all five Phase 2 requirements because wiring is the moment each component actually becomes visible to a visitor (without being mounted in `page.tsx`, the sections satisfy zero user-facing behavior):

- `Hero` mounted → **CONT-01** satisfied
- `Gallery` mounted → **CONT-02** satisfied
- `HowItWorks` mounted → **CONT-03** satisfied
- `OurStory` mounted → **CONT-04** satisfied
- `Footer` rendered via `app/layout.tsx` (already wired in Phase 1; Plan 04 provided the real content) → **CONT-05** satisfied

Depends on Plans 02, 03, and 04 because all imported components must exist first.

## Tasks

<task id="T05-01">
<title>Replace app/page.tsx with full section assembly</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/page.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Hero.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Gallery.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/HowItWorks.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/OurStory.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-RESEARCH.md
</read_first>
<action>
Fully replace the contents of `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/page.tsx` with the following. This removes the `min-h-screen bg-luxury-black` classes from `<main>` because:

1. The `<body>` in `app/layout.tsx` already applies `bg-luxury-black`
2. The `Hero` section's own `min-h-screen` drives viewport fill
3. Each section defines its own background (alternating `bg-luxury-black` / `bg-luxury-navy`)

The `<main>` wrapper is kept only for semantic HTML landmark purposes (screen readers identify `<main>` as the primary page content region).

```tsx
import { Hero } from '@/components/sections/Hero'
import { Gallery } from '@/components/sections/Gallery'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { OurStory } from '@/components/sections/OurStory'

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <HowItWorks />
      <OurStory />
      <div id="lead-form" className="bg-luxury-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-inter text-sm text-luxury-text-secondary">
            {/* Phase 3: Lead form mounts here */}
          </p>
        </div>
      </div>
    </main>
  )
}
```

Key decisions:
- **All imports use the `@/` path alias** — the alias is already configured in `tsconfig.json` (standard Next.js App Router setup)
- **Named imports** (not default) — matches how each section component exports: `export function Hero`, `export function Gallery`, etc.
- **Render order matches UI-SPEC §"Page Assembly":** Hero → Gallery → HowItWorks → OurStory → `#lead-form` anchor. This also implements the alternating background pattern Black → Navy → Black → Navy → Navy → Black (the `#lead-form` placeholder uses Navy, flowing into the Black Footer).
- **`id="lead-form"`** — EXACT string; must match the Hero CTA's `href="#lead-form"` and the Header CTA's `document.getElementById('lead-form')` lookup. Any deviation breaks scroll behavior.
- **Placeholder uses `bg-luxury-navy py-16 lg:py-24`** — gives the anchor a real physical presence on the page (otherwise an empty div would collapse to 0 height, and the CTA would appear to "scroll nowhere"). Phase 3 will replace the inner `<div>` with the actual form but keep the outer `id="lead-form"` wrapper.
- **Inner `<div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">`** matches the inner container convention used by every other section — easier for Phase 3 to swap form markup in place
- **`<p>` with `font-inter text-sm text-luxury-text-secondary`** — low-visual-weight placeholder; the JSX comment `{/* Phase 3: Lead form mounts here */}` is not rendered to the DOM, so the `<p>` renders empty but retains structural layout until Phase 3 fills it
- **Footer is NOT imported here** — it lives in `app/layout.tsx` (Phase 1 wiring). Importing it again in `page.tsx` would render it twice. Plan 04 already updated the Footer's content; no Footer work happens in this plan.
- **`<main>` has no `className`** — the body already handles background and text color; the Hero's `min-h-screen` handles the first-viewport fill. This avoids duplicate styles and the edge case noted in RESEARCH §"Pitfalls to Avoid #10".

Complete section flow after this task:

```
<body className="font-inter bg-luxury-black ...">   // from app/layout.tsx
  <Header />                                        // from app/layout.tsx (Phase 1)
  <main>                                            // from app/page.tsx (this task)
    <Hero />                                        // bg via background image + black overlay
    <Gallery />                                     // bg-luxury-navy
    <HowItWorks />                                  // bg-luxury-black
    <OurStory />                                    // bg-luxury-navy
    <div id="lead-form" ...>...</div>               // bg-luxury-navy (Phase 3 placeholder)
  </main>
  <Footer />                                        // from app/layout.tsx (Plan 04 content)
</body>
```
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/page.tsx` exists
- `app/page.tsx` contains `import { Hero } from '@/components/sections/Hero'`
- `app/page.tsx` contains `import { Gallery } from '@/components/sections/Gallery'`
- `app/page.tsx` contains `import { HowItWorks } from '@/components/sections/HowItWorks'`
- `app/page.tsx` contains `import { OurStory } from '@/components/sections/OurStory'`
- `app/page.tsx` does NOT contain an import for `Footer` (Footer is rendered in `app/layout.tsx`)
- `app/page.tsx` contains `export default function Home`
- `app/page.tsx` contains `<Hero />`
- `app/page.tsx` contains `<Gallery />`
- `app/page.tsx` contains `<HowItWorks />`
- `app/page.tsx` contains `<OurStory />`
- `app/page.tsx` contains `id="lead-form"` (EXACT string)
- `app/page.tsx` contains `bg-luxury-navy`
- `app/page.tsx` contains `py-16 lg:py-24`
- `app/page.tsx` contains `max-w-7xl`
- `app/page.tsx` contains `<main>`
- `app/page.tsx` does NOT contain `min-h-screen bg-luxury-black` on the `<main>` element (removed per RESEARCH §"Pitfalls to Avoid #10")
- Hero import appears BEFORE Gallery import, Gallery BEFORE HowItWorks, HowItWorks BEFORE OurStory in the file (render order)
- Running `npx tsc --noEmit` from project root exits with code 0
- Running `npm run build` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T05-02">
<title>Final TypeScript check and production build</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/page.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Hero.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Gallery.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/HowItWorks.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/OurStory.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs
</read_first>
<action>
Run the complete verification pipeline to confirm Phase 2 compiles cleanly, builds cleanly, and all section components are statically rendered without runtime errors.

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating
npx tsc --noEmit
npm run build
```

Both must exit with code 0. No source file changes are made in this task — it is verification only.

Expected build output signals:
- Next.js reports `/` as a Static page (all sections are Server Components with no dynamic data fetching)
- No warnings about `images.domains` deprecation (Plan 01 used `remotePatterns`)
- No errors about `hostname "images.unsplash.com" is not configured` (Plan 01 whitelisted it)
- No TypeScript errors from missing section imports (Plans 02, 03, 04 created them)

If build fails, do not patch — escalate by re-reading each dependent plan's acceptance criteria to identify which upstream file is missing or malformed.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `npm run build` exits with code 0
- Build output does NOT contain `hostname "images.unsplash.com" is not configured`
- Build output does NOT contain `The "images.domains" configuration is deprecated`
- Build output does NOT contain any TypeScript error prefixed with `Type error:`
- `app/page.tsx` exists and imports Hero, Gallery, HowItWorks, OurStory
</acceptance_criteria>
</task>

## Verification

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating

# 1. page.tsx wires all four sections + anchor
grep -q "import { Hero } from '@/components/sections/Hero'" app/page.tsx
grep -q "import { Gallery } from '@/components/sections/Gallery'" app/page.tsx
grep -q "import { HowItWorks } from '@/components/sections/HowItWorks'" app/page.tsx
grep -q "import { OurStory } from '@/components/sections/OurStory'" app/page.tsx
grep -q "<Hero />" app/page.tsx
grep -q "<Gallery />" app/page.tsx
grep -q "<HowItWorks />" app/page.tsx
grep -q "<OurStory />" app/page.tsx
grep -q 'id="lead-form"' app/page.tsx

# 2. page.tsx does NOT import Footer (it's in layout.tsx)
! grep -q "import { Footer }" app/page.tsx && echo "OK: Footer not imported in page.tsx"

# 3. CTA target consistency — Hero's href="#lead-form" matches page.tsx anchor
grep -q 'href="#lead-form"' components/sections/Hero.tsx && echo "OK: Hero CTA targets #lead-form"
grep -q 'id="lead-form"' app/page.tsx && echo "OK: page.tsx provides #lead-form anchor"

# 4. TypeScript and build clean
npx tsc --noEmit
npm run build
```

## Must Haves
- [ ] `app/page.tsx` imports all four section components via `@/components/sections/...` named imports
- [ ] `app/page.tsx` does NOT import `Footer` (Footer is rendered by `app/layout.tsx`)
- [ ] Render order: `<Hero />` → `<Gallery />` → `<HowItWorks />` → `<OurStory />` → `#lead-form` div
- [ ] `#lead-form` anchor div has EXACT `id="lead-form"` and `bg-luxury-navy py-16 lg:py-24` so Hero/Header scroll targets have physical height
- [ ] `<main>` wrapper has no conflicting classes — `bg-luxury-black` lives on `<body>` (from `app/layout.tsx`)
- [ ] `npx tsc --noEmit` exits with code 0
- [ ] `npm run build` exits with code 0
- [ ] Build produces a successful Static page at `/` with no Unsplash hostname errors or deprecation warnings
- [ ] All five Phase 2 requirements (CONT-01..05) are now user-visible on `localhost:3000`
