---
phase: 1
slug: foundation
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-18
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for frontend phases.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (custom Tailwind) |
| Preset | not applicable |
| Component library | none — custom components |
| Icon library | lucide-react |
| Font | Playfair Display + Inter (next/font/google) |

---

## Spacing Scale

Declared values (multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing |
| lg | 24px | Section padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level spacing |
| 4xl | 96px | Hero vertical padding |

Exceptions: none

---

## Typography

### Font Families
- **Display / Headlines:** Playfair Display — serif, loaded via `next/font/google`, CSS var `--font-playfair`
- **Body / UI:** Inter — sans-serif, loaded via `next/font/google`, CSS var `--font-inter`

### Type Scale

| Role | Font | Size (desktop) | Size (mobile) | Weight | Line Height | Tracking |
|------|------|---------------|---------------|--------|-------------|---------|
| Hero Display | Playfair Display | 80px (5rem) | 48px (3rem) | 700 | 1.1 | tracking-tight |
| Section Heading (h2) | Playfair Display | 48px (3rem) | 32px (2rem) | 700 | 1.2 | tracking-tight |
| Sub-heading (h3) | Playfair Display | 32px (2rem) | 24px (1.5rem) | 600 | 1.3 | normal |
| Brand Mark "ELEVATED" | Playfair Display | 28px | 22px | 700 | 1.0 | tracking-widest (0.2em) |
| Brand Subtitle | Inter | 11px | 10px | 400 | 1.0 | tracking-[0.15em] uppercase |
| Body | Inter | 18px | 16px | 400 | 1.7 | normal |
| Nav / UI label | Inter | 14px | 14px | 500 | 1.0 | tracking-wide |
| Button text | Inter | 14px | 14px | 600 | 1.0 | tracking-widest uppercase |
| Caption | Inter | 13px | 12px | 400 | 1.5 | normal |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#0A0B0D` | Primary background, header solid state |
| Secondary (30%) | `#0D1B2A` | Section contrast background (deep navy) |
| Accent (10%) | `#C9A96E` | CTA buttons, horizontal dividers, hover/focus states |
| Text Primary | `#F5F0E8` | Headings, logo mark |
| Text Secondary | `#A8A29E` | Body copy, captions, secondary labels |
| Overlay | `rgba(10, 11, 13, 0.85)` | Header solid state with backdrop-blur |
| Transparent | `rgba(0, 0, 0, 0)` | Header initial state over hero |
| Border | `rgba(201, 169, 110, 0.2)` | Subtle gold-tinted dividers |
| Destructive | `#EF4444` | Form validation errors |

Accent reserved for: CTA buttons ("Find My Apartment"), `<hr>` dividers, button hover borders, focus rings. Never used on headline text.

### Tailwind Color Tokens (tailwind.config.ts)
```
luxury: {
  black: '#0A0B0D',
  navy: '#0D1B2A',
  gold: '#C9A96E',
  'gold-muted': 'rgba(201, 169, 110, 0.2)',
  'text-primary': '#F5F0E8',
  'text-secondary': '#A8A29E',
}
```

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA button | "Find My Apartment" |
| Logo primary mark | "ELEVATED" |
| Logo subtitle | "Apartment Locating" |
| Header CTA | "Find My Apartment" |
| Footer placeholder | "© {year} Elevated Apartment Locating" |
| Footer contact | "alan@elevatedapartmentlocating.com" |

---

## Component Contracts

### Header
- **Initial state:** `position: fixed`, `background: transparent`, `z-index: 50`
- **Scrolled state (>80px):** `background: rgba(10, 11, 13, 0.92)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid rgba(201, 169, 110, 0.15)`
- **Transition:** `transition: background 300ms ease, backdrop-filter 300ms ease`
- **Height:** 72px desktop, 64px mobile
- **Layout:** `flex justify-between items-center px-6 lg:px-12`
- **Logo (left):** "ELEVATED" in Playfair Display 700 + "Apartment Locating" below in Inter 400 small-caps
- **CTA button (right):** gold border button → solid gold on hover
- **Scroll trigger:** `window.scrollY > 80`

### CTA Button (gold)
- **Default:** `border: 1px solid #C9A96E`, `color: #C9A96E`, `background: transparent`, `px-6 py-2.5`, `text-sm font-semibold tracking-widest uppercase`
- **Hover:** `background: #C9A96E`, `color: #0A0B0D`
- **Transition:** `transition: all 200ms ease`
- **Border radius:** `rounded-none` (sharp — luxury aesthetic)

### Footer Shell (Phase 1 placeholder)
- **Background:** `#0A0B0D`
- **Border top:** `1px solid rgba(201, 169, 110, 0.2)`
- **Content:** placeholder text only — real content in Phase 2
- **Height:** `py-8` minimum

---

## Responsive Breakpoints

Using Tailwind defaults:
| Breakpoint | Width | Notes |
|-----------|-------|-------|
| (default) | 0px+ | Mobile-first base |
| sm | 640px | — |
| md | 768px | — |
| lg | 1024px | Desktop layout switches |
| xl | 1280px | Max content width reference |

Max content width: `max-w-7xl mx-auto` (1280px)

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| next/font/google | Playfair Display, Inter | not required |
| lucide-react | icons (if any) | not required |

No shadcn or third-party component registries used in Phase 1.

---

## Accessibility

- All text must meet WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- `#F5F0E8` on `#0A0B0D`: ratio ~14:1 ✓
- `#C9A96E` on `#0A0B0D`: ratio ~5.8:1 ✓ (large text / UI elements)
- `#A8A29E` on `#0A0B0D`: ratio ~6.2:1 ✓
- Focus states: `outline: 2px solid #C9A96E`, `outline-offset: 2px`
- Header `<nav>` landmark, logo is `<a href="/">` with aria-label

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-04-18
