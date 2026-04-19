# Architecture Research: Next.js Lead Gen Site

## Router Choice
**App Router** — Use for all new Next.js projects (2025 standard)
- Single page (`app/page.tsx`) with multiple sections as components
- API route at `app/api/contact/route.ts` for form submission
- Everything else is static (SSG by default in App Router)

## Page Structure
```
app/
  layout.tsx          # Root layout: fonts, metadata, global styles
  page.tsx            # Single page — renders all sections in order
  api/
    contact/
      route.ts        # POST handler: validates body, sends email via Resend
components/
  sections/
    Hero.tsx
    Gallery.tsx
    HowItWorks.tsx
    OurStory.tsx
    LeadForm.tsx
  ui/
    Button.tsx
    Input.tsx
    Select.tsx
  layout/
    Header.tsx
    Footer.tsx
public/
  images/             # Placeholder apartment photos
```

## Data Flow: Form Submission
```
User fills form (LeadForm.tsx)
  → react-hook-form validates client-side (zod schema)
  → POST /api/contact with JSON body
  → route.ts validates body server-side (same zod schema)
  → Resend sends email to alan@elevatedapartmentlocating.com
  → 200 OK → success state shown to user
  → 4xx/5xx → error message shown, user can retry
```

## Static vs Dynamic
- All sections except the form: **static** (SSG, cached at build time)
- `/api/contact` route: **dynamic** (server-side, runs per request)
- No ISR or SSR needed — content doesn't change frequently

## Environment Variables
```env
RESEND_API_KEY=re_xxxx           # Resend API key
CONTACT_EMAIL=alan@elevatedapartmentlocating.com
```
Set in Vercel dashboard → Settings → Environment Variables

## Build Order (phase dependencies)
1. Project scaffolding (Next.js init, Tailwind config, fonts, color tokens)
2. Layout + static sections (Header, Hero, Gallery, HowItWorks, OurStory, Footer)
3. Lead form + API route (form UI, validation, email delivery)
4. Polish (animations, responsiveness, SEO meta)
