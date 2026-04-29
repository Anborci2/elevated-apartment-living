# Phase 2: Content Sections - Research

**Researched:** 2026-04-19
**Phase:** 02-content-sections
**Sections covered:** Hero, Gallery, How It Works, Our Story, Footer

---

## Key Technical Findings

1. **`next.config.mjs` has no image domains configured** — Unsplash external images will fail at runtime unless `remotePatterns` is added before implementing Gallery or Hero.
2. **`globals.css` already has `scroll-behavior: smooth` on `html`** — the Hero CTA `<a href="#lead-form">` will work with zero JS.
3. **`components/sections/` directory does not exist yet** — needs to be created; all four new section components go there.
4. **`Footer.tsx` is a simple Server Component** — easy to replace; already has the right structural class names, just needs real content swapped in.
5. **`app/page.tsx` is a near-empty placeholder** (`<main className="min-h-screen bg-luxury-black" />`) — Phase 2 replaces it entirely.
6. **All Tailwind tokens are confirmed in `tailwind.config.ts`** — `bg-luxury-black`, `bg-luxury-navy`, `text-luxury-gold`, `text-luxury-text-primary`, `text-luxury-text-secondary`, `border-luxury-gold-muted`, `font-playfair`, `font-inter`, `text-display`, `text-display-mobile` are all available.
7. **Header already wires `#lead-form` scroll** via `document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })` — the Phase 2 anchor placeholder must use `id="lead-form"` exactly.

---

## next/image + Unsplash

### The Problem

`next/image` blocks external image sources by default. The Hero background and all 6 Gallery images use `images.unsplash.com` URLs. Without configuration, Next.js throws:

```
Error: Invalid src prop (https://images.unsplash.com/...) on `next/image`, hostname "images.unsplash.com" is not configured
```

### Fix: `remotePatterns` in `next.config.mjs`

The modern approach (Next.js 13.4+) uses `remotePatterns` instead of the deprecated `domains` array:

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
```

**This must be done first** — before any `next/image` component that references an Unsplash URL is rendered. Failure to do this will crash the dev server for any page that loads the Gallery or Hero.

### `domains` vs `remotePatterns`

- `domains: ['images.unsplash.com']` — deprecated as of Next.js 14, still works but generates a warning
- `remotePatterns` — current API, more secure (can restrict by path), no warning
- Use `remotePatterns` for this project

### `fill` vs `width`/`height` Props

Two usage patterns for `next/image`:

**Pattern A — `fill` (for Hero and Gallery):**
```tsx
<div className="relative aspect-[4/3] overflow-hidden">
  <Image fill src={url} alt="..." sizes="..." className="object-cover" />
</div>
```
- Parent must have `position: relative` (Tailwind: just `relative`)
- Parent controls dimensions via CSS (aspect ratio, height)
- `sizes` prop is required for `fill` to generate correct srcset
- `className="object-cover"` ensures the image covers the container

**Pattern B — explicit `width`/`height` (not used here):**
- Not appropriate for full-bleed or grid images where the container drives dimensions

**Hero-specific:** Use `fill` + `priority` (loads eagerly, no lazy loading) + `quality={90}`:
```tsx
<Image fill priority quality={90} src={heroUrl} alt="Luxury Denver apartment" className="object-cover object-center" />
```

### `sizes` Prop for Gallery

The `sizes` prop tells the browser which image size to download at each viewport width. For a 3-col → 2-col → 1-col grid:

```tsx
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

- Below 640px (mobile): image spans 100% of viewport
- 640–1024px (tablet): image spans 50% of viewport
- Above 1024px (desktop): image spans ~33% of viewport

This prevents downloading a 1920px image for a 400px cell.

---

## Hero Section Implementation

### Full-Bleed Background with Overlay

The correct pattern for a full-viewport hero with background image + dark overlay:

