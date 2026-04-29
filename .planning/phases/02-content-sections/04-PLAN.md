---
plan: 04
title: How It Works + Our Story + Footer content
wave: 2
depends_on: [01]
autonomous: true
requirements_addressed: [CONT-03, CONT-04, CONT-05]
files_modified:
  - components/sections/HowItWorks.tsx
  - components/sections/OurStory.tsx
  - components/layout/Footer.tsx
---

# Plan 04: How It Works + Our Story + Footer content

## Objective

Create the remaining static content components for Phase 2:

- `components/sections/HowItWorks.tsx` — a 3-numbered-step section on a black background that explains the locating process (satisfies **CONT-03**).
- `components/sections/OurStory.tsx` — a two-column (heading + body) section on a navy background that introduces Alan and the service value proposition (satisfies **CONT-04**).
- `components/layout/Footer.tsx` — replaces the Phase 1 single-centered-placeholder with the final three-element layout: business name | email mailto | copyright year (satisfies **CONT-05**).

All three are Server Components. They can be built in parallel with Plan 03 (Gallery) because they share no files. Depends on Plan 01 only for the `components/sections/` directory existence.

## Tasks

<task id="T04-01">
<title>Create components/sections/HowItWorks.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
</read_first>
<action>
Create `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/HowItWorks.tsx` as a Server Component with the exact content below.

Architecture:
- Section: `bg-luxury-black py-16 lg:py-24` (matches the dominant 60% color; alternates with the navy Gallery above it)
- Heading centered at top, `mb-16` separation before the grid
- 3 steps in a `grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8` layout (stacked on mobile, horizontal on desktop)
- Each step has: big gold Playfair step number ("01"/"02"/"03"), optional thin gold divider, step title, step body
- Steps are centered on mobile (`text-center`) and left-aligned on desktop (`lg:text-left`)

```tsx
type Step = {
  number: string
  title: string
  body: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    body: 'Fill out a quick form with your budget, size, and timeline.',
  },
  {
    number: '02',
    title: 'Alan Does the Search',
    body: 'We tap into our Denver network to find apartments that actually fit.',
  },
  {
    number: '03',
    title: 'Move Into Your Perfect Place',
    body: 'Get matched, tour, and sign — we guide you the whole way.',
  },
]

export function HowItWorks() {
  return (
    <section
      aria-label="How it works"
      className="bg-luxury-black py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center lg:text-left">
              <span
                aria-hidden="true"
                className="block font-playfair text-6xl lg:text-7xl font-bold text-luxury-gold leading-none mb-4"
              >
                {step.number}
              </span>
              <div className="w-12 h-px bg-luxury-gold mx-auto lg:mx-0 mb-4" />
              <h3 className="font-playfair text-xl lg:text-2xl font-semibold text-luxury-text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-base text-luxury-text-secondary leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

Key decisions:
- **Server Component** — pure static render
- **Typed `Step[]` array** — ensures every step has all three fields; drives the grid via `.map()`
- **`key={step.number}`** — "01"/"02"/"03" are unique and stable
- **Step number is `<span aria-hidden="true">`** — decorative; screen readers read the step title (h3) as the primary label
- **Thin gold divider `<div className="w-12 h-px bg-luxury-gold mx-auto lg:mx-0 mb-4" />`** — centered on mobile, left-aligned on desktop (matches `text-center lg:text-left` on the parent)
- **Step number sizing:** `text-6xl lg:text-7xl` (matches 48px mobile / ~72px desktop from UI-SPEC; Tailwind's `text-6xl` is 60px, `text-7xl` is 72px — acceptable within the display-scale range)
- **Step title:** `<h3>` `text-xl lg:text-2xl font-semibold` — matches UI-SPEC (20/24px)
- **Step body:** `text-base` (16px) with `leading-relaxed` (lh 1.625) — matches UI-SPEC body spec
- **Copy is verbatim from UI-SPEC** — no rephrasing; reassuring tone preserved
- **`—`** (em dash) in step 3 body is a literal Unicode character; renders correctly in Next.js UTF-8 files
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/HowItWorks.tsx` exists
- `components/sections/HowItWorks.tsx` does NOT contain `'use client'`
- `components/sections/HowItWorks.tsx` contains `export function HowItWorks`
- `components/sections/HowItWorks.tsx` contains the literal string `How It Works`
- `components/sections/HowItWorks.tsx` contains the literal string `Tell Us What You Need`
- `components/sections/HowItWorks.tsx` contains the literal string `Alan Does the Search`
- `components/sections/HowItWorks.tsx` contains the literal string `Move Into Your Perfect Place`
- `components/sections/HowItWorks.tsx` contains the literal strings `'01'`, `'02'`, `'03'`
- `components/sections/HowItWorks.tsx` contains `bg-luxury-black`
- `components/sections/HowItWorks.tsx` contains `py-16 lg:py-24`
- `components/sections/HowItWorks.tsx` contains `grid grid-cols-1 lg:grid-cols-3`
- `components/sections/HowItWorks.tsx` contains `text-luxury-gold`
- `components/sections/HowItWorks.tsx` contains `text-luxury-text-primary`
- `components/sections/HowItWorks.tsx` contains `text-luxury-text-secondary`
- `components/sections/HowItWorks.tsx` contains `font-playfair`
- `components/sections/HowItWorks.tsx` contains `font-inter`
- `components/sections/HowItWorks.tsx` contains `aria-hidden="true"`
- `components/sections/HowItWorks.tsx` contains `max-w-7xl`
- `components/sections/HowItWorks.tsx` contains `aria-label="How it works"`
- Running `grep -c "title:" components/sections/HowItWorks.tsx` returns exactly 3
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T04-02">
<title>Create components/sections/OurStory.tsx</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/tailwind.config.ts
</read_first>
<action>
Create `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/OurStory.tsx` as a Server Component with the exact content below.

