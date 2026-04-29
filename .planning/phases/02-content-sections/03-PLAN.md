---
plan: 03
title: Gallery Section — 6 Unsplash images in responsive grid
wave: 2
depends_on: [01]
autonomous: true
requirements_addressed: [CONT-02]
files_modified:
  - components/sections/Gallery.tsx
---

# Plan 03: Gallery Section — 6 Unsplash images in responsive grid

## Objective

Create `components/sections/Gallery.tsx` as a Server Component that renders a responsive photo grid of 6 luxury apartment images from Unsplash. Grid is 1 column on mobile, 2 columns on `sm:` (640px+), and 3 columns on `lg:` (1024px+). Each image is rendered via `next/image` with `fill` inside a `relative aspect-[4/3] overflow-hidden` wrapper and gets a subtle `group-hover:scale-105` zoom. This satisfies **CONT-02**: Photo gallery section displays 6+ high-quality placeholder apartment images.

Depends on Plan 01 because the Unsplash hostname must be whitelisted in `next.config.mjs` and `components/sections/` must exist.

## Tasks

<task id="T03-01">
<title>Create components/sections/Gallery.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/next.config.mjs
</read_first>
<action>
Create `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Gallery.tsx` as a Server Component with the exact content below.

Architecture:
- Section has `bg-luxury-navy py-16 lg:py-24` (secondary background color, alternates with the black hero)
- Inner `max-w-7xl mx-auto px-6 lg:px-12` container
- Centered heading + sub-heading above the grid
- 6 images from the approved Unsplash URLs in `02-UI-SPEC.md`
- Each image cell: `group relative aspect-[4/3] overflow-hidden` — the `group` class enables hover-scaling, `overflow-hidden` prevents the scaled image from bleeding out, `aspect-[4/3]` gives `<Image fill>` a computable parent height.
- `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` — matches the 1-col → 2-col → 3-col breakpoints so the browser only downloads the size it actually renders.

```tsx
import Image from 'next/image'

type GalleryImage = {
  src: string
  alt: string
}

const images: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    alt: 'Luxury Denver apartment living room with modern furnishings',
  },
  {
    src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
    alt: 'Elegant apartment bedroom with soft natural light',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    alt: 'Modern Denver apartment kitchen with quartz countertops',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    alt: 'Open-plan apartment living area with contemporary design',
  },
  {
    src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    alt: 'Stylish apartment bathroom with designer finishes',
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    alt: 'Denver apartment building exterior with city view',
  },
]

export function Gallery() {
  return (
    <section
      aria-label="Photo gallery"
      className="bg-luxury-navy py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
            Luxury Denver Living
          </h2>
          <p className="mt-3 font-inter text-base text-luxury-text-secondary">
            Handpicked properties across Denver&apos;s finest neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {images.map((image) => (
            <div
              key={image.src}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key decisions:
- **Server Component** — no state, no browser APIs, pure render
- **6 images exactly** — satisfies CONT-02 ("6+ high-quality placeholder apartment images"); URLs come verbatim from Phase 2 UI-SPEC
- **Typed `GalleryImage` array** — ensures each entry has both `src` and `alt`; TypeScript catches missing alt text at compile time
- **`key={image.src}`** — Unsplash photo IDs are unique and stable, suitable as React keys (no index-as-key anti-pattern)
- **`aspect-[4/3]` on the wrapper** — required because `<Image fill>` needs a parent with a computable height; aspect ratio provides intrinsic height from width
- **`overflow-hidden`** — required; without it, `group-hover:scale-105` visually bleeds past the grid cell and breaks the layout
- **`group` + `group-hover:scale-105`** — Tailwind group modifier; hovering anywhere in the cell (not just the image) triggers the scale
- **`transition-transform duration-500`** — 500ms easing on the zoom; subtle, not bouncy
- **`sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`** — matches the 1-col → 2-col → 3-col breakpoints from the grid classes; prevents downloading oversized images for small cells
- **Alt text is descriptive, not decorative** — each image describes the room type for screen reader users
- **`&apos;`** in "Denver's" — encoded apostrophe to satisfy React/JSX linting
- **Typography:** `text-3xl lg:text-5xl` matches the Section Heading spec (32px mobile, 48px desktop)
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Gallery.tsx` exists
- `components/sections/Gallery.tsx` does NOT contain `'use client'`
- `components/sections/Gallery.tsx` contains `import Image from 'next/image'`
- `components/sections/Gallery.tsx` contains `export function Gallery`
- `components/sections/Gallery.tsx` contains at least 6 occurrences of `images.unsplash.com`
- `components/sections/Gallery.tsx` contains the literal string `Luxury Denver Living`
- `components/sections/Gallery.tsx` contains the literal string `Handpicked properties`
- `components/sections/Gallery.tsx` contains `bg-luxury-navy`
- `components/sections/Gallery.tsx` contains `py-16 lg:py-24`
- `components/sections/Gallery.tsx` contains `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- `components/sections/Gallery.tsx` contains `aspect-[4/3]`
- `components/sections/Gallery.tsx` contains `overflow-hidden`
- `components/sections/Gallery.tsx` contains `group-hover:scale-105`
- `components/sections/Gallery.tsx` contains `transition-transform duration-500`
- `components/sections/Gallery.tsx` contains `object-cover`
- `components/sections/Gallery.tsx` contains `fill`
- `components/sections/Gallery.tsx` contains `sizes=`
- `components/sections/Gallery.tsx` contains `(max-width: 640px) 100vw`
- `components/sections/Gallery.tsx` contains `33vw`
- `components/sections/Gallery.tsx` contains `font-playfair` and `font-inter`
- `components/sections/Gallery.tsx` contains `text-luxury-text-primary` and `text-luxury-text-secondary`
- `components/sections/Gallery.tsx` contains `max-w-7xl`
- Running `grep -c "alt:" components/sections/Gallery.tsx` returns exactly 6
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T03-02">
<title>TypeScript verification for Gallery</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/Gallery.tsx
</read_first>
<action>
Run the TypeScript compiler to confirm `Gallery.tsx` compiles cleanly. Gallery is not yet wired into `page.tsx` (that happens in Plan 05), so `tsc` only checks the file itself.

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating
npx tsc --noEmit
```

