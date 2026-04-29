import type { Metadata } from 'next'
import { ContactButton } from '@/components/ui/ContactButton'

export const metadata: Metadata = {
  title: 'Denver Neighborhoods | Elevated Apartment Locating',
  description:
    'Explore Denver neighborhoods with Elevated Apartment Locating. We know every pocket of the city — find the area that fits your lifestyle.',
}

const neighborhoods = [
  {
    name: 'LoDo',
    subtitle: 'Lower Downtown',
    description:
      "LoDo is Denver's historic core — converted warehouses, exposed brick, and loft-style apartments steps from Union Station. Walkable to some of the best restaurants and bars in the city, with easy light rail access. Great for young professionals who want to be in the middle of everything.",
    vibe: 'Urban · Historic · Walkable',
  },
  {
    name: 'LoHi',
    subtitle: 'Lower Highlands',
    description:
      "LoHi sits just across the Millennium Bridge from downtown with a neighborhood feel the city center lacks. Rooftop patios, boutique coffee shops, and some of Denver's most sought-after restaurants. Apartments range from sleek new builds to renovated Victorian homes.",
    vibe: 'Trendy · Elevated · Residential',
  },
  {
    name: 'RiNo',
    subtitle: 'River North Art District',
    description:
      "RiNo has transformed from industrial warehouses to one of Denver's most vibrant neighborhoods. Murals, breweries, and creative energy everywhere. Modern apartment buildings have followed the investment, offering high-end finishes in an energetic, walkable setting.",
    vibe: 'Creative · Energetic · Modern',
  },
  {
    name: 'Cherry Creek',
    subtitle: 'Cherry Creek North',
    description:
      "Cherry Creek is Denver's upscale shopping and dining corridor. Quieter and more polished than downtown, with a mix of luxury high-rises and boutique mid-rise buildings. Ideal for those who want premium finishes, a calmer pace, and access to the Cherry Creek Trail.",
    vibe: 'Upscale · Quiet · Refined',
  },
  {
    name: 'Capitol Hill',
    subtitle: 'Cap Hill',
    description:
      "Capitol Hill is one of Denver's most walkable and characterful neighborhoods. Victorian homes, independent restaurants, and a diverse, creative community. Typically more affordable than nearby areas — a great option for renters who want personality over polish.",
    vibe: 'Eclectic · Affordable · Walkable',
  },
  {
    name: 'Washington Park',
    subtitle: 'Wash Park',
    description:
      'Washington Park is the neighborhood people move to when they want to settle in. Tree-lined streets, the beloved 165-acre park for running and biking, and a quieter, more residential feel. Apartments and homes here go fast — having a locator helps.',
    vibe: 'Outdoor · Relaxed · Residential',
  },
  {
    name: 'Highlands',
    subtitle: 'West Highlands',
    description:
      'The broader Highlands area west of LoHi offers a slower pace with the same elevated amenities. Bungalow-lined streets, local restaurants, and a strong community feel. Popular with renters looking for something between suburban comfort and city access.',
    vibe: 'Community · Laid-back · Charming',
  },
  {
    name: 'Five Points',
    subtitle: 'Five Points',
    description:
      "One of Denver's fastest-changing neighborhoods, Five Points is seeing significant investment while retaining its historic roots as the \"Harlem of the West.\" Close to downtown with increasingly modern apartments and a rich cultural history.",
    vibe: 'Historic · Up-and-coming · Cultural',
  },
  {
    name: 'Congress Park',
    subtitle: 'Congress Park',
    description:
      'A quieter residential neighborhood between Cherry Creek and Cap Hill. Mostly older apartment buildings and homes with mature trees and a neighborhood-first atmosphere. Close to the Denver Botanic Gardens and the Congress Park rec center.',
    vibe: 'Quiet · Residential · Green',
  },
]

export default function NeighborhoodsPage() {
  return (
    <div className="relative min-h-screen">

      {/* Fixed background image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=1920&q=80)',
        }}
        aria-hidden="true"
      />
      {/* Subtle dark tint so header text is legible */}
      <div className="fixed inset-0 -z-10 bg-luxury-black/40" aria-hidden="true" />

      <main className="pt-24 lg:pt-32">

        {/* Page header — transparent, background shows through */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-luxury-text-primary tracking-tight">
            Denver Neighborhoods
          </h1>
          <div className="w-16 h-0.5 bg-luxury-gold mt-6 mb-8" aria-hidden="true" />
          <p className="font-inter text-base lg:text-xl text-luxury-text-secondary max-w-2xl leading-relaxed">
            Every Denver neighborhood has its own personality. We know them all — which buildings
            are worth it, which are overpriced, and where you&apos;ll actually be happy living.
          </p>
        </section>

        {/* Neighborhood rows — frosted glass panels */}
        <section className="border-t border-white/10">
          {neighborhoods.map((n) => (
            <div
              key={n.name}
              className="border-b border-white/10 backdrop-blur-md bg-luxury-black/60"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 items-start">
                <div>
                  <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-luxury-text-primary">
                    {n.name}
                  </h2>
                  <p className="font-inter text-xs tracking-widest uppercase text-luxury-gold mt-1">
                    {n.subtitle}
                  </p>
                  <p className="font-inter text-xs text-luxury-text-secondary mt-4 tracking-wide">
                    {n.vibe}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-inter text-base lg:text-lg text-luxury-text-secondary leading-relaxed">
                    {n.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="backdrop-blur-md bg-luxury-navy/80 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-luxury-text-primary mb-4">
              Not sure which neighborhood is right for you?
            </h2>
            <p className="font-inter text-base lg:text-lg text-luxury-text-secondary mb-8 max-w-xl mx-auto">
              Tell us your priorities and we&apos;ll match you with the areas — and the buildings — that actually fit.
            </p>
            <ContactButton />
          </div>
        </section>

      </main>
    </div>
  )
}
