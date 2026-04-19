---
plan: 03
title: Header + Footer Shell
wave: 3
depends_on: [01, 02]
autonomous: true
requirements_addressed: [FOUND-04]
files_modified:
  - components/layout/Header.tsx
  - components/layout/Footer.tsx
  - app/layout.tsx
---

# Plan 03: Header + Footer Shell

## Objective

Build the responsive Header component (Client Component with scroll-based transparency transition) and a Footer placeholder component, then wire both into `app/layout.tsx`. The Header starts fully transparent and transitions to a near-black semi-transparent background with backdrop blur after 80px of scroll. After this plan, the layout shell is complete and visible at both 375px mobile and 1280px desktop viewports, satisfying FOUND-04.

## Tasks

<task id="T03-01">
<title>Create the Header component</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
</read_first>
<action>
Create the directory `components/layout/` if it does not exist, then create `components/layout/Header.tsx` with the following content:

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    // Check scroll position on mount (in case page loads mid-scroll)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between',
        'h-16 lg:h-[72px]',
        'px-6 lg:px-12',
        'transition-all duration-300',
        isScrolled
          ? 'bg-luxury-black/92 backdrop-blur-[12px] border-b border-luxury-gold-muted'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* Logo mark */}
      <Link
        href="/"
        aria-label="Elevated Apartment Locating — home"
        className="flex flex-col gap-[2px]"
      >
        <span className="font-playfair text-[22px] lg:text-[28px] font-bold tracking-widest text-luxury-text-primary leading-none">
          ELEVATED
        </span>
        <span className="font-inter text-[10px] lg:text-[11px] font-normal tracking-[0.15em] uppercase text-luxury-text-secondary leading-none">
          Apartment Locating
        </span>
      </Link>

      {/* Primary CTA */}
      <button
        type="button"
        className="border border-luxury-gold px-5 lg:px-6 py-2 lg:py-2.5 font-inter text-[13px] lg:text-sm font-semibold tracking-widest uppercase text-luxury-gold rounded-none transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2"
        onClick={() => {
          document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Find My Apartment
      </button>
    </header>
  )
}
```

Key decisions:
- `'use client'` required for `useState`, `useEffect`, and `window` access
- `handleScroll()` called once on mount to handle mid-page loads or direct hash navigation
- `passive: true` on the scroll listener for better scroll performance
- Cleanup function removes listener on unmount (prevents memory leak)
- `h-16` (64px) on mobile, `lg:h-[72px]` (72px) on desktop — matches UI spec exactly
- `bg-luxury-black/92` uses Tailwind opacity modifier: `#0A0B0D` at 92% opacity
- `backdrop-blur-[12px]` — arbitrary value for 12px blur (UI spec requirement)
- `rounded-none` on button — luxury aesthetic, no border radius
- `onClick` scrolls to `#lead-form` anchor — used by Phase 3 form section
- `focus-visible:outline` ensures keyboard accessibility WCAG AA compliance
</action>
<acceptance_criteria>
- File `components/layout/Header.tsx` exists
- `components/layout/Header.tsx` starts with `'use client'`
- `components/layout/Header.tsx` contains `useState` and `useEffect` imports
- `components/layout/Header.tsx` contains `window.scrollY > 80`
- `components/layout/Header.tsx` contains `{ passive: true }`
- `components/layout/Header.tsx` contains `removeEventListener` (cleanup)
- `components/layout/Header.tsx` contains `backdrop-blur-[12px]`
- `components/layout/Header.tsx` contains `bg-luxury-black/92`
- `components/layout/Header.tsx` contains `border-luxury-gold-muted`
- `components/layout/Header.tsx` contains `ELEVATED` as text content
- `components/layout/Header.tsx` contains `Apartment Locating` as text content
- `components/layout/Header.tsx` contains `Find My Apartment` as button text
- `components/layout/Header.tsx` contains `rounded-none`
- `components/layout/Header.tsx` contains `export function Header`
</acceptance_criteria>
</task>

<task id="T03-02">
<title>Create the Footer placeholder component</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-CONTEXT.md
</read_first>
<action>
Create `components/layout/Footer.tsx` with the following content. This is a Phase 1 placeholder — real content (business name, email, copyright) is added in Phase 2.