Must exit with code 0.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `components/sections/Gallery.tsx` exists
</acceptance_criteria>
</task>

## Verification

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating

# 1. File exists and is a Server Component
[ -f components/sections/Gallery.tsx ] && echo "OK: Gallery.tsx exists"
! grep -q "'use client'" components/sections/Gallery.tsx && echo "OK: Server Component"

# 2. 6 images confirmed
count=$(grep -c "images.unsplash.com" components/sections/Gallery.tsx)
[ "$count" -ge 6 ] && echo "OK: 6+ Unsplash URLs"

count_alts=$(grep -c "alt:" components/sections/Gallery.tsx)
[ "$count_alts" -eq 6 ] && echo "OK: exactly 6 alt: entries"

# 3. Grid + aspect + hover contract
grep -q "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" components/sections/Gallery.tsx
grep -q "aspect-\[4/3\]" components/sections/Gallery.tsx
grep -q "overflow-hidden" components/sections/Gallery.tsx
grep -q "group-hover:scale-105" components/sections/Gallery.tsx
grep -q "sizes=" components/sections/Gallery.tsx

# 4. Heading + copy
grep -q "Luxury Denver Living" components/sections/Gallery.tsx
grep -q "Handpicked properties" components/sections/Gallery.tsx

# 5. TypeScript clean
npx tsc --noEmit
```

## Must Haves
- [ ] `components/sections/Gallery.tsx` exists as a Server Component (no `'use client'`)
- [ ] Exactly 6 Unsplash image entries, each with descriptive `alt` text
- [ ] Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-4 lg:gap-6`
- [ ] Each image cell uses `group relative aspect-[4/3] overflow-hidden`
- [ ] Each `<Image>` uses `fill`, `object-cover`, and `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- [ ] Each `<Image>` has `transition-transform duration-500 group-hover:scale-105`
- [ ] Section heading "Luxury Denver Living" in `font-playfair text-3xl lg:text-5xl`
- [ ] Section sub-heading "Handpicked properties across Denver's finest neighborhoods" in `font-inter text-base text-luxury-text-secondary`
- [ ] Section background: `bg-luxury-navy`, padding `py-16 lg:py-24`, inner container `max-w-7xl mx-auto px-6 lg:px-12`
- [ ] `npx tsc --noEmit` exits with code 0
