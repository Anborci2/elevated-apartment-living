'use client'

type Review = { _id: string; quote: string; authorName: string }

export function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  const doubled = [...reviews, ...reviews]

  return (
    <section className="bg-luxury-black py-12 overflow-hidden" aria-label="Client reviews">
      <div
        className="flex gap-6 w-max"
        style={{ animation: 'marquee 40s linear infinite' }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {doubled.map((r, i) => (
          <div
            key={`${r._id}-${i}`}
            className="flex-shrink-0 w-80 border border-luxury-gold-muted px-8 py-6 transition-transform duration-300 hover:scale-110 cursor-default"
          >
            <span className="block font-playfair text-3xl text-luxury-gold leading-none mb-3" aria-hidden="true">&ldquo;</span>
            <p className="font-inter text-sm text-luxury-text-secondary leading-relaxed mb-4">
              {r.quote}
            </p>
            <p className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-gold">
              — {r.authorName}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
