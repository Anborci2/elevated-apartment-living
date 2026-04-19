import Image from 'next/image'

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    alt: 'Luxury apartment living room',
  },
  {
    src: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
    alt: 'Modern Denver apartment bedroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    alt: 'Contemporary apartment kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    alt: 'Open plan apartment living and dining area',
  },
  {
    src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    alt: 'Luxury apartment bathroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    alt: 'Denver apartment building exterior view',
  },
]

export function Gallery() {
  return (
    <section className="bg-luxury-navy py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
            Luxury Denver Living
          </h2>
          <p className="mt-3 font-inter text-base text-luxury-text-secondary">
            Handpicked properties across Denver&apos;s finest neighborhoods
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {GALLERY_IMAGES.map((image) => (
            <div
              key={image.src}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              <Image
                fill
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
