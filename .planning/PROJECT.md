# Elevated Apartment Locating

## What This Is

A marketing and lead generation website for Elevated Apartment Locating, a Denver-based apartment locating service. Prospective renters browse the site, learn about the service, and submit a detailed inquiry form. Alan receives each submission by email and follows up personally to help clients find their ideal apartment.

## Core Value

A prospective renter lands on the site, is impressed by the brand and Alan's expertise, and submits their housing needs — generating a qualified lead in Alan's inbox.

## Requirements

### Validated

- [x] **FOUND-01**: Next.js 14 App Router project scaffolded — Validated in Phase 1: Foundation
- [x] **FOUND-02**: Luxury dark color palette configured (navy #0D1B2A, black #0A0B0D, gold #C9A96E) — Validated in Phase 1: Foundation
- [x] **FOUND-03**: Typography set with Playfair Display + Inter via next/font/google — Validated in Phase 1: Foundation
- [x] **FOUND-04**: Responsive Header + Footer layout shell in place — Validated in Phase 1: Foundation

### Validated

- [x] **CONT-01**: Hero section with "Find Your Perfect Denver Home" headline and #lead-form CTA — Validated in Phase 2: Content Sections
- [x] **CONT-02**: Photo gallery with 6 Unsplash placeholder apartment images via next/image — Validated in Phase 2: Content Sections
- [x] **CONT-03**: "How It Works" 3-step section with gold numbered steps — Validated in Phase 2: Content Sections
- [x] **CONT-04**: "Our Story" section about Alan's 5 years of Denver experience — Validated in Phase 2: Content Sections
- [x] **CONT-05**: Footer with business name, alan@elevatedapartmentlocating.com, copyright — Validated in Phase 2: Content Sections

### Active

- [ ] Lead capture form emailed to alan@elevatedapartmentlocating.com
- [ ] Form collects: first name, last name, email, phone, income/credit range, bedroom preference, lease term, location preference

### Out of Scope

- User accounts or authentication — not needed for a lead gen site
- Backend database/admin dashboard — email delivery is sufficient for v1
- Real-time availability or apartment listings — this is a locator service, not a listing platform
- Payment processing — service is free to the renter

## Context

- Business owner: Alan
- Contact email: alan@elevatedapartmentlocating.com
- 5 years of Denver housing search experience
- Target market: People looking to rent apartments in Denver (downtown or metro-wide)
- Brand aesthetic: Luxury/dark — deep navy, black, gold tones
- Tech stack: Next.js + Tailwind CSS
- Photos: Placeholder apartment imagery for v1, swap for real AMLI Denver photos later

## Constraints

- **Tech stack**: Next.js + Tailwind CSS — chosen for modern DX and easy deployment
- **Email delivery**: Form submissions must reliably reach alan@elevatedapartmentlocating.com
- **Photos**: Placeholder images for v1 — must be high-quality and apartment-appropriate

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Email-only lead delivery (no DB) | Simplest v1 — Alan checks email, no dashboard to maintain | — Pending |
| Next.js + Tailwind | Modern stack, easy Vercel deployment, good for SEO | — Pending |
| Placeholder photos initially | Real AMLI photos require sourcing; don't block launch | — Pending |

---
## Current State

Phase 2 complete — All five static content sections built and wired: Hero (full-bleed Unsplash bg + dark overlay), Gallery (6 images, responsive grid), How It Works (3 numbered steps), Our Story (Alan's copy), Footer (real content). Build verified clean. Ready for Phase 3: Lead Form + Email.

---
*Last updated: 2026-04-19 — Phase 2: Content Sections complete*
