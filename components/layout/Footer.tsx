export function Footer() {
  return (
    <footer
      className="bg-luxury-black border-t border-luxury-gold-muted"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-playfair text-luxury-text-primary font-semibold text-sm tracking-wide">
          Elevated Apartment Locating
        </span>
        <a
          href="mailto:alan@elevatedapartmentlocating.com"
          className="font-inter text-sm font-medium text-luxury-gold hover:text-luxury-text-primary transition-colors duration-200"
        >
          alan@elevatedapartmentlocating.com
        </a>
        <span className="font-inter text-xs text-luxury-text-secondary">
          &copy; {new Date().getFullYear()} Elevated Apartment Locating
        </span>
      </div>
    </footer>
  )
}
