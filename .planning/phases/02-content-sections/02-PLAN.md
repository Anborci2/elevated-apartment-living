---
plan: 02
title: Hero Section — full-bleed background, headline, CTA
wave: 1
depends_on: [01]
autonomous: true
requirements_addressed: [CONT-01]
files_modified:
  - components/sections/Hero.tsx
---

# Plan 02: Hero Section — full-bleed background, headline, CTA

## Objective

Create `components/sections/Hero.tsx` as a Server Component that renders a full-viewport hero with a full-bleed Unsplash background image, a 60% dark overlay, the "Find Your Perfect Denver Home" headline in Playfair Display, a sub-headline in Inter, and a gold-outlined "Find My Apartment" CTA button that scrolls to the `#lead-form` anchor. This satisfies **CONT-01**: Hero section displays a compelling headline, sub-headline, and CTA button that scrolls to the form.

Depends on Plan 01 because the Unsplash hostname must be whitelisted in `next.config.mjs` before `next/image` can render the background, and `components/sections/` must exist before the file can be written.

## Tasks

<task id="T02-01">
<title>Create components/sections/Hero.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Header.tsx
</read_first>
<action>
Create `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Hero.tsx` as a Server Component (no `'use client'`) with the exact content below.

Architecture:
- Section is `relative min-h-screen` so absolute children are bounded and the hero fills the full viewport
- Three stacked layers: (1) `<Image fill>` background, (2) `bg-luxury-black/60` dark overlay, (3) content with `relative z-10`
- CTA is a plain `<a href="#lead-form">` — smooth scroll is handled by `html { scroll-behavior: smooth; }` already in globals.css (no JS, no `onClick`)
- No `padding-top` on the section — the fixed transparent header from Phase 1 overlays the hero deliberately

```tsx
import Image from 'next/image'

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center bg-luxury-black"
    >
      {/* Layer 1: Background image */}
      <div className="absolute inset-0">
        <Image
          fill
          priority
          quality={90}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
          alt=""
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-luxury-black/60" aria-hidden="true" />

      {/* Layer 3: Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-display-mobile lg:text-display font-bold text-luxury-text-primary tracking-tight leading-tight">
          Find Your Perfect Denver Home
        </h1>
        <p className="mt-4 font-inter text-base lg:text-lg text-luxury-text-secondary max-w-2xl mx-auto leading-relaxed">
          Denver&apos;s apartment locating expert — tell us what you need, and we&apos;ll find it.
        </p>
        <a href="#lead-form" className="inline-block mt-8">
          <span className="inline-block border border-luxury-gold text-luxury-gold bg-transparent px-8 py-3 font-inter text-sm font-semibold tracking-widest uppercase rounded-none transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2">
            Find My Apartment
          </span>
        </a>
      </div>
    </section>
  )
}
```