```tsx
<section className="relative min-h-screen flex items-center justify-center" aria-label="Hero">
  {/* Background image layer */}
  <div className="absolute inset-0">
    <Image
      fill
      priority
      quality={90}
      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
      alt=""  {/* decorative — aria-hidden effectively */}
      className="object-cover object-center"
    />
  </div>
  {/* Overlay layer */}
  <div className="absolute inset-0 bg-luxury-black/60" />
  {/* Content layer */}
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
    {/* headline, sub-headline, CTA */}
  </div>
</section>
```

**Layer ordering:**
- `absolute inset-0` image fills the section
- `absolute inset-0 bg-luxury-black/60` sits on top of the image (60% dark overlay)
- `relative z-10` content sits above both

**`bg-luxury-black/60` syntax:** Tailwind opacity modifier — generates `rgba(10, 11, 13, 0.60)` from the configured `#0A0B0D` token. This is the correct way to apply the 60% dark overlay using existing tokens.

### Viewport Height

`min-h-screen` is preferred over `h-screen`:
- `h-screen` clips content if it overflows (mobile browsers with address bars can cause issues)
- `min-h-screen` expands naturally if content is taller than viewport

### Header Overlay

The header is `fixed z-50` — it sits visually on top of the hero with no layout interaction. The hero uses `min-h-screen` which fills the full viewport. **Do not add `padding-top` to the Hero section** — the transparent header is designed to float above the image.

### CTA Smooth Scroll

`globals.css` already has `html { scroll-behavior: smooth; }`, so a plain anchor link works:

```tsx
<a href="#lead-form">
  <button ...>Find My Apartment</button>
</a>
```

No JavaScript or `scrollIntoView` needed. The `href="#lead-form"` anchor must match the `id="lead-form"` on the placeholder div in `page.tsx`.

---

## Gallery Grid Implementation

### Responsive Grid Classes

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
```

- Default (mobile): 1 column
- `sm:` (640px+): 2 columns
- `lg:` (1024px+): 3 columns

### Aspect Ratio Enforcement

Each image cell uses `aspect-[4/3]` to enforce uniform 4:3 dimensions regardless of image content:

```tsx
<div className="relative aspect-[4/3] overflow-hidden group">
  <Image
    fill
    src={image.src}
    alt={image.alt}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
</div>
```

**`overflow-hidden`** is required on the parent — without it, `scale-105` on hover will cause the image to bleed outside its cell.

**`group` + `group-hover:scale-105`** — Tailwind group modifier. The parent `div` gets `group`, the child `Image` uses `group-hover:scale-105`. This triggers the scale effect when hovering the parent container (the full cell), not just the image element itself.

### Unsplash URL Strategy

6 placeholder URLs are already specified in the UI-SPEC. They use query params `?w=800&q=80` to limit download size. The `next/image` `sizes` prop + Next.js responsive image generation will serve appropriately sized versions for each device.

---

## Component Architecture

### Server Component vs Client Component Decision

In Next.js App Router, components are Server Components by default. Only add `'use client'` when browser APIs or React hooks (`useState`, `useEffect`) are required.

| Component | Type | Reason |
|-----------|------|--------|
| `Hero.tsx` | **Server Component** | Static content, no state, no browser APIs. CTA is a plain `<a href="#lead-form">` link — no JS needed thanks to `scroll-behavior: smooth` in globals.css |
| `Gallery.tsx` | **Server Component** | Static array of images, pure render, no interaction |
| `HowItWorks.tsx` | **Server Component** | Static content, no state |
| `OurStory.tsx` | **Server Component** | Static text, no interaction |
| `Footer.tsx` | **Server Component** | Static links and text. `new Date().getFullYear()` is valid in Server Components |

**No new Client Components are needed for Phase 2.** The Header is already `'use client'` (scroll listener). All five new/updated components are static renders.

### Component File Locations

```
components/
  layout/
    Header.tsx      — existing 'use client' (no change)
    Footer.tsx      — existing placeholder → replace with real content
  sections/         — directory needs to be created
    Hero.tsx        — new Server Component
    Gallery.tsx     — new Server Component
    HowItWorks.tsx  — new Server Component
    OurStory.tsx    — new Server Component
