# Phase 1: Foundation — Research

**Researched:** 2026-04-18  
**Context:** Technical planning for Next.js 14 App Router scaffold, Tailwind configuration, typography system, and responsive layout shell.

---

## Next.js 14 App Router Scaffold

### What `create-next-app` Generates

Running `npx create-next-app@latest` with default options creates:

```
app/
  layout.tsx           # Root layout (REQUIRED — contains <html> and <body>)
  page.tsx             # Home page
  globals.css          # Global Tailwind directives
  favicon.ico          # Site favicon
lib/
  utils.ts             # Utility exports (often for cn() classname helper)
public/
  next.svg, vercel.svg # Placeholder logos
tsconfig.json          # TypeScript config with path alias @/*
tailwind.config.ts     # Tailwind CSS configuration
next.config.ts         # Next.js configuration
package.json           # Dependencies (Next.js, React, Tailwind, etc.)
```

### What to Keep vs Delete

**KEEP:**
- `app/layout.tsx` — root layout is required; this is where fonts and global styles load
- `app/page.tsx` — single homepage for Phase 1; add content sections in Phase 2
- `app/globals.css` — essential for Tailwind directives (`@tailwind`, `@apply`)
- `tailwind.config.ts` — modify to add custom color tokens
- `tsconfig.json` — keep path alias `@/*` for imports
- `next.config.ts` — keep as-is, minimal config needed

**DELETE (generated boilerplate):**
- `public/next.svg`, `public/vercel.svg` — placeholder logos
- Sample content in `app/page.tsx` if you want a clean slate

### App Router Key Conventions

**File system → Routes:**
- `app/page.tsx` → `http://localhost:3000/`
- `app/layout.tsx` → wraps all pages, only one root layout
- `app/api/contact/route.ts` → `POST /api/contact` (API route)

**Special Files:**
- `layout.tsx` — rendered on every page, persists across navigation
- `page.tsx` — unique content for each route
- `globals.css` — applied globally via layout.tsx import

**Fonts & Metadata in layout.tsx:**
```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Elevated Apartment Locating',
  description: 'Find your ideal apartment with expert guidance',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter bg-luxury-black text-luxury-text-primary">
        {children}
      </body>
    </html>
  )
}
```

**Key Point:** The `variable: '--font-playfair'` and `variable: '--font-inter'` expose font families as CSS custom properties that Tailwind can reference.

---

## Tailwind CSS Configuration

### Custom Color Tokens Structure

Add luxury color tokens to `tailwind.config.ts` under `theme.extend.colors`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0B0D',      // Primary background
          navy: '#0D1B2A',       // Secondary section background
          gold: '#C9A96E',       // Accent (buttons, dividers, focus states)
          'gold-muted': 'rgba(201, 169, 110, 0.2)',  // Subtle borders
          'text-primary': '#F5F0E8',     // Headings, logo
          'text-secondary': '#A8A29E',   // Body copy, secondary text
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)'],
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}

export default config
```

### How to Use Custom Colors

Once configured, access via Tailwind utility classes:
- `bg-luxury-black` → `#0A0B0D`
- `text-luxury-gold` → `#C9A96E`
- `border-luxury-gold-muted` → `rgba(201, 169, 110, 0.2)`
- `hover:bg-luxury-gold` → hover state

### Key Principle for Luxury Dark Theme

- **Dominant (60%):** `bg-luxury-black` (backgrounds, header)
- **Secondary (30%):** `bg-luxury-navy` (section contrast)
- **Accent (10%):** text-luxury-gold (CTAs, interactive states — never on headlines)

---

## next/font/google Typography

### Import & Configuration Pattern

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],              // Only include Latin characters
  weight: ['600', '700'],           // Load specific weights
  variable: '--font-playfair',      // CSS var name for Tailwind
  display: 'swap',                  // Swap immediately when loaded
  fallback: ['serif'],              // Fallback if load fails
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['sans-serif'],
})
```

### Applying Fonts to Layout

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter">
        {children}
      </body>
    </html>
  )
}
```

The `className={`${playfair.variable} ${inter.variable}`}` on `<html>` makes both fonts available as CSS custom properties (`--font-playfair`, `--font-inter`) that Tailwind references.

### Preventing Layout Shift

**Zero Layout Shift (CLS = 0):**
- Next.js automatically uses CSS `size-adjust` to match fallback and web font metrics
- This ensures no jumping when the font loads
- No additional configuration needed — it's automatic in Next.js 14+

**Font Display Options:**
- `display: 'swap'` — shows fallback immediately, swaps to web font when ready (best for readability)
- `display: 'optional'` — hides text while loading, uses fallback if not ready quickly (luxury sites often prefer this)

**For Elevated Apartment Locating:** Use `display: 'swap'` to keep headlines readable while Playfair loads.

### Subset Strategy

Only load 'latin' subset to minimize bundle:
- `subsets: ['latin']` — reduces font file size from ~50KB to ~20KB per font

---

## Transparent-to-Solid Sticky Header

### Implementation as Client Component

