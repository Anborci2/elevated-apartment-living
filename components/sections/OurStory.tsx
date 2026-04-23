import Image from 'next/image'
import { getOurStory } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

const FALLBACK = {
  paragraph1: "For over five years, we've been helping Denver renters find apartments they actually love — not just what's left over.",
  paragraph2: "Unlike listing sites that show you every available unit and leave you to figure it out, we work with you personally. We know Denver's neighborhoods — Capitol Hill, LoHi, RiNo, Cherry Creek — and which buildings fit which lifestyles.",
  paragraph3: "And the best part: this service is completely free to renters. We earn a referral fee from the property — you pay nothing extra.",
  paragraph4: "If you're ready to stop scrolling and start living somewhere great, we're here to help.",
}

export async function OurStory() {
  const data = await getOurStory().catch(() => null)
  const story = data ?? FALLBACK

  const headshotUrl = data?.headshot
    ? urlFor(data.headshot).width(600).height(700).fit('crop').url()
    : null

  return (
    <section
      className="bg-luxury-navy py-16 lg:py-24"
      aria-label="Our Story"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: heading + optional headshot */}
          <div>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-luxury-gold mt-6" aria-hidden="true" />

            {headshotUrl && (
              <div className="mt-8 relative w-full max-w-sm aspect-[3/4] overflow-hidden">
                <Image
                  src={headshotUrl}
                  alt="Alan — Elevated Apartment Locating"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Right column: body copy */}
          <div className="space-y-5">
            {story.paragraph1 && (
              <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
                {story.paragraph1}
              </p>
            )}
            {story.paragraph2 && (
              <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
                {story.paragraph2}
              </p>
            )}
            {story.paragraph3 && (
              <p className="font-inter text-base lg:text-lg text-luxury-text-primary leading-relaxed">
                {story.paragraph3}
              </p>
            )}
            {story.paragraph4 && (
              <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
                {story.paragraph4}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
