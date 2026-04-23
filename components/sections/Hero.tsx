import Image from 'next/image'
import { ContactButton } from '@/components/ui/ContactButton'
import { getSiteSettings } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80'
const FALLBACK_HEADLINE = 'Find Your Perfect Denver Home'
const FALLBACK_SUBHEADLINE = "Denver's apartment locating expert — tell us what you need, and we'll find it."

export async function Hero() {
  const settings = await getSiteSettings().catch(() => null)

  const headline = settings?.heroHeadline ?? FALLBACK_HEADLINE
  const subheadline = settings?.heroSubheadline ?? FALLBACK_SUBHEADLINE
  const bgSrc = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).quality(90).url()
    : FALLBACK_IMAGE

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center bg-luxury-black"
    >
      <div className="absolute inset-0">
        <Image
          fill
          priority
          quality={90}
          src={bgSrc}
          alt=""
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-luxury-black/60" aria-hidden="true" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-display-mobile lg:text-display font-bold text-luxury-text-primary tracking-tight leading-tight">
          {headline}
        </h1>
        <p className="mt-4 font-inter text-base lg:text-lg text-luxury-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
        <div className="mt-8">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
