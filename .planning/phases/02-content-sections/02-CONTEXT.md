# Phase 2: Content Sections - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all five static content sections — Hero, Gallery, How It Works, Our Story, and Footer — as polished, on-brand React components mounted in `app/page.tsx`. All sections are static (no API calls). Phase 3 adds the lead capture form.

</domain>

<decisions>
## Implementation Decisions

### Hero Section (discussed with user)
- **D-01:** Full-bleed background photo — high-quality Unsplash apartment or Denver skyline image with a dark overlay (semi-opaque, ~60% dark) so text remains legible
- **D-02:** Headline: **"Find Your Perfect Denver Home"** — Playfair Display, grand/oversized (80px desktop, 48px mobile), off-white `#F5F0E8`
- **D-03:** Sub-headline: **"Denver's apartment locating expert — tell us what you need, and we'll find it."** — Inter, 18px desktop / 16px mobile, `#A8A29E`
- **D-04:** CTA button: "Find My Apartment" — gold outlined (from Phase 1 spec), scrolls to `#lead-form` anchor
- **D-05:** Hero section is full-viewport height (`min-h-screen`) so it fills the screen on load; content is vertically centered
- **D-06:** Header overlays the hero (no padding-top on hero) — transparent header is designed for this layout

### Photo Gallery Section (Claude's call)
- **D-07:** 6 placeholder images from Unsplash — luxury apartment interiors (modern, neutral tones)
- **D-08:** 3-column grid on desktop (`lg:grid-cols-3`), 2-column on tablet (`sm:grid-cols-2`), 1-column on mobile
- **D-09:** All images rendered with `next/image` using a fixed aspect ratio (4:3) for consistent grid
- **D-10:** No lightbox, no captions for v1 — clean grid, images speak for themselves
- **D-11:** Section background: `#0D1B2A` (navy) for contrast against hero and How It Works

### How It Works Section (Claude's call)
- **D-12:** 3 numbered steps, horizontal layout on desktop, stacked on mobile
- **D-13:** Step numbers in gold (`#C9A96E`), large Playfair Display
- **D-14:** Steps:
  1. **"Tell Us What You Need"** — Fill out a quick form with your budget, size, and timeline
  2. **"Alan Does the Search"** — We tap into our Denver network to find apartments that actually fit
  3. **"Move Into Your Perfect Place"** — Get matched, tour, and sign — we guide you the whole way
- **D-15:** Section background: `#0A0B0D` (near-black)
- **D-16:** Section headline: "How It Works" in Playfair Display

### Our Story Section (Claude's call)
- **D-17:** Text-only for v1 — no photo placeholder (keeps it clean, avoids awkward stock photo of "Alan")
- **D-18:** Two-column layout on desktop: section heading left, body copy right; stacked on mobile
- **D-19:** Key copy points: Alan's 5 years of Denver experience, free service to renters, personal attention (not a database), knows Denver neighborhoods
- **D-20:** Section headline: "Our Story" in Playfair Display
- **D-21:** Section background: `#0D1B2A` (navy) — alternates with adjacent sections

### Footer (completing Phase 1 placeholder)
- **D-22:** Replace the Phase 1 placeholder with real content: business name, `alan@elevatedapartmentlocating.com`, © {year} Elevated Apartment Locating
- **D-23:** Email as a `mailto:` link in gold
- **D-24:** Simple single-row layout, centered text, `bg-luxury-black`

### Page Section Order
- **D-25:** Hero → Gallery → How It Works → Our Story → Footer
- **D-26:** Form anchor (`id="lead-form"`) placeholder div sits between Our Story and Footer — Phase 3 replaces it with the real form

### Claude's Discretion
- Exact Unsplash photo URLs (search for "luxury apartment interior" or "Denver skyline night")
- Divider/separator treatment between sections (thin gold line or none)
- Exact body copy length for Our Story
- Hover states on gallery images (subtle scale or none)
- Internal padding values within each section

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System (Phase 1 — established)
- `.planning/phases/01-foundation/01-CONTEXT.md` — Color tokens, typography scale, CTA button spec
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Full design contract: spacing, colors, component specs

### Project Requirements
- `.planning/REQUIREMENTS.md` — CONT-01 through CONT-05 define what each section must deliver
- `.planning/ROADMAP.md` §Phase 2 — Success criteria

No external specs — all content decisions captured above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/layout/Header.tsx` — Already built; floats over hero (transparent), no layout adjustments needed
- `components/layout/Footer.tsx` — Phase 1 placeholder; Phase 2 replaces with real content
- `lib/utils.ts` — `cn()` helper for conditional classnames
- `tailwind.config.ts` — All luxury color tokens and font families already configured

### Established Patterns
- Section backgrounds alternate: `bg-luxury-black` (#0A0B0D) and `bg-luxury-navy` (#0D1B2A)
- Gold accent (`text-luxury-gold`, `border-luxury-gold`) on interactive and structural elements only
- `font-playfair` for headings, `font-inter` for body and UI
- `next/image` is the required image component (configured in next.config.mjs)
- All new components go in `components/sections/` directory

### Integration Points
- `app/page.tsx` — Currently minimal placeholder; Phase 2 fills it with all section components
- `#lead-form` anchor — Phase 3 attaches the form here; Phase 2 adds a placeholder div with this id

</code_context>

<specifics>
## Specific Ideas

- Hero image: search Unsplash for "luxury apartment living room Denver" or "modern apartment interior dark" — dark/moody tones preferred so the overlay blends naturally
- "How It Works" steps should feel reassuring — renters are often anxious about apartment searching; the tone should be confident and supportive
- Our Story copy should feel personal, not corporate — Alan is a real person helping real people

</specifics>

<deferred>
## Deferred Ideas

- Real AMLI Denver photos for the gallery — swap in Phase 4 / post-launch
- Alan's headshot in the Our Story section — add when available
- Scroll animations (Framer Motion entrance effects) — V2 requirement (V2-04)
- Customer testimonials — V2 requirement (V2-01)

</deferred>

---

*Phase: 02-content-sections*
*Context gathered: 2026-04-19*
