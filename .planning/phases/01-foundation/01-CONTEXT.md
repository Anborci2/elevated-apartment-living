# Phase 1: Foundation - Context

**Gathered:** 2026-04-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Next.js 14 App Router project, configure Tailwind CSS with luxury dark color tokens, establish the Playfair Display + Inter typography system, and build the responsive Header + Footer shell. This is the visual and technical foundation every subsequent phase builds on.

</domain>

<decisions>
## Implementation Decisions

### Typography
- **D-01:** Font pairing: Playfair Display (headlines/display) + Inter (body, UI, form elements)
- **D-02:** Both loaded via `next/font/google` for zero layout shift
- **D-03:** Hero headlines: grand/oversized — 72–96px on desktop, scales down on mobile
- **D-04:** Playfair Display used for: hero headline, section headings, the brand name mark
- **D-05:** Inter used for: body copy, nav links, form labels, button text, captions

### Color Palette
- **D-06:** Background: near-black primary (`#0A0B0D`), deep navy secondary (`#0D1B2A`) for section contrast
- **D-07:** Gold accent: warm champagne-gold (`#C9A96E`) — used on CTA buttons, horizontal rule dividers, and hover/focus states
- **D-08:** Text: off-white (`#F5F0E8`) for headings, light gray (`#A8A29E`) for body/secondary text
- **D-09:** Gold NOT used on headline text — reserved for interactive elements and structural accents

### Header / Navigation
- **D-10:** Transparent-to-solid header — starts fully transparent overlaying the hero image, transitions to solid dark (`#0A0B0D`) with slight backdrop blur as user scrolls down
- **D-11:** Sticky — fixed to top of viewport once solid
- **D-12:** Nav content: logo mark (left) + single CTA button "Find My Apartment" (right, gold)
- **D-13:** No section navigation links — single-page layout with one conversion action
- **D-14:** Mobile: hamburger menu collapses to just logo + CTA button stacked, or logo + CTA side by side at small breakpoints

### Logo / Brand Mark
- **D-15:** "ELEVATED" in Playfair Display as the primary mark (larger, tracking/uppercase)
- **D-16:** "Apartment Locating" as a subtitle — smaller Inter or small-caps Playfair, below or beside "ELEVATED"
- **D-17:** Text-only mark — no icon/symbol for v1

### Footer Shell (placeholder for Phase 2)
- **D-18:** Dark footer, same near-black background as header
- **D-19:** Footer content is placeholder in Phase 1 — real content (email, copyright) added in Phase 2

### Claude's Discretion
- Exact Tailwind config key names for color tokens
- Letter-spacing and font-weight choices within the Playfair/Inter pairing
- Tailwind breakpoints (use defaults: sm 640px, md 768px, lg 1024px, xl 1280px)
- Exact scroll distance that triggers the header transition
- Backdrop-blur amount on sticky header

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Requirements
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-04 define what this phase must deliver
- `.planning/ROADMAP.md` §Phase 1 — Success criteria and requirement mappings

### Design Reference
- `.planning/research/STACK.md` — Confirmed Next.js App Router + Tailwind stack, font approach
- `.planning/research/PITFALLS.md` — Dark theme contrast warnings (WCAG AA compliance critical here)

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, Phase 1 creates the foundation

### Established Patterns
- App Router: `app/layout.tsx` is the root — this is where fonts and global CSS are configured
- Tailwind: color tokens go in `tailwind.config.ts` under `theme.extend.colors`
- `next/font/google`: import fonts at the layout level, apply via CSS variables

### Integration Points
- `app/layout.tsx` — root layout wraps all pages, sets font variables, renders Header + Footer
- `app/globals.css` — Tailwind base directives, CSS custom properties for color tokens
- `app/page.tsx` — placeholder in Phase 1, filled with sections in Phase 2

</code_context>

<specifics>
## Specific Ideas

- Header transition: "cinematic" feel — transparent over hero, then smooth fade to solid on scroll
- "ELEVATED" should read as a strong, authoritative mark — consider wide letter-spacing (tracking-widest)
- Gold (#C9A96E) is warm, not harsh yellow — champagne/antique gold tone

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 1 foundation scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-18*
