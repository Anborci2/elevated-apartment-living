# Pitfalls: Next.js Marketing Site with Email Form

## 1. Form Submissions Landing in Spam
**Warning signs:** Alan reports not receiving test submissions; Gmail shows them in spam
**Prevention:**
- Use Resend (handles SPF/DKIM automatically for their sending domain)
- Set reply-to as the submitter's email so Alan can reply directly
- Use a clear email subject: "New Lead from Elevated Apartment Locating"
- Don't use words like "FREE", excessive caps in email subject
**Phase:** Form/API phase

## 2. Bot/Spam Form Submissions
**Warning signs:** Nonsense data in submissions, rapid-fire duplicates
**Prevention:**
- Add honeypot field (hidden input bots fill, humans don't) — simplest approach
- Rate limit the `/api/contact` route (Vercel Edge Config or simple in-memory check)
- Consider Cloudflare Turnstile (invisible, no friction) if bots become a problem
- **NOT** reCAPTCHA v2 — friction kills conversion on a luxury lead gen site
**Phase:** Form/API phase

## 3. Unoptimized Images Killing Performance
**Warning signs:** Lighthouse score < 70, slow mobile load
**Prevention:**
- Always use `next/image` with explicit `width` and `height`
- Keep placeholder images under 500KB each before Next.js optimization
- Use `priority` prop on hero image (above fold)
- Use `loading="lazy"` on gallery images (below fold, Next.js default)
**Phase:** Static content phase

## 4. Dark Theme Accessibility (Contrast)
**Warning signs:** Text hard to read, fails WCAG AA in Chrome DevTools
**Prevention:**
- Gold on dark navy must meet 4.5:1 contrast ratio for normal text
- Use `oklch` or check contrast with https://webaim.org/resources/contrastchecker/
- Don't use dark gray text on dark backgrounds in form fields
- Test with macOS Accessibility Inspector
**Phase:** Polish phase

## 5. Form Has No Loading/Error State
**Warning signs:** User clicks Submit, nothing visually changes, they click again → duplicate emails
**Prevention:**
- Disable submit button while request is in-flight
- Show spinner or "Sending..." text
- Show explicit success message ("Thanks! Alan will be in touch within 24 hours")
- Show explicit error message ("Something went wrong. Please try again or email alan@...")
**Phase:** Form/API phase

## 6. Missing SEO Basics
**Warning signs:** Site doesn't appear in Google for "Denver apartment locator"
**Prevention:**
- Set `metadata` in `app/layout.tsx`: title, description, og:image
- Use semantic HTML (h1 for hero headline, h2 for sections)
- Add `robots.txt` and basic sitemap
- Google Search Console verification (v2)
**Phase:** Polish phase

## 7. Mobile Form Unusability
**Warning signs:** Inputs too small to tap, form extends off screen on iPhone
**Prevention:**
- Input font-size must be 16px minimum (prevents iOS auto-zoom)
- Test on real iPhone Safari (not just Chrome DevTools)
- Use `type="email"` and `type="tel"` to trigger correct keyboard types
- Stack form fields vertically on mobile (no two-column form on small screens)
**Phase:** Form UI phase
