import Link from 'next/link'

const neighborhoods = [
  {
    name: 'LoDo',
    description: 'Historic district with loft-style living, walkable dining, and transit access.',
  },
  {
    name: 'LoHi',
    description: 'Trendy Highland neighborhood with rooftop bars, boutiques, and city views.',
  },
  {
    name: 'RiNo',
    description: 'Arts district energy with modern apartments, breweries, and creative community.',
  },
  {
    name: 'Cherry Creek',
    description: 'Upscale shopping, quiet streets, and polished high-rise and mid-rise options.',
  },
  {
    name: 'Capitol Hill',
    description: 'Eclectic, affordable, and walkable — ideal for those who want character.',
  },
  {
    name: 'Washington Park',
    description: 'Tree-lined streets, outdoor lifestyle, and a relaxed neighborhood feel.',
  },
]

export function AreasWeServe() {
  return (
    <section className="bg-luxury-black py-16 lg:py-24" aria-label="Areas We Serve">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
            Areas We Serve
          </h2>
          <p className="font-inter text-base lg:text-lg text-luxury-text-secondary mt-4 max-w-2xl mx-auto">
            We know Denver&apos;s neighborhoods inside and out — from the best buildings to the
            ones worth skipping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-luxury-gold-muted">
          {neighborhoods.map((n) => (
            <div
              key={n.name}
              className="bg-luxury-black px-8 py-8 flex flex-col gap-3"
            >
              <h3 className="font-playfair text-xl font-semibold text-luxury-gold">
                {n.name}
              </h3>
              <p className="font-inter text-sm text-luxury-text-secondary leading-relaxed">
                {n.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/neighborhoods"
            className="font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold border border-luxury-gold px-6 py-3 inline-block transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black"
          >
            Explore All Neighborhoods
          </Link>
        </div>
      </div>
    </section>
  )
}