```

### Import Pattern in `app/page.tsx`

All section components are Server Components, so they import without any special treatment:

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
          <p className="font-inter text-luxury-text-secondary text-sm">
            {/* Phase 3: Lead form mounts here */}
          </p>
        </div>
      </div>
    </main>
  )
}
```

The `<main>` wrapper does not need `min-h-screen bg-luxury-black` — the body already has `bg-luxury-black` from `layout.tsx`, and the sections define their own backgrounds.

---

## Footer Replacement

### Current State

`components/layout/Footer.tsx` is a pure Server Component with placeholder content:

```tsx
export function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-luxury-gold-muted py-8" aria-label="Site footer">
      <div className="max-w-content mx-auto px-6 lg:px-12 flex items-center justify-center">
        <p className="font-inter text-sm text-luxury-text-secondary tracking-wide">
          {/* Placeholder — real content added in Phase 2 */}
          &copy; {new Date().getFullYear()} Elevated Apartment Locating
        </p>
      </div>
    </footer>
  )
}
```

### What to Replace It With

The UI-SPEC calls for a three-element layout (business name | email | copyright) using `flex flex-col sm:flex-row items-center justify-between`:

- Left: business name in `font-playfair text-luxury-text-primary`
- Center: `mailto:` link in `text-luxury-gold` with hover to `text-luxury-text-primary`
- Right: copyright in `text-luxury-text-secondary`

**Key change:** Current footer uses `justify-center` (single centered element) — the replacement uses `justify-between` (three spaced elements). The structural classes (`bg-luxury-black`, `border-t border-luxury-gold-muted`, `py-8`) stay the same.

**`new Date().getFullYear()`** — valid in a Server Component. Renders the year server-side at build time (or on each request in dev mode). This is the correct approach; no `'use client'` needed.

**`max-w-content` token** — already in `tailwind.config.ts` as `maxWidth: { content: '1280px' }`. Use `max-w-content` or switch to `max-w-7xl` per UI-SPEC — both resolve to 1280px.

---

## Pitfalls to Avoid

### 1. Forgetting `remotePatterns` in `next.config.mjs`

**Symptom:** Dev server throws `hostname "images.unsplash.com" is not configured` and the page crashes.
**Fix:** Add `remotePatterns` config **before** writing any component that references Unsplash URLs. Do this as step one of Phase 2 execution.

### 2. Missing `overflow-hidden` on Gallery Image Cells

**Symptom:** On hover, `scale-105` causes images to visually overflow their grid cells, breaking the grid.
**Fix:** Always pair `overflow-hidden` with any container that has a scaled child.

### 3. Hero `position: relative` on Section

**Symptom:** The absolute-positioned background image and overlay don't stay inside the hero section — they cover the entire page.
**Fix:** The `<section>` must have `relative` (Tailwind). `absolute inset-0` children are positioned relative to the nearest ancestor with `position: relative`.

### 4. Hero `z-index` Stack Order

**Symptom:** The dark overlay covers the hero text content.
**Fix:** Three layers in order: `absolute` background image → `absolute` overlay → `relative z-10` content. The `z-10` on the content div is required.

### 5. `fill` Image Without Explicit Parent Height

**Symptom:** Gallery images render at 0px height (invisible).
**Fix:** `fill` requires the parent to have an explicit or computable height. Using `aspect-[4/3]` on the parent with Tailwind resolves this — the aspect ratio creates an intrinsic height based on width.

### 6. CTA as Button Instead of Anchor

**Symptom:** Header CTA scrolls fine (uses `scrollIntoView` JS), but Hero CTA doesn't scroll.
**Fix:** Hero CTA should be `<a href="#lead-form">` — a plain anchor link, not a `<button>`. `scroll-behavior: smooth` in CSS handles the animation automatically.