Key decisions:
- **Server Component** (no `'use client'`) — all content is static; the anchor link handles scroll via CSS
- **`next/image` with `fill`** — the only reliable way to full-bleed an external image in Next.js 14 App Router with Server Components. The parent div has `absolute inset-0`, so it gets an explicit bounding box, which `fill` requires.
- **NOT inline `style={{ backgroundImage }}`** — that prevents Next.js image optimization (no WebP conversion, no responsive srcset, no priority loading). The UI-SPEC mandates `next/image`.
- **Separate overlay div** with `bg-luxury-black/60` — the dark wash is a distinct DOM layer on top of the image. Do NOT attempt to overlay via inline `style` on the image layer.
- **`alt=""`** on the background image — it is purely decorative; the headline conveys the meaning. `aria-hidden="true"` on the overlay div confirms it is decorative.
- **`priority` + `quality={90}`** — hero image loads eagerly (above the fold) with high quality; no lazy-load delay.
- **`sizes="100vw"`** — the background always spans the full viewport width; this tells Next.js to generate a single large variant.
- **`min-h-screen` (not `h-screen`)** — expands if content overflows; avoids clipping on mobile browsers with dynamic address bars.
- **CTA is `<a href="#lead-form">` + inner `<span>` styled as a button** — not a `<button>` element. This keeps it a pure link (no JS required) and the styled `<span>` inside the anchor provides the visual button.
- **`&apos;`** in the sub-headline — React escapes unencoded apostrophes; `&apos;` is the safest choice for both "Denver's" and "we'll".
- **Headline sizing:** `text-display-mobile` (48px) by default, `lg:text-display` (80px) at 1024px+ — matches the Phase 2 UI-SPEC typography contract exactly.
- **Sub-headline sizing:** `text-base` (16px) mobile, `lg:text-lg` (18px) desktop — matches UI-SPEC.
- **Button spec:** `border border-luxury-gold text-luxury-gold bg-transparent px-8 py-3 ... hover:bg-luxury-gold hover:text-luxury-black` — identical to the Phase 1 CTA spec, intentionally.
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Hero.tsx` exists
- `components/sections/Hero.tsx` does NOT contain `'use client'`
- `components/sections/Hero.tsx` contains `import Image from 'next/image'`
- `components/sections/Hero.tsx` contains `export function Hero`
- `components/sections/Hero.tsx` contains the literal string `Find Your Perfect Denver Home`
- `components/sections/Hero.tsx` contains the literal string `Find My Apartment`
- `components/sections/Hero.tsx` contains the literal string `Denver` and `apartment locating expert`
- `components/sections/Hero.tsx` contains `href="#lead-form"`
- `components/sections/Hero.tsx` contains `min-h-screen`
- `components/sections/Hero.tsx` contains `relative` and `absolute inset-0`
- `components/sections/Hero.tsx` contains `bg-luxury-black/60`
- `components/sections/Hero.tsx` contains `relative z-10`
- `components/sections/Hero.tsx` contains `priority`
- `components/sections/Hero.tsx` contains `quality={90}`
- `components/sections/Hero.tsx` contains `fill`
- `components/sections/Hero.tsx` contains `object-cover`
- `components/sections/Hero.tsx` contains `images.unsplash.com`
- `components/sections/Hero.tsx` contains `font-playfair`
- `components/sections/Hero.tsx` contains `text-display-mobile` and `lg:text-display`
- `components/sections/Hero.tsx` contains `text-luxury-text-primary`
- `components/sections/Hero.tsx` contains `text-luxury-text-secondary`
- `components/sections/Hero.tsx` contains `border-luxury-gold` and `text-luxury-gold`
- `components/sections/Hero.tsx` contains `hover:bg-luxury-gold` and `hover:text-luxury-black`
- `components/sections/Hero.tsx` contains `rounded-none`
- `components/sections/Hero.tsx` contains `tracking-widest uppercase`
- `components/sections/Hero.tsx` contains `aria-label="Hero"`
- `components/sections/Hero.tsx` does NOT contain `style={{ backgroundImage`
- `components/sections/Hero.tsx` does NOT contain `<button`
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T02-02">
<title>TypeScript verification for Hero</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Hero.tsx
</read_first>
<action>
Run the TypeScript compiler to confirm the new `Hero.tsx` has no type errors. This does not import `Hero` anywhere yet (wiring happens in Plan 05), so `tsc` only checks the file itself compiles cleanly.

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating
npx tsc --noEmit
```

Must exit with code 0.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `components/sections/Hero.tsx` exists
</acceptance_criteria>
</task>

## Verification

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating

# 1. File exists
[ -f components/sections/Hero.tsx ] && echo "OK: Hero.tsx exists"

# 2. Server Component (no 'use client')
! grep -q "'use client'" components/sections/Hero.tsx && echo "OK: Server Component"

# 3. Key contract strings present
grep -q "Find Your Perfect Denver Home" components/sections/Hero.tsx
grep -q "Find My Apartment" components/sections/Hero.tsx
grep -q 'href="#lead-form"' components/sections/Hero.tsx
grep -q "min-h-screen" components/sections/Hero.tsx
grep -q "bg-luxury-black/60" components/sections/Hero.tsx
grep -q "relative z-10" components/sections/Hero.tsx
grep -q "priority" components/sections/Hero.tsx
grep -q "images.unsplash.com" components/sections/Hero.tsx

# 4. TypeScript clean
npx tsc --noEmit
```

## Must Haves
- [ ] `components/sections/Hero.tsx` exists as a Server Component (no `'use client'`)
- [ ] Hero uses `next/image` with `fill`, `priority`, `quality={90}`, and an Unsplash URL (NOT inline `style={{ backgroundImage }}`)
- [ ] Hero has a separate overlay `<div>` with `bg-luxury-black/60` — NOT a CSS filter on the image
- [ ] Content layer uses `relative z-10` to sit above image + overlay
- [ ] Headline reads exactly "Find Your Perfect Denver Home" and uses `font-playfair text-display-mobile lg:text-display`
- [ ] Sub-headline reads "Denver's apartment locating expert — tell us what you need, and we'll find it." (apostrophes may be encoded)
- [ ] CTA is an `<a href="#lead-form">` wrapping a button-styled span — NOT a `<button>` with `onClick`
- [ ] CTA copy reads exactly "Find My Apartment"
- [ ] CTA styling matches Phase 1 CTA spec: gold border, transparent bg, gold text, hover swaps to solid gold with black text, `rounded-none`, `tracking-widest uppercase`
- [ ] Section uses `min-h-screen` and has no `padding-top` (header overlay is intentional)
- [ ] `npx tsc --noEmit` exits with code 0
