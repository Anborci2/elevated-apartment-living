import type { Metadata } from 'next'
import { ContactButton } from '@/components/ui/ContactButton'
import { getFaqs } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'FAQ | Elevated Apartment Locating',
  description:
    'Answers to common questions about our free Denver apartment locating service.',
}

// FAQs pull from Sanity — refresh hourly
export const revalidate = 3600

const FALLBACK_FAQS = [
  {
    question: 'Is this service really free?',
    answer:
      "Yes — completely free to you. We earn a referral fee from the property when you sign a lease. You pay nothing extra, and your rent is the same whether you use us or find the apartment on your own.",
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
      "The more detail the better — budget, preferred neighborhoods, number of bedrooms, lease start date, pet situation, and any must-haves or dealbreakers. Our intake form covers all of this. The clearer your picture, the better we can match you.",
  },
  {
    question: 'Do I have to tour every apartment you send me?',
    answer:
      "Not at all. We send you a curated shortlist and you tell us which ones interest you. We then coordinate tours for only the ones you want to see — no pressure, no wasted time.",
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
]

export default async function FAQPage() {
  const data = await getFaqs().catch(() => null)
  const faqs = data && data.length > 0 ? data : FALLBACK_FAQS

  return (
    <div className="relative min-h-screen">

      {/* Fixed background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80)',
        }}
        aria-hidden="true"
      />
      {/* Subtle dark tint */}
      <div className="fixed inset-0 -z-10 bg-luxury-black/40" aria-hidden="true" />

      <main className="pt-24 lg:pt-32">

        {/* Page header — transparent, background shows through */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-luxury-text-primary tracking-tight">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-0.5 bg-luxury-gold mt-6 mb-8" aria-hidden="true" />
          <p className="font-inter text-base lg:text-xl text-luxury-text-secondary max-w-2xl leading-relaxed">
            Everything you need to know about how our free apartment locating service works.
          </p>
        </section>

        {/* FAQ rows — frosted glass panels */}
        <section className="border-t border-white/10">
          {faqs.map((faq: { _id?: string; question: string; answer: string }, i: number) => (
            <div
              key={i}
              className="border-b border-white/10 backdrop-blur-md bg-luxury-black/60"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-16">
                <h2 className="font-playfair text-lg lg:text-xl font-semibold text-luxury-text-primary leading-snug">
                  {faq.question}
                </h2>
                <p className="lg:col-span-2 font-inter text-base text-luxury-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="backdrop-blur-md bg-luxury-navy/80 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-luxury-text-primary mb-4">
              Still have questions?
            </h2>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary mb-8 max-w-xl mx-auto">
              Fill out our short form and we&apos;ll get back to you within 24 hours.
            </p>
            <ContactButton />
          </div>
        </section>

      </main>
    </div>
  )
}
