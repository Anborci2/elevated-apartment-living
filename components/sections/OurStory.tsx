export function OurStory() {
  return (
    <section
      className="bg-luxury-navy py-16 lg:py-24"
      aria-label="Our Story"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column: heading */}
          <div>
            <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-luxury-gold mt-6" aria-hidden="true" />
          </div>

          {/* Right column: body copy */}
          <div className="space-y-5">
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              For over five years, Alan has been helping Denver renters find apartments they
              actually love — not just what&apos;s left over.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              Unlike listing sites that show you every available unit and leave you to figure it
              out, Alan works with you personally. He knows Denver&apos;s neighborhoods — Capitol
              Hill, LoHi, RiNo, Cherry Creek — and which buildings fit which lifestyles.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-primary leading-relaxed">
              And the best part: this service is completely free to renters. Alan earns a referral
              fee from the property — you pay nothing extra.
            </p>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
              If you&apos;re ready to stop scrolling and start living somewhere great, we&apos;re
              here to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
