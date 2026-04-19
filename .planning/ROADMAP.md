# Roadmap: Elevated Apartment Locating

**Milestone 1:** Launch v1 website
**Phases:** 4
**Requirements:** 28 mapped

## Phase 1: Foundation
**Goal:** Establish the Next.js project scaffold, Tailwind configuration, color tokens, typography, and responsive layout shell so all subsequent phases build on a consistent, styled base.
**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04
**UI hint:** yes

### Success Criteria
1. `next dev` starts without errors and renders a styled shell at localhost:3000
2. Tailwind config contains deep-navy, black, and gold color tokens accessible via utility classes
3. A premium font pairing (e.g. Playfair Display + Inter) loads from next/font with no layout shift
4. Header and footer are visible and stack correctly on both mobile (375px) and desktop (1280px)

## Phase 2: Content Sections
**Goal:** Build all five static content sections — Hero, Gallery, How It Works, Our Story, and Footer — as polished, on-brand React components.
**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**UI hint:** yes

### Success Criteria
1. Hero section displays headline, sub-headline, and a CTA button that smoothly scrolls to the form anchor
2. Gallery section renders at least 6 placeholder apartment images using next/image with no layout shift
3. How It Works section shows a clearly readable 3-step process with icons or numbered steps
4. Our Story section introduces Alan with his 5-year Denver experience and service value prop
5. Footer displays business name, alan@elevatedapartmentlocating.com, and current-year copyright

## Phase 3: Lead Form + Email
**Goal:** Implement the fully validated lead capture form with API route, Resend email delivery, honeypot spam protection, and all required UX states.
**Requirements:** FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, FORM-08, FORM-09, FORM-10, FORM-11, FORM-12, EMAIL-01, EMAIL-02, EMAIL-03, EMAIL-04, EMAIL-05
**UI hint:** yes

### Success Criteria
1. Submitting the form with all valid fields delivers an email to alan@elevatedapartmentlocating.com with all field values in a readable format and reply-to set to the submitter's email
2. Attempting to submit with missing or invalid fields shows inline validation errors without sending a request
3. The submit button displays a loading state while the API call is in flight
4. A successful submission replaces the form with the message "Thanks! Alan will be in touch within 24 hours."
5. A failed submission (network error or API error) shows an error message without losing the user's entered data
6. Submitting with the honeypot field populated returns a 200 silently without sending any email

## Phase 4: Polish + Deploy
**Goal:** Add SEO metadata, verify full mobile responsiveness, and deploy the production site to Vercel.
**Requirements:** DEPLOY-01, DEPLOY-02, DEPLOY-03
**UI hint:** no

### Success Criteria
1. Site deploys successfully to a Vercel production URL with zero build errors
2. Page title, meta description, and og:image are present and correct when inspected in browser DevTools or a social preview tool
3. All sections and the lead form are fully usable on an iPhone Safari viewport (375px) with 16px minimum input font size and no horizontal scroll

---
*Roadmap created: 2026-04-18*