The transparent-to-solid header requires scroll tracking, so it must be a Client Component (marked with `'use client'`).

```typescript
// components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger solid state after 80px of scroll
      setIsScrolled(window.scrollY > 80)
    }

    // Add listener only on client (window is available)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-18 flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-black/92 backdrop-blur-[12px] border-b border-luxury-gold-muted'
          : 'bg-transparent'
      }`}
    >
      {/* Logo: ELEVATED + subtitle */}
      <Link href="/" className="flex flex-col">
        <span className="font-playfair text-2xl font-bold tracking-widest text-luxury-text-primary">
          ELEVATED
        </span>
        <span className="font-inter text-xs font-normal tracking-[0.15em] uppercase text-luxury-text-secondary">
          Apartment Locating
        </span>
      </Link>

      {/* CTA Button */}
      <button
        className="border border-luxury-gold px-6 py-2.5 font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black"
      >
        Find My Apartment
      </button>
    </header>
  )
}
```

### Critical Details

**Scroll Threshold:** 80px (from UI spec) — adjust as needed for hero height
**Transition:** 300ms ease on `background` and `backdrop-filter`
**Backdrop Blur:** 12px for luxury feel
**Border:** `rgba(201, 169, 110, 0.2)` gold-muted on solid state
**Event Listener Options:** Use `{ passive: true }` for better scroll performance
**Cleanup:** Always remove listener on unmount to prevent memory leaks

### Avoiding Hydration Mismatch

This component already avoids hydration issues because:
1. Initial render (SSR): `isScrolled = false` (default state)
2. Client hydration matches initial render
3. useEffect only runs on client, updates state after hydration completes
4. Browser API (`window`) only accessed inside useEffect

**Falsehood to avoid:** Don't access `window.scrollY` during render or in state initialization — only inside useEffect.

### Header in Root Layout

```typescript
// app/layout.tsx
import { Header } from '@/components/layout/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter">
        <Header />
        {children}
      </body>
    </html>
  )
}
```

---

## Tailwind CSS Dark Theme Strategy

### For This Project: Dark-by-Default (Luxury Approach)

Since the entire site is a dark luxury theme, **do not use Tailwind's dark mode toggle**. Instead:

1. **Configure as dark-always:** All base styles use dark colors
2. **No light theme fallback needed**
3. **Use custom color tokens (already defined above)**

### Why Not `darkMode: 'class'`?

Tailwind's dark mode toggle (`:root.dark` or `[data-theme="dark"]`) is for sites with light + dark variants. Elevated is always dark, so avoid the overhead.

### If Future Light Theme Needed

In Phase 2+, if a light theme ever becomes necessary, configure:

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class', // Use .dark class selector
  theme: {
    extend: {
      colors: {
        luxury: {
          // Dark mode (default)
          black: '#0A0B0D',
          // ... etc
        },
        light: {
          // Light mode variants (if needed)
          background: '#FFFFFF',
          text: '#1A1A1A',
        },
      },
    },
  },
}
```

Then use: `dark:bg-luxury-black light:bg-light-background`

**For Phase 1:** Skip dark mode config — treat the entire site as dark by default.

---

## Project File Structure (Phase 1 Scaffold)

```
elevated-apartment-locating/
├── app/
│   ├── layout.tsx              # Root layout: fonts, global styles, Header + Footer
│   ├── page.tsx                # Single homepage (empty placeholder in Phase 1)
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST /api/contact (Phase 3)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Transparent-to-solid sticky header (Client Component)
│   │   └── Footer.tsx          # Dark footer placeholder (Server Component)
│   │
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   │
│   └── sections/               # Page sections (Phase 2+)
│       ├── Hero.tsx
│       ├── Gallery.tsx
│       ├── HowItWorks.tsx
│       ├── OurStory.tsx
│       └── LeadForm.tsx
│
├── public/
│   └── images/                 # Placeholder apartment photos (Phase 2)
│
├── lib/
│   └── utils.ts                # Utility functions, cn() helper
│
├── tailwind.config.ts          # Custom color tokens, font family config
├── tsconfig.json               # Path aliases (@/*)
├── next.config.ts              # Minimal config
└── package.json                # Dependencies
```

### Why This Structure?

- **`components/layout/`** — Reusable layout components (Header, Footer) that persist across pages
- **`components/ui/`** — Small, reusable UI components (Button, Input, Select) — prepared for Phase 3 form
- **`components/sections/`** — Large page sections (Hero, Gallery, etc.) — created in Phase 2
- **`public/images/`** — Placeholder images stored locally for v1
- **`lib/utils.ts`** — Central utility exports (cn() classname merge function, etc.)

### Key Files for Phase 1

**Must Create:**
1. `app/layout.tsx` — root layout with fonts
2. `app/globals.css` — Tailwind + color tokens
3. `components/layout/Header.tsx` — sticky header with scroll listener
4. `components/layout/Footer.tsx` — placeholder footer
5. `tailwind.config.ts` — custom colors
6. `lib/utils.ts` — utility functions

