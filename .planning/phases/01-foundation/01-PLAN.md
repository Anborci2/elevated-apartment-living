---
plan: 01
title: Project Scaffold + Tailwind Color Tokens
wave: 1
depends_on: []
autonomous: true
requirements_addressed: [FOUND-01, FOUND-02]
files_modified:
  - package.json
  - tailwind.config.ts
  - tsconfig.json
  - app/globals.css
  - app/page.tsx
  - lib/utils.ts
  - next.config.ts
---

# Plan 01: Project Scaffold + Tailwind Color Tokens

## Objective

Bootstrap the Next.js 14 App Router project using `create-next-app`, clean the generated boilerplate, and configure Tailwind CSS with the luxury dark color tokens (`luxury.black`, `luxury.navy`, `luxury.gold`, `luxury.gold-muted`, `luxury.text-primary`, `luxury.text-secondary`). Also add path aliases and a `cn()` utility to `lib/utils.ts`. This plan establishes the technical base that every subsequent plan and phase depends on.

## Tasks

<task id="T01-01">
<title>Scaffold the Next.js 14 App Router project</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-RESEARCH.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/CLAUDE.md
</read_first>
<action>
Run the following command from the project root `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/`:

```bash
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --use-npm
```

When prompted for confirmation to install in a non-empty directory (only CLAUDE.md present), confirm yes.

Expected output: scaffold creates `app/`, `public/`, `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `package.json`.

After scaffolding, install `clsx` and `tailwind-merge` (needed for `cn()` utility in lib/utils.ts):

```bash
npm install clsx tailwind-merge
```
</action>
<acceptance_criteria>
- File `app/layout.tsx` exists
- File `app/page.tsx` exists
- File `tailwind.config.ts` exists
- File `tsconfig.json` exists
- File `package.json` contains `"next"` in dependencies
- `node_modules/` directory exists
- Running `npm run build` (or `next build`) exits with code 0
</acceptance_criteria>
</task>

<task id="T01-02">
<title>Clean generated boilerplate content</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/page.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/app/globals.css
</read_first>
<action>
**1. Replace `app/page.tsx`** with a minimal placeholder (no default Next.js content):

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-luxury-black" />
  )
}
```

**2. Replace `app/globals.css`** with only Tailwind directives and a base body reset:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0A0B0D;
    color: #F5F0E8;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

**3. Delete boilerplate SVG assets** (if generated):
```bash
rm -f public/next.svg public/vercel.svg
```

Do NOT delete `public/` directory itself.
</action>
<acceptance_criteria>
- `app/page.tsx` does NOT contain the string `"Get started by editing"`
- `app/page.tsx` does NOT contain the string `"className={styles"` or import from `"./page.module.css"`
- `app/globals.css` contains exactly `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;`
- `app/globals.css` contains `scroll-behavior: smooth`
- `public/next.svg` does NOT exist (or was never generated)
</acceptance_criteria>
</task>

<task id="T01-03">
<title>Configure Tailwind with luxury color tokens and font families</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
</read_first>
<action>
Replace the full contents of `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0B0D',
          navy: '#0D1B2A',
          gold: '#C9A96E',
          'gold-muted': 'rgba(201, 169, 110, 0.2)',
          'text-primary': '#F5F0E8',
          'text-secondary': '#A8A29E',
          destructive: '#EF4444',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-mobile': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      height: {
        header: '72px',
        'header-mobile': '64px',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
```
</action>
<acceptance_criteria>
- `tailwind.config.ts` contains `luxury: {`
- `tailwind.config.ts` contains `black: '#0A0B0D'`
- `tailwind.config.ts` contains `navy: '#0D1B2A'`
- `tailwind.config.ts` contains `gold: '#C9A96E'`
- `tailwind.config.ts` contains `'text-primary': '#F5F0E8'`
- `tailwind.config.ts` contains `'text-secondary': '#A8A29E'`
- `tailwind.config.ts` content array contains `'./components/**/*.{js,ts,jsx,tsx,mdx}'`
- `tailwind.config.ts` contains `fontFamily:`
- `tailwind.config.ts` contains `playfair: ['var(--font-playfair)'`
- `tailwind.config.ts` contains `inter: ['var(--font-inter)'`
</acceptance_criteria>
</task>

<task id="T01-04">
<title>Verify tsconfig.json path alias and create lib/utils.ts</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tsconfig.json
</read_first>
<action>
**1. Verify `tsconfig.json`** contains the `@/*` path alias under `compilerOptions.paths`. The scaffold should have already created this. Confirm the following is present (do not overwrite if correct — only fix if missing):

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**2. Create `lib/utils.ts`** (create the `lib/` directory if it doesn't already exist):

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts via tailwind-merge.
 * Usage: cn('px-4', condition && 'py-2', 'px-6') → 'py-2 px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
</action>
<acceptance_criteria>
- `tsconfig.json` contains `"@/*"` in the paths section
- File `lib/utils.ts` exists
- `lib/utils.ts` contains `export function cn(`
- `lib/utils.ts` contains `twMerge(clsx(inputs))`
- Running `npx tsc --noEmit` exits with code 0 (no TypeScript errors)
</acceptance_criteria>
</task>

## Verification

```bash
# From project root:

# 1. Confirm scaffold is in place
ls app/layout.tsx app/page.tsx app/globals.css tailwind.config.ts tsconfig.json lib/utils.ts

# 2. Confirm luxury color tokens are in Tailwind config
grep -c "luxury" tailwind.config.ts

# 3. Confirm content paths include components/
grep "components" tailwind.config.ts

# 4. Confirm cn() utility is present
grep "export function cn" lib/utils.ts

# 5. Confirm TypeScript has no errors
npx tsc --noEmit

# 6. Confirm dev server starts
npm run dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Expected: 200
kill %1
```

## Must Haves
- [ ] `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `tsconfig.json` all exist
- [ ] `tailwind.config.ts` contains all 6 luxury color tokens with exact hex values: `#0A0B0D`, `#0D1B2A`, `#C9A96E`, `rgba(201, 169, 110, 0.2)`, `#F5F0E8`, `#A8A29E`
- [ ] `tailwind.config.ts` `content` array includes `./components/**/*.{js,ts,jsx,tsx,mdx}`
- [ ] `lib/utils.ts` exports `cn()` using `clsx` + `tailwind-merge`
- [ ] `tsconfig.json` contains `"@/*"` path alias
- [ ] `app/page.tsx` is clean (no default Next.js boilerplate content)
- [ ] `npm run dev` starts without errors
