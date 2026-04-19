# Research Summary: Elevated Apartment Locating

## Key Findings

**Stack:** Next.js 14 App Router + Tailwind CSS + Resend (email) + react-hook-form + zod. Deploy to Vercel. All straightforward — no exotic choices needed.

**Table Stakes:**
- Hero with strong CTA
- Lead capture form with all requested fields + validation
- About/story section (Alan's 5 years Denver experience + how the service works)
- Photo gallery (placeholder → real AMLI photos later)
- Mobile-first design — apartment hunters search on phone

**Recommended Additions:**
- Honeypot field for spam protection (zero friction)
- "How It Works" 3-step section (increases conversion significantly)
- Explicit form success/error states

**Watch Out For:**
1. Form submissions in spam — Resend handles this, but set reply-to correctly
2. Bot submissions — add honeypot field
3. Image performance — always use next/image with proper sizing
4. Dark theme contrast — gold on navy must pass WCAG AA
5. Mobile form — 16px min font, type="email"/type="tel" inputs

## Recommended Phase Structure
1. **Foundation** — Next.js scaffold, Tailwind config, color tokens, fonts, layout shell
2. **Content** — Hero, Gallery, How It Works, Our Story sections (static)
3. **Lead Form** — Form UI + API route + Resend email delivery
4. **Polish** — Animations, SEO meta, mobile QA, accessibility, deployment

## Stack Decisions
| Choice | Rationale |
|--------|-----------|
| Resend for email | Best DX, free tier sufficient, excellent deliverability |
| react-hook-form + zod | Industry standard, minimal bundle, great UX |
| App Router | Current Next.js standard, static by default |
| Vercel | Zero-config Next.js deployment |
