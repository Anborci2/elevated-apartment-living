---
plan: 02
title: Typography System
wave: 2
depends_on: [01]
autonomous: true
requirements_addressed: [FOUND-03]
files_modified:
  - app/layout.tsx
---

# Plan 02: Typography System

## Objective

Configure the Playfair Display + Inter font pairing using `next/font/google`, expose both fonts as CSS custom properties (`--font-playfair`, `--font-inter`) on the `<html>` element in `app/layout.tsx`, and apply the `font-inter` base class to `<body>`. This establishes zero-layout-shift typography that all subsequent phases use for headings (Playfair Display) and body/UI text (Inter).

## Tasks

<task id="T02-01">
<title>Configure next/font/google in app/layout.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
</read_first>
<action>
Replace the full contents of `app/layout.tsx` with the following. This configures both fonts, sets CSS variables on `<html>`, applies the base font and background color to `<body>`, and includes baseline metadata.

Note: The `<Header />` and `<Footer />` imports are added in Plan 03. For this plan, `layout.tsx` renders `{children}` directly — do not import Header/Footer yet.

```tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
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
        {children}
      </body>
    </html>
  )
}
```

Key decisions baked in:
- `weight: ['600', '700']` for Playfair — matches hero (700) and sub-heading (600) from UI spec
- `weight: ['400', '500', '600']` for Inter — matches body (400), nav (500), and button (600) from UI spec
- `display: 'swap'` prevents invisible text flash; Next.js handles size-adjust automatically
- `antialiased` class applies `-webkit-font-smoothing: antialiased` for crisper rendering on dark backgrounds
- CSS variables exposed on `<html>` so Tailwind `fontFamily` config can reference them at any nesting depth
</action>
<acceptance_criteria>
- `app/layout.tsx` contains `from 'next/font/google'`
- `app/layout.tsx` contains `Playfair_Display`
- `app/layout.tsx` contains `Inter`
- `app/layout.tsx` contains `variable: '--font-playfair'`
- `app/layout.tsx` contains `variable: '--font-inter'`
- `app/layout.tsx` contains `${playfair.variable} ${inter.variable}` on the `<html>` element
- `app/layout.tsx` contains `font-inter` class on `<body>`
- `app/layout.tsx` contains `bg-luxury-black` on `<body>`
- `app/layout.tsx` contains `text-luxury-text-primary` on `<body>`
- `app/layout.tsx` contains `display: 'swap'` for both font configs
- `app/layout.tsx` does NOT import Header or Footer (those are added in Plan 03)
</acceptance_criteria>
</task>

<task id="T02-02">
<title>Verify typography system compiles and builds cleanly</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/layout.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
</read_first>
<action>
Run TypeScript type-check and production build to confirm the font configuration is valid and all Tailwind font-family tokens resolve correctly.

```bash
# From project root
npx tsc --noEmit
npm run build
```

Both commands must exit with code 0. No changes to source files are needed — this task is verification only.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0 (no TypeScript errors in layout.tsx or font config)
- `npm run build` exits with code 0 (Next.js font optimization pipeline succeeds)
- `app/layout.tsx` contains `Playfair_Display` and `Inter` imports (from T02-01)
- `app/layout.tsx` contains `variable: '--font-playfair'` and `variable: '--font-inter'`
- `tailwind.config.ts` contains `fontFamily` section with `playfair` and `inter` keys referencing `var(--font-playfair)` and `var(--font-inter)`
</acceptance_criteria>
</task>

## Verification

```bash
# From project root:

# 1. Confirm font imports are in layout
grep "Playfair_Display\|Inter" app/layout.tsx

# 2. Confirm CSS variable names match what tailwind.config.ts references
grep "font-playfair\|font-inter" app/layout.tsx

# 3. Confirm variable classes applied to <html>
grep "playfair.variable\|inter.variable" app/layout.tsx

# 4. Confirm font-inter applied to <body>
grep "font-inter" app/layout.tsx

# 5. TypeScript check
npx tsc --noEmit

# 6. Build check (no font config errors)
npm run build
```

## Must Haves
- [ ] `app/layout.tsx` imports `Playfair_Display` and `Inter` from `next/font/google`
- [ ] Both fonts use `display: 'swap'`
- [ ] CSS variables `--font-playfair` and `--font-inter` are set via `variable:` option
- [ ] Both variable classnames applied to `<html>` element: `className={`${playfair.variable} ${inter.variable}`}`
- [ ] `<body>` has `font-inter bg-luxury-black text-luxury-text-primary antialiased`
- [ ] `npm run build` exits with code 0 (no font-related build errors)
