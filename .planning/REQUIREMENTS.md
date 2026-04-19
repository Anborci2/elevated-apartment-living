# Requirements: Elevated Apartment Locating

**Defined:** 2026-04-18
**Core Value:** A prospective renter visits, is impressed by Alan's brand and expertise, and submits their housing needs — generating a qualified lead in Alan's inbox.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Project is scaffolded with Next.js 14 App Router and Tailwind CSS
- [ ] **FOUND-02**: Luxury dark color palette is configured (deep navy, black, gold accent)
- [ ] **FOUND-03**: Typography is set with a premium font pairing
- [ ] **FOUND-04**: Responsive layout shell (Header + Footer) is in place

### Content Sections

- [ ] **CONT-01**: Hero section displays a compelling headline, sub-headline, and CTA button that scrolls to the form
- [ ] **CONT-02**: Photo gallery section displays 6+ high-quality placeholder apartment images
- [ ] **CONT-03**: "How It Works" section explains the 3-step locating process
- [ ] **CONT-04**: "Our Story" section introduces Alan with his 5-year Denver experience and service value prop
- [ ] **CONT-05**: Footer displays business name, email, and copyright

### Lead Form

- [ ] **FORM-01**: Form collects first name and last name
- [ ] **FORM-02**: Form collects email address (validated)
- [ ] **FORM-03**: Form collects phone number
- [ ] **FORM-04**: Form collects income range (dropdown: Under $3k/mo, $3k–$5k, $5k–$8k, $8k+)
- [ ] **FORM-05**: Form collects credit score range (dropdown: Below 600, 600–649, 650–699, 700–749, 750+)
- [ ] **FORM-06**: Form collects bedroom preference (1BR, 2BR, 3BR, Studio, Flexible)
- [ ] **FORM-07**: Form collects desired lease term (3 months, 6 months, 12 months, Month-to-month)
- [ ] **FORM-08**: Form collects location preference (Downtown Denver, Denver Metro, Flexible/Anywhere in Denver)
- [ ] **FORM-09**: Form validates all required fields before submission
- [ ] **FORM-10**: Form shows loading state while submitting
- [ ] **FORM-11**: Form shows success message after submission ("Thanks! Alan will be in touch within 24 hours.")
- [ ] **FORM-12**: Form shows error message if submission fails

### Email Delivery

- [ ] **EMAIL-01**: Form POST sends an email to alan@elevatedapartmentlocating.com via Resend
- [ ] **EMAIL-02**: Email subject clearly identifies it as a new lead
- [ ] **EMAIL-03**: Email body contains all submitted form fields in a readable format
- [ ] **EMAIL-04**: Email reply-to is set to the submitter's email address
- [ ] **EMAIL-05**: Honeypot field prevents basic bot submissions

### Deployment

- [ ] **DEPLOY-01**: Site deploys successfully to Vercel
- [ ] **DEPLOY-02**: SEO metadata (title, description, og:image) is set
- [ ] **DEPLOY-03**: Site is fully responsive on mobile (iPhone Safari tested)

## v2 Requirements

### Conversion Enhancements

- **V2-01**: Customer testimonials section (2–3 quotes from past clients)
- **V2-02**: FAQ section ("Is this service free?", "How long does it take?", etc.)
- **V2-03**: Real AMLI Denver apartment photos replace placeholders
- **V2-04**: Subtle scroll animations (Framer Motion entrance effects)

### SEO / Marketing

- **V2-05**: Google Search Console integration and sitemap.xml
- **V2-06**: Google Analytics or Plausible integration

## Out of Scope

| Feature | Reason |
|---------|--------|
| Apartment listings / search | Not a listings platform — Alan hand-curates |
| User accounts / login | No reason to authenticate visitors |
| Database for lead storage | Email delivery is sufficient for v1 |
| Admin dashboard | Out of scope — Alan manages via email |
| Map / neighborhood filters | Complexity without conversion value |
| Blog / content marketing | Scope creep; not core to lead gen |
| Live chat widget | Form is sufficient; avoids third-party script |
| Payment processing | Service is free to renters |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1: Foundation | Pending |
| FOUND-02 | Phase 1: Foundation | Pending |
| FOUND-03 | Phase 1: Foundation | Pending |
| FOUND-04 | Phase 1: Foundation | Pending |
| CONT-01 | Phase 2: Content Sections | Pending |
| CONT-02 | Phase 2: Content Sections | Pending |
| CONT-03 | Phase 2: Content Sections | Pending |
| CONT-04 | Phase 2: Content Sections | Pending |
| CONT-05 | Phase 2: Content Sections | Pending |
| FORM-01 | Phase 3: Lead Form + Email | Pending |
| FORM-02 | Phase 3: Lead Form + Email | Pending |
| FORM-03 | Phase 3: Lead Form + Email | Pending |
| FORM-04 | Phase 3: Lead Form + Email | Pending |
| FORM-05 | Phase 3: Lead Form + Email | Pending |
| FORM-06 | Phase 3: Lead Form + Email | Pending |
| FORM-07 | Phase 3: Lead Form + Email | Pending |
| FORM-08 | Phase 3: Lead Form + Email | Pending |
| FORM-09 | Phase 3: Lead Form + Email | Pending |
| FORM-10 | Phase 3: Lead Form + Email | Pending |
| FORM-11 | Phase 3: Lead Form + Email | Pending |
| FORM-12 | Phase 3: Lead Form + Email | Pending |
| EMAIL-01 | Phase 3: Lead Form + Email | Pending |
| EMAIL-02 | Phase 3: Lead Form + Email | Pending |
| EMAIL-03 | Phase 3: Lead Form + Email | Pending |
| EMAIL-04 | Phase 3: Lead Form + Email | Pending |
| EMAIL-05 | Phase 3: Lead Form + Email | Pending |
| DEPLOY-01 | Phase 4: Polish + Deploy | Pending |
| DEPLOY-02 | Phase 4: Polish + Deploy | Pending |
| DEPLOY-03 | Phase 4: Polish + Deploy | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓
- Roadmap file: [ROADMAP.md](./ROADMAP.md)

---
*Requirements defined: 2026-04-18*
*Last updated: 2026-04-18 — traceability confirmed against ROADMAP.md*