### 7. `id="lead-form"` Mismatch

**Symptom:** Header button doesn't scroll to the form anchor; Hero CTA doesn't work.
**Fix:** The placeholder div in `app/page.tsx` must have exactly `id="lead-form"`. Both the Header's `scrollIntoView` call and the Hero's `href="#lead-form"` target this exact ID.

### 8. `components/sections/` Directory Doesn't Exist

**Symptom:** Import errors when `page.tsx` references `@/components/sections/Hero`.
**Fix:** Create the directory before creating component files. In Node/TypeScript projects, the directory must exist before files can be placed in it.

### 9. `bg-luxury-black/60` Tailwind Opacity Syntax

**Symptom:** Overlay not applying, or applying wrong opacity.
**Note:** `bg-luxury-black/60` is valid Tailwind v3 syntax for `background-color: rgba(10, 11, 13, 0.60)`. This works because `luxury-black` is a hex value token. If the token were defined as a CSS variable rather than a literal color, opacity modifiers wouldn't work without special configuration.

### 10. Replacing `main`'s `min-h-screen bg-luxury-black`

**Symptom:** After rewriting `page.tsx`, background flickers or disappears.
**Note:** The `<body>` in `layout.tsx` already has `bg-luxury-black`. The `<main>` wrapper in `page.tsx` does not need to repeat this. Each section component sets its own background (`bg-luxury-black` or `bg-luxury-navy`). The hero `min-h-screen` handles viewport fill.

---

## Recommended Approach

### Execution Order

1. **`next.config.mjs`** — Add `remotePatterns` for `images.unsplash.com`. Required before any other step.
2. **`components/sections/` directory** — Create the directory.
3. **`Hero.tsx`** — Implement with `fill` background image, overlay, headline, sub-headline, and anchor CTA. Server Component.
4. **`Gallery.tsx`** — Implement with 6 Unsplash images in responsive grid. Server Component.
5. **`HowItWorks.tsx`** — Implement 3-step layout. Server Component.
6. **`OurStory.tsx`** — Implement two-column text layout. Server Component.
7. **`Footer.tsx`** — Replace placeholder with real three-element layout.
8. **`app/page.tsx`** — Wire all sections + form anchor placeholder.

### Key Technical Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Unsplash config | `remotePatterns` (not `domains`) | Not deprecated; more precise |
| Hero background | `next/image` with `fill` + overlay div | Correct semantics, optimized loading |
| CTA scroll | Pure CSS `scroll-behavior: smooth` + `<a href="#lead-form">` | Already configured in globals.css; no JS required |
| Gallery aspect ratio | `aspect-[4/3]` on parent, `fill` on image | Enforces uniform cell height |
| Gallery hover | `group`/`group-hover:scale-105` + `overflow-hidden` | Clean Tailwind pattern, no JS |
| All new sections | Server Components | No browser APIs needed; simpler, faster |
| Footer | Modify existing file | Replace content, keep structure classes |
| `page.tsx` rewrite | Full replacement | Existing content is a single-line placeholder |

### Token Reference (Quick Lookup)

| Tailwind class | Value |
|----------------|-------|
| `bg-luxury-black` | `#0A0B0D` |
| `bg-luxury-navy` | `#0D1B2A` |
| `text-luxury-gold` | `#C9A96E` |
| `text-luxury-text-primary` | `#F5F0E8` |
| `text-luxury-text-secondary` | `#A8A29E` |
| `border-luxury-gold-muted` | `rgba(201, 169, 110, 0.2)` |
| `bg-luxury-black/60` | `rgba(10, 11, 13, 0.6)` — hero overlay |
| `font-playfair` | Playfair Display |
| `font-inter` | Inter |
| `text-display` | 5rem / 80px, lh 1.1 |
| `text-display-mobile` | 3rem / 48px, lh 1.1 |
| `max-w-content` | 1280px |
| `max-w-7xl` | 1280px (standard Tailwind) |

---

## RESEARCH COMPLETE
