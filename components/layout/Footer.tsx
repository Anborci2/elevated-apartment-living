import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries'

const FALLBACK_EMAIL = 'alan@elevatedapartmentlocating.com'

export async function Footer() {
  const settings = await getSiteSettings().catch(() => null)
  const email = settings?.contactEmail ?? FALLBACK_EMAIL
  const phone = settings?.contactPhone ?? null

  return (
    <footer
      className="bg-luxury-black border-t border-luxury-gold-muted"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="font-playfair text-luxury-text-primary font-semibold text-sm tracking-wide">
          Elevated Apartment Locating
        </span>

        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link
            href="/neighborhoods"
            className="font-inter text-xs tracking-wide text-luxury-text-secondary hover:text-luxury-gold transition-colors duration-200"
          >
            Neighborhoods
          </Link>
          <Link
            href="/faq"
            className="font-inter text-xs tracking-wide text-luxury-text-secondary hover:text-luxury-gold transition-colors duration-200"
          >
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="font-inter text-xs tracking-wide text-luxury-text-secondary hover:text-luxury-gold transition-colors duration-200"
          >
            Privacy
          </Link>
        </nav>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, '')}`}
              className="font-inter text-sm font-medium text-luxury-gold hover:text-luxury-text-primary transition-colors duration-200"
            >
              {phone}
            </a>
          )}
          <a
            href={`mailto:${email}`}
            className="font-inter text-sm font-medium text-luxury-gold hover:text-luxury-text-primary transition-colors duration-200"
          >
            {email}
          </a>
          <span className="font-inter text-xs text-luxury-text-secondary">
            &copy; {new Date().getFullYear()} Elevated Apartment Locating
          </span>
        </div>
      </div>
    </footer>
  )
}
