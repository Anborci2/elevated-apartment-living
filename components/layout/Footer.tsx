export function Footer() {
  return (
    <footer
      className="bg-luxury-black border-t border-luxury-gold-muted py-8"
      aria-label="Site footer"
    >
      <div className="max-w-content mx-auto px-6 lg:px-12 flex items-center justify-center">
        <p className="font-inter text-sm text-luxury-text-secondary tracking-wide">
          {/* Placeholder — real content added in Phase 2 */}
          &copy; {new Date().getFullYear()} Elevated Apartment Locating
        </p>
      </div>
    </footer>
  )
}
