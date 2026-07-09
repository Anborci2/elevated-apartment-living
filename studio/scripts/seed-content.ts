// -------------------------------------------------------
// One-time content seed for Alan's Sanity dataset.
//
// Copies the site's current hardcoded fallback content into
// Sanity so the Studio isn't blank and Alan's edits control
// what actually renders on the live site.
//
// Run from the studio/ folder (requires `npx sanity login` first):
//
//   npx sanity exec scripts/seed-content.ts --with-user-token
//
// Safe to run more than once: it uses createIfNotExists, so it
// NEVER overwrites content that already exists. Reviews are
// intentionally NOT seeded — those come from real Google
// reviews (or Alan adds them by hand in the Studio).
// -------------------------------------------------------

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  heroHeadline: 'Find Your Perfect Denver Home',
  heroSubheadline:
    "Denver's apartment locating expert — tell us what you need, and we'll find it.",
  contactEmail: 'alan@elevatedapartmentlocating.com',
  // heroImage and contactPhone left empty on purpose:
  // the site falls back to its built-in photo, and the footer
  // hides the phone line until Alan fills these in himself.
}

const ourStory = {
  _id: 'ourStory',
  _type: 'ourStory',
  paragraph1:
    "For over five years, we've been helping Denver renters find apartments they actually love — not just what's left over.",
  paragraph2:
    "Unlike listing sites that show you every available unit and leave you to figure it out, we work with you personally. We know Denver's neighborhoods — Capitol Hill, LoHi, RiNo, Cherry Creek — and which buildings fit which lifestyles.",
  paragraph3:
    'And the best part: this service is completely free to renters. We earn a referral fee from the property — you pay nothing extra.',
  paragraph4:
    "If you're ready to stop scrolling and start living somewhere great, we're here to help.",
  // headshot left empty on purpose — Alan uploads his own photo.
}

const faqs = [
  {
    question: 'Is this service really free?',
    answer:
      'Yes — completely free to you. We earn a referral fee from the property when you sign a lease. You pay nothing extra, and your rent is the same whether you use us or find the apartment on your own.',
  },
  {
    question: 'How is this different from searching on Zillow or Apartments.com?',
    answer:
      "Listing sites show you everything available — which means sorting through hundreds of options, outdated listings, and buildings that don't fit your needs. We do that work for you. We know Denver's inventory personally and send you only apartments that actually match your budget, timeline, and preferences.",
  },
  {
    question: 'What areas of Denver do you cover?',
    answer:
      "We cover Denver proper and the surrounding metro area, including LoDo, LoHi, RiNo, Cherry Creek, Capitol Hill, Washington Park, Highlands, Five Points, Congress Park, and more. Not sure if your target neighborhood is covered? Just ask — chances are we know it.",
  },
  {
    question: 'How long does the process take?',
    answer:
      "It depends on your timeline and how specific your needs are. Most clients find a place within one to three weeks of submitting their preferences. If you have a tight move-in date, let us know and we'll prioritize accordingly.",
  },
  {
    question: 'What information do I need to provide?',
    answer:
      'The more detail the better — budget, preferred neighborhoods, number of bedrooms, lease start date, pet situation, and any must-haves or dealbreakers. Our intake form covers all of this. The clearer your picture, the better we can match you.',
  },
  {
    question: 'Do I have to tour every apartment you send me?',
    answer:
      'Not at all. We send you a curated shortlist and you tell us which ones interest you. We then coordinate tours for only the ones you want to see — no pressure, no wasted time.',
  },
  {
    question: "What if I don't find anything I like?",
    answer:
      "We keep looking. There's no obligation and no deadline on our end. If the right apartment isn't available yet, we'll stay in contact and reach out when something comes up that fits.",
  },
  {
    question: 'Can you help with luxury or high-end apartments?',
    answer:
      "Yes. We work across all price points, including luxury buildings and full-service high-rises. If anything, high-end inventory is where a locator adds the most value — concessions, move-in specials, and preferred units aren't always advertised publicly.",
  },
  {
    question: 'Do you work with furnished or short-term rentals?',
    answer:
      "Primarily we focus on traditional unfurnished leases of 12 months or longer. If you're looking for furnished or short-term options, let us know and we'll do our best to point you in the right direction.",
  },
  {
    question: 'How do I get started?',
    answer:
      "Fill out our short intake form — it takes about two minutes. We'll review your preferences and follow up personally within 24 hours.",
  },
].map((faq, i) => ({
  _id: `faq-seed-${i + 1}`,
  _type: 'faq',
  order: (i + 1) * 10, // gaps of 10 so Alan can slot new ones between
  ...faq,
}))

async function seed() {
  let tx = client.transaction()
  tx = tx.createIfNotExists(siteSettings)
  tx = tx.createIfNotExists(ourStory)
  for (const faq of faqs) tx = tx.createIfNotExists(faq)

  await tx.commit()

  const count = await client.fetch('count(*[])')
  console.log(`Seed complete. Dataset now has ${count} documents.`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
