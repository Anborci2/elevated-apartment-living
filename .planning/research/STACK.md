# Stack Research: Elevated Apartment Locating

## Framework
**Next.js 14+ (App Router)** — Already decided. Use App Router (not Pages Router) for new projects in 2025. Better performance, server components reduce JS bundle.

## Email Delivery
**Resend** (recommended) — `resend@3.x`
- Simplest API for Next.js: `await resend.emails.send({...})`
- Free tier: 3,000 emails/month — more than enough
- Excellent deliverability, modern dashboard
- Native Next.js integration docs
- **NOT**: Nodemailer (requires SMTP server config, deliverability headaches), SendGrid (overly complex for this use case), Formspree (adds third-party dependency, less control)

## Form Handling
**react-hook-form** `^7.x` + **zod** `^3.x`
- react-hook-form: minimal re-renders, built-in validation UX
- zod: schema validation shared between client and API route
- **NOT**: Formik (verbose, heavier), plain useState (hard to manage validation state)

## Styling
**Tailwind CSS v3** (already decided) + **shadcn/ui** (optional, selective)
- shadcn/ui: copy-paste components, fully customizable, works great with dark luxury themes
- For a dark luxury look: custom CSS variables for gold (#C9A96E or similar), deep navy (#0A0F1E), black (#050709)
- **NOT**: MUI or Chakra (too opinionated, hard to customize for luxury aesthetics)

## Images
**next/image** (built-in) — Always use this for apartment photos
- Automatic WebP conversion, lazy loading, responsive srcsets
- Store placeholder images in `/public/images/` for v1
- **NOT**: Plain `<img>` tags (no optimization), Cloudinary (overkill for v1 with placeholder images)

## Animations (optional)
**Framer Motion** `^11.x` — For subtle entrance animations on scroll (common in luxury sites)
- Only if it enhances feel; skip if it adds complexity

## Deployment
**Vercel** — Zero-config for Next.js
- Set `RESEND_API_KEY` in Vercel environment variables
- Edge network handles global CDN automatically
- Free hobby tier is sufficient for a lead gen site

## Confidence Levels
- Next.js App Router: HIGH — industry standard 2025
- Resend: HIGH — best DX + deliverability for small projects
- react-hook-form + zod: HIGH — de facto standard
- shadcn/ui: MEDIUM — optional, adds setup but saves time on components
