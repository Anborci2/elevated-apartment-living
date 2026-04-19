import { Hero } from '@/components/sections/Hero'
import { Gallery } from '@/components/sections/Gallery'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { OurStory } from '@/components/sections/OurStory'

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <HowItWorks />
      <OurStory />
      <div id="lead-form" className="bg-luxury-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-inter text-sm text-luxury-text-secondary">
            {/* Phase 3: Lead form mounts here */}
          </p>
        </div>
      </div>
    </main>
  )
}