Architecture:
- Section: `bg-luxury-navy py-16 lg:py-24` (alternates with the black HowItWorks above)
- Inner container: `max-w-7xl mx-auto px-6 lg:px-12`
- Two-column desktop: `grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start` (stacked on mobile)
- Left column: `<h2>` heading + thin gold accent bar
- Right column: 4 paragraphs describing Alan's 5-year experience, personal service, free-to-renter model, and closing CTA
- Final paragraph uses `text-luxury-text-primary` for emphasis (UI-SPEC calls this out as optional implementer discretion; we apply it)

```tsx
export function OurStory() {
  return (
    <section
      aria-label="Our story"
      className="bg-luxury-navy py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-luxury-gold mt-6" aria-hidden="true" />
          </div>

          <div className="space-y-5">
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              For over five years, Alan has been helping Denver renters find apartments they
              actually love — not just what&apos;s left over.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              Unlike listing sites that show you every available unit and leave you to figure it
              out, Alan works with you personally. He knows Denver&apos;s neighborhoods — Capitol
              Hill, LoHi, RiNo, Cherry Creek — and which buildings fit which lifestyles.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              And the best part: this service is completely free to renters. Alan earns a
              referral fee from the property — you pay nothing extra.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-primary leading-relaxed">
              If you&apos;re ready to stop scrolling and start living somewhere great, we&apos;re
              here to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

Key decisions:
- **Server Component** — pure static text render
- **Two-column desktop grid** with `items-start` so the heading column doesn't stretch to match the body column height
- **Gold accent bar** `<div className="w-16 h-0.5 bg-luxury-gold mt-6" aria-hidden="true" />` — decorative, below the heading, distinct from the thin horizontal dividers used in HowItWorks (`w-12 h-px` there)
- **`space-y-5`** on the body column — matches UI-SPEC (checker noted `space-y-4` would be tighter token alignment but marked `space-y-5` as non-blocking; we keep `space-y-5` as specified)
- **Final paragraph emphasis** uses `text-luxury-text-primary` instead of `text-luxury-text-secondary` — the UI-SPEC explicitly permits this "at implementer's discretion"
- **Copy verbatim from UI-SPEC §"Our Story Body Copy (full text)"** — no rephrasing
- **`&apos;`** for apostrophes in "what's", "Denver's", "you're", "we're" — JSX safe
- **Em dashes `—`** are literal Unicode characters; Next.js UTF-8 files render them natively
- **No photo / avatar** — intentional per Phase 2 CONTEXT §D-17 ("avoids awkward stock photo of Alan")
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/OurStory.tsx` exists
- `components/sections/OurStory.tsx` does NOT contain `'use client'`
- `components/sections/OurStory.tsx` contains `export function OurStory`
- `components/sections/OurStory.tsx` contains the literal string `Our Story`
- `components/sections/OurStory.tsx` contains the literal string `five years`
- `components/sections/OurStory.tsx` contains the literal string `Capitol Hill, LoHi, RiNo, Cherry Creek`
- `components/sections/OurStory.tsx` contains the literal string `completely free to renters`
- `components/sections/OurStory.tsx` contains the literal string `referral fee`
- `components/sections/OurStory.tsx` contains `bg-luxury-navy`
- `components/sections/OurStory.tsx` contains `py-16 lg:py-24`
- `components/sections/OurStory.tsx` contains `grid grid-cols-1 lg:grid-cols-2`
- `components/sections/OurStory.tsx` contains `gap-12 lg:gap-16`
- `components/sections/OurStory.tsx` contains `items-start`
- `components/sections/OurStory.tsx` contains `bg-luxury-gold`
- `components/sections/OurStory.tsx` contains `font-playfair`
- `components/sections/OurStory.tsx` contains `font-inter`
- `components/sections/OurStory.tsx` contains `space-y-5`
- `components/sections/OurStory.tsx` contains `max-w-7xl`
- `components/sections/OurStory.tsx` contains `aria-label="Our story"`
- Running `grep -c "<p " components/sections/OurStory.tsx` returns a value of at least 4
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T04-03">
<title>Replace components/layout/Footer.tsx with real content</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-UI-SPEC.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/02-content-sections/02-CONTEXT.md
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/.planning/phases/01-foundation/01-UI-SPEC.md
</read_first>
<action>
Fully replace the contents of `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx` with the following. The Phase 1 placeholder had a single centered paragraph; the Phase 2 version uses a three-element `justify-between` layout: business name on the left, mailto link in the center, copyright on the right. On mobile (`flex-col`) these stack with `gap-4`.

