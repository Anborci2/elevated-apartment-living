<!-- GSD:project-start source:PROJECT.md -->
## Project

**Elevated Apartment Locating**

A marketing and lead generation website for Elevated Apartment Locating, a Denver-based apartment locating service. Prospective renters browse the site, learn about the service, and submit a detailed inquiry form. Alan receives each submission by email and follows up personally to help clients find their ideal apartment.

**Core Value:** A prospective renter lands on the site, is impressed by the brand and Alan's expertise, and submits their housing needs — generating a qualified lead in Alan's inbox.

### Constraints

- **Tech stack**: Next.js + Tailwind CSS — chosen for modern DX and easy deployment
- **Email delivery**: Form submissions must reliably reach alan@elevatedapartmentlocating.com
- **Photos**: Placeholder images for v1 — must be high-quality and apartment-appropriate
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Framework
## Email Delivery
- Simplest API for Next.js: `await resend.emails.send({...})`
- Free tier: 3,000 emails/month — more than enough
- Excellent deliverability, modern dashboard
- Native Next.js integration docs
- **NOT**: Nodemailer (requires SMTP server config, deliverability headaches), SendGrid (overly complex for this use case), Formspree (adds third-party dependency, less control)
## Form Handling
- react-hook-form: minimal re-renders, built-in validation UX
- zod: schema validation shared between client and API route
- **NOT**: Formik (verbose, heavier), plain useState (hard to manage validation state)
## Styling
- shadcn/ui: copy-paste components, fully customizable, works great with dark luxury themes
- For a dark luxury look: custom CSS variables for gold (#C9A96E or similar), deep navy (#0A0F1E), black (#050709)
- **NOT**: MUI or Chakra (too opinionated, hard to customize for luxury aesthetics)
## Images
- Automatic WebP conversion, lazy loading, responsive srcsets
- Store placeholder images in `/public/images/` for v1
- **NOT**: Plain `<img>` tags (no optimization), Cloudinary (overkill for v1 with placeholder images)
## Animations (optional)
- Only if it enhances feel; skip if it adds complexity
## Deployment
- Set `RESEND_API_KEY` in Vercel environment variables
- Edge network handles global CDN automatically
- Free hobby tier is sufficient for a lead gen site
## Confidence Levels
- Next.js App Router: HIGH — industry standard 2025
- Resend: HIGH — best DX + deliverability for small projects
- react-hook-form + zod: HIGH — de facto standard
- shadcn/ui: MEDIUM — optional, adds setup but saves time on components
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
