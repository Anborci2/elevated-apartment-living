import { Hero } from '@/components/sections/Hero'
import { Gallery } from '@/components/sections/Gallery'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { OurStory } from '@/components/sections/OurStory'
import { AreasWeServe } from '@/components/sections/AreasWeServe'
import { Reviews } from '@/components/sections/Reviews'
import { ContactButton } from '@/components/ui/ContactButton'

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <HowItWorks />
      <OurStory />
      <AreasWeServe />
      <Reviews />
      <section className="bg-luxury-navy py-20 lg:py-28" id="lead-form">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
            Ready to find your place?
          </h2>
          <div className="w-16 h-0.5 bg-luxury-gold mx-auto mt-6 mb-8" aria-hidden="true" />
          <p className="font-inter text-base lg:text-lg text-luxury-text-secondary mb-10 leading-relaxed">
            Tell us what you&apos;re looking for. We&apos;ll handle the search — for free.
          </p>
          <ContactButton />
        </div>
      </section>
    </main>
  )
}