Structural classes preserved from Phase 1: `bg-luxury-black border-t border-luxury-gold-muted py-8`. Key change: inner container switches from `justify-center` to `justify-between` and contains three elements instead of one.

```tsx
export function Footer() {
  return (
    <footer
      className="bg-luxury-black border-t border-luxury-gold-muted py-8"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-playfair text-sm font-semibold tracking-wide text-luxury-text-primary">
          Elevated Apartment Locating
        </span>

        <a
          href="mailto:alan@elevatedapartmentlocating.com"
          className="font-inter text-sm font-medium text-luxury-gold hover:text-luxury-text-primary transition-colors duration-200"
        >
          alan@elevatedapartmentlocating.com
        </a>

        <span className="font-inter text-xs text-luxury-text-secondary">
          &copy; {new Date().getFullYear()} Elevated Apartment Locating
        </span>
      </div>
    </footer>
  )
}
```

Key decisions:
- **Server Component** (no `'use client'`) — `new Date().getFullYear()` is valid server-side and resolves at render time. No client hydration needed for a static year.
- **`flex-col sm:flex-row`** — on mobile, three elements stack vertically; from `sm:` (640px) up, they sit horizontally with `justify-between`
- **`justify-between`** replaces Phase 1's `justify-center` — this is the key structural change
- **`gap-4`** ensures 16px separation regardless of direction (useful for the stacked mobile case)
- **`max-w-7xl`** (not `max-w-content`) — both resolve to 1280px; UI-SPEC uses `max-w-7xl` in the footer section
- **Business name** uses `font-playfair font-semibold tracking-wide` — signature brand treatment
- **Email link** is a full `<a href="mailto:...">` with the email address as visible text (self-labelling, accessible) — gold color swaps to primary text on hover
- **Copyright** uses `text-xs` (12px, smaller than the other elements) — de-emphasizes it relative to the brand and contact
- **`&copy;`** is the HTML entity — renders as © without import/encoding issues
- **`new Date().getFullYear()`** — the current year, evaluated server-side. For the duration of this build it returns `2026` (matches the project's current date), but in general it returns whatever year the server/build is running in
</action>
<acceptance_criteria>
- File `/Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx` exists
- `components/layout/Footer.tsx` does NOT contain `'use client'`
- `components/layout/Footer.tsx` contains `export function Footer`
- `components/layout/Footer.tsx` contains `bg-luxury-black`
- `components/layout/Footer.tsx` contains `border-t border-luxury-gold-muted`
- `components/layout/Footer.tsx` contains `py-8`
- `components/layout/Footer.tsx` contains `aria-label="Site footer"`
- `components/layout/Footer.tsx` contains `Elevated Apartment Locating` (at least twice — in name span and in copyright)
- `components/layout/Footer.tsx` contains `mailto:alan@elevatedapartmentlocating.com`
- `components/layout/Footer.tsx` contains the literal email address `alan@elevatedapartmentlocating.com` as visible text
- `components/layout/Footer.tsx` contains `new Date().getFullYear()`
- `components/layout/Footer.tsx` contains `flex-col sm:flex-row`
- `components/layout/Footer.tsx` contains `justify-between`
- `components/layout/Footer.tsx` does NOT contain `justify-center` (Phase 1 layout fully replaced)
- `components/layout/Footer.tsx` contains `text-luxury-gold`
- `components/layout/Footer.tsx` contains `hover:text-luxury-text-primary`
- `components/layout/Footer.tsx` contains `transition-colors`
- `components/layout/Footer.tsx` contains `font-playfair`
- `components/layout/Footer.tsx` contains `font-inter`
- `components/layout/Footer.tsx` contains `max-w-7xl`
- Running `npx tsc --noEmit` from project root exits with code 0
</acceptance_criteria>
</task>

<task id="T04-04">
<title>TypeScript verification for HowItWorks, OurStory, and Footer</title>
<read_first>
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/HowItWorks.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/sections/OurStory.tsx
- /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating/components/layout/Footer.tsx
</read_first>
<action>
Run the TypeScript compiler from the project root to confirm all three files compile cleanly. Footer is already imported by `app/layout.tsx` (wired in Phase 1), so `tsc` transitively checks Footer. HowItWorks and OurStory are not yet imported (that happens in Plan 05), so `tsc` only checks them in isolation.

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating
npx tsc --noEmit
```

Must exit with code 0.
</action>
<acceptance_criteria>
- `npx tsc --noEmit` exits with code 0
- `components/sections/HowItWorks.tsx` exists
- `components/sections/OurStory.tsx` exists
- `components/layout/Footer.tsx` exists
</acceptance_criteria>
</task>

## Verification

```bash
cd /Users/BlairDalziel/Documents/Claude/elevated-apartment-locating

# 1. All three files exist and are Server Components
for f in components/sections/HowItWorks.tsx components/sections/OurStory.tsx components/layout/Footer.tsx; do
  [ -f "$f" ] && echo "OK: $f exists"
  ! grep -q "'use client'" "$f" && echo "OK: $f is Server Component"
done

# 2. HowItWorks contract
grep -q "How It Works" components/sections/HowItWorks.tsx
grep -q "Tell Us What You Need" components/sections/HowItWorks.tsx
grep -q "Alan Does the Search" components/sections/HowItWorks.tsx
grep -q "Move Into Your Perfect Place" components/sections/HowItWorks.tsx
grep -q "bg-luxury-black" components/sections/HowItWorks.tsx
grep -q "grid grid-cols-1 lg:grid-cols-3" components/sections/HowItWorks.tsx

# 3. OurStory contract
grep -q "Our Story" components/sections/OurStory.tsx
grep -q "five years" components/sections/OurStory.tsx
grep -q "Capitol Hill, LoHi, RiNo, Cherry Creek" components/sections/OurStory.tsx
grep -q "completely free to renters" components/sections/OurStory.tsx
grep -q "bg-luxury-navy" components/sections/OurStory.tsx
grep -q "grid grid-cols-1 lg:grid-cols-2" components/sections/OurStory.tsx

# 4. Footer contract
grep -q "mailto:alan@elevatedapartmentlocating.com" components/layout/Footer.tsx
grep -q "new Date().getFullYear()" components/layout/Footer.tsx
grep -q "justify-between" components/layout/Footer.tsx
! grep -q "justify-center" components/layout/Footer.tsx && echo "OK: Phase 1 placeholder layout replaced"

# 5. TypeScript clean
npx tsc --noEmit
```

## Must Haves
- [ ] `components/sections/HowItWorks.tsx` exists as Server Component with `bg-luxury-black`, 3 steps, `grid grid-cols-1 lg:grid-cols-3`, step numbers in gold Playfair
- [ ] HowItWorks contains verbatim step titles: "Tell Us What You Need", "Alan Does the Search", "Move Into Your Perfect Place"
- [ ] `components/sections/OurStory.tsx` exists as Server Component with `bg-luxury-navy`, two-column `grid grid-cols-1 lg:grid-cols-2`, gold accent bar, at least 4 paragraphs
- [ ] OurStory body mentions "five years", neighborhood list, free-to-renter model
- [ ] `components/layout/Footer.tsx` uses `justify-between` (NOT `justify-center`) with three elements: business name, `mailto:alan@elevatedapartmentlocating.com` link in gold, `© {year} Elevated Apartment Locating` copyright
- [ ] Footer preserves `bg-luxury-black border-t border-luxury-gold-muted py-8` structural classes
- [ ] Footer email link uses `hover:text-luxury-text-primary transition-colors`
- [ ] All three files are Server Components (no `'use client'`)
- [ ] `npx tsc --noEmit` exits with code 0
