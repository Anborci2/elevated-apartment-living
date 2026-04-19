import Image from 'next/image'

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center bg-luxury-black"
    >
      {/* Layer 1: Background image */}
      <div className="absolute inset-0">
        <Image
          fill
          priority
          quality={90}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
          alt=""
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-luxury-black/60" aria-hidden="true" />

      {/* Layer 3: Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-display-mobile lg:text-display font-bold text-luxury-text-primary tracking-tight leading-tight">
          Find Your Perfect Denver Home
        </h1>
        <p className="mt-4 font-inter text-base lg:text-lg text-luxury-text-secondary max-w-2xl mx-auto leading-relaxed">
          Denver&apos;s apartment locating expert — tell us what you need, and we&apos;ll find it.
        </p>
        <a href="#lead-form" className="inline-block mt-8">
          <span className="inline-block border border-luxury-gold text-luxury-gold bg-transparent px-8 py-3 font-inter text-sm font-semibold tracking-widest uppercase rounded-none transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2">
            Find My Apartment
          </span>
        </a>
      </div>
    </section>
  )
}