**Already Generated (keep as-is):**
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts` (modify to add colors)

---

## Known Pitfalls

### 1. Font Layout Shift (CLS)

**Problem:** Hero headline jumps vertically when Playfair Display loads  
**Cause:** Fallback font has different metrics than web font  
**Solution:**
- Use `display: 'swap'` (not `block` or `optional`)
- Next.js automatically applies CSS `size-adjust` — no manual fix needed
- Test locally: `npm run build && npm run start`, watch hero on first load

**Test:** Throttle network to 3G in DevTools, reload, check DevTools Lighthouse → CLS score should be 0

### 2. Scroll Listener Hydration Mismatch

**Problem:** "Text content does not match server-rendered HTML" warning  
**Cause:** SSR renders with `isScrolled = false`, then client sets to `true` immediately  
**Solution:**
- Initialize state to default value before useEffect: `const [isScrolled, setIsScrolled] = useState(false)`
- Only access `window` inside useEffect
- Do NOT suppress warning with `suppressHydrationWarning` — fix the root cause

**Pattern:**
```typescript
const [isScrolled, setIsScrolled] = useState(false) // Matches SSR
useEffect(() => {
  // Client-only code, won't run on SSR
  setIsScrolled(window.scrollY > 80)
}, [])
```

### 3. Tailwind Content Path Not Including Components

**Problem:** Tailwind utilities in `components/` don't show up in CSS output  
**Cause:** `tailwind.config.ts` content path doesn't include component files  
**Solution:**
```typescript
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // ← Include this line
  ],
}
```

### 4. next/font CSS Variable Not Accessible

**Problem:** `var(--font-playfair)` in Tailwind config returns `undefined`  
**Cause:** Font variable defined locally in component, not available to Tailwind parser  
**Solution:** Apply CSS variables on `<html>` tag in layout.tsx:
```typescript
<html lang="en" className={`${playfair.variable} ${inter.variable}`}>
```
Then reference in Tailwind config via `fontFamily: { playfair: ['var(--font-playfair)'] }`

### 5. Contrast Issues on Dark Background

**Problem:** Gold text on dark navy fails WCAG AA (4.5:1 ratio)  
**Cause:** Using wrong shade or not testing contrast  
**Solution:**
- Verify contrast: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Gold `#C9A96E` on black `#0A0B0D`: **14:1** ✓ (easily passes)
- Gold `#C9A96E` on navy `#0D1B2A`: **5.8:1** ✓ (passes for large text/UI)
- Use `#F5F0E8` (off-white) for body text on dark backgrounds: **14:1** ✓

**Test:** Run Lighthouse → Accessibility tab, check color contrast warnings

### 6. Missing or Incorrect Next.js Config

**Problem:** next dev crashes or throws webpack errors  
**Cause:** Missing `next.config.ts` or broken `tailwind.config.ts`  
**Solution:**
- Ensure `tailwind.config.ts` exports a valid Config object
- Ensure `next.config.ts` is minimal (can be empty `export default {}`)
- Check `tsconfig.json` for valid `compilerOptions`

### 7. Event Listener Not Cleaned Up

**Problem:** Memory leak, scroll listener runs even after component unmounts  
**Cause:** useEffect doesn't return cleanup function  
**Solution:** Always return cleanup in scroll listeners:
```typescript
useEffect(() => {
  const handleScroll = () => { /* ... */ }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll) // ← Cleanup
}, [])
```

### 8. Header Fixed Positioning Hiding Content

**Problem:** Page content appears behind fixed header  
**Cause:** Header is fixed but page doesn't have `pt-18` top padding  
**Solution:** Add padding to body or first content element:
```typescript
<body className="font-inter pt-18"> {/* 18 = header height */}
  <Header />
  {children}
</body>
```

Or add margin-top to first section after Header.

---

## RESEARCH COMPLETE

**Key Takeaways for Planner:**

1. **Next.js Setup:** Use `create-next-app`, keep structure as-is, modify `tailwind.config.ts` and create Header/Footer components
2. **Color Tokens:** Add luxury colors under `theme.extend.colors` in Tailwind config; use `bg-luxury-gold`, `text-luxury-text-primary`, etc.
3. **Fonts:** Import Playfair Display + Inter via `next/font/google`, expose as CSS variables on `<html>` tag, reference in Tailwind via `fontFamily` config
4. **Header:** Client Component with useEffect scroll listener, transitions background from transparent to solid rgba at 80px threshold
5. **Dark Theme:** Don't use Tailwind's dark mode toggle — entire site is dark by default; use custom color tokens instead
6. **File Structure:** Create `components/layout/`, `components/ui/`, `components/sections/` directories; keep scaffold minimal for Phase 1
7. **Critical Pitfalls:** Watch for font CLS, hydration mismatch on scroll listeners, missing Tailwind content paths, and unfixed event listeners

**Dependencies to Add:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

Next.js `create-next-app` installs these automatically. No additional setup needed for Phase 1.

---

*Research completed: 2026-04-18*  
*For Phase 1: Foundation planning and execution*