```tsx
export function Footer() {
  return (
    <footer
      className="bg-luxury-black border-t border-luxury-gold-muted py-8"
      aria-label="Site footer"
    >
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

This is a Server Component (no `'use client'` directive) — `new Date()` is evaluated at render time on the server and updated at build time.
</action>
<acceptance_criteria>
- File `components/layout/Footer.tsx` exists
- `components/layout/Footer.tsx` does NOT contain `'use client'`
- `components/layout/Footer.tsx` contains `export function Footer`
- `components/layout/Footer.tsx` contains `bg-luxury-black`
- `components/layout/Footer.tsx` contains `border-luxury-gold-muted`
- `components/layout/Footer.tsx` contains `aria-label="Site footer"`
- `components/layout/Footer.tsx` contains `Elevated Apartment Locating`
</acceptance_criteria>
</task>

<task id="T03-03">
<title>Wire Header and Footer into app/layout.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Header.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
</read_first>
<action>
Update `app/layout.tsx` to import and render Header and Footer. The font configuration from Plan 02 must be preserved exactly. Only add the imports and component usage — do not alter any font or metadata config.

The final `app/layout.tsx` should look like this:

```tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Elevated Apartment Locating',
  description:
    'Denver\'s premier apartment locating service. Tell us what you\'re looking for — Alan handles the rest.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-inter bg-luxury-black text-luxury-text-primary antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

Note: No `pt-16` or `pt-[72px]` padding is added to `<body>` here. The Hero section in Phase 2 is designed to sit under the transparent header (full-bleed hero), so page-level top padding is intentionally omitted. Individual sections that follow the hero will handle their own top spacing.
</action>
<acceptance_criteria>
- `app/layout.tsx` contains `import { Header } from '@/components/layout/Header'`
- `app/layout.tsx` contains `import { Footer } from '@/components/layout/Footer'`
- `app/layout.tsx` contains `<Header />` inside `<body>`
- `app/layout.tsx` contains `<Footer />` inside `<body>`
- `app/layout.tsx` still contains `Playfair_Display` import (font config preserved)
- `app/layout.tsx` still contains `playfair.variable` and `inter.variable` on `<html>`
- Running `npx tsc --noEmit` exits with code 0
</acceptance_criteria>
</task>

<task id="T03-04">
<title>Final TypeScript and build verification</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Header.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
</read_first>
<action>
Run the full TypeScript check and production build to confirm all components compile cleanly and Next.js has no errors.

```bash
# From project root
npx tsc --noEmit
npm run build
```

Both must exit with code 0. No source file changes needed — this is verification only.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `npm run build` exits with code 0
- `components/layout/Header.tsx` exists and contains `'use client'`
- `components/layout/Header.tsx` contains `window.scrollY > 80`
- `components/layout/Header.tsx` contains `removeEventListener`
- `components/layout/Header.tsx` contains `bg-luxury-black/92`
- `components/layout/Footer.tsx` exists and does NOT contain `'use client'`
- `app/layout.tsx` contains `<Header />` and `<Footer />`
- `app/layout.tsx` contains `import { Header }` and `import { Footer }`
</acceptance_criteria>
</task>

## Verification

```bash
# From project root:

# 1. Confirm component files exist
ls components/layout/Header.tsx components/layout/Footer.tsx

# 2. Confirm 'use client' on Header (required for hooks)
grep "'use client'" components/layout/Header.tsx

# 3. Confirm Header exports and scroll logic
grep "export function Header\|window.scrollY\|removeEventListener" components/layout/Header.tsx

# 4. Confirm Footer is a Server Component (no 'use client')
grep -c "'use client'" components/layout/Footer.tsx
# Expected: 0

# 5. Confirm layout.tsx wires both components
grep "Header\|Footer" app/layout.tsx

# 6. TypeScript clean
npx tsc --noEmit

# 7. Production build clean
npm run build
```

## Must Haves
- [ ] `components/layout/Header.tsx` exists with `'use client'` directive
- [ ] Header scroll listener uses `{ passive: true }` and includes cleanup `removeEventListener`
- [ ] Header initial state: `bg-transparent`, scrolled state: `bg-luxury-black/92 backdrop-blur-[12px] border-b border-luxury-gold-muted`
- [ ] Header height: `h-16` (64px) mobile, `lg:h-[72px]` (72px) desktop
- [ ] Logo: "ELEVATED" in `font-playfair font-bold tracking-widest`, subtitle in `font-inter tracking-[0.15em] uppercase`
- [ ] CTA button: `border border-luxury-gold text-luxury-gold rounded-none hover:bg-luxury-gold hover:text-luxury-black`
- [ ] `components/layout/Footer.tsx` exists as Server Component with `bg-luxury-black border-t border-luxury-gold-muted`
- [ ] Both `<Header />` and `<Footer />` rendered in `app/layout.tsx`
- [ ] `npm run build` exits with code 0
- [ ] No horizontal scroll at 375px viewport
