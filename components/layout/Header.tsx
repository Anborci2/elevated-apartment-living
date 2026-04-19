'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    // Check scroll position on mount (in case page loads mid-scroll)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'flex items-center justify-between',
        'h-16 lg:h-[72px]',
        'px-6 lg:px-12',
        'transition-all duration-300',
        isScrolled
          ? 'bg-luxury-black/92 backdrop-blur-[12px] border-b border-luxury-gold-muted'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* Logo mark */}
      <Link
        href="/"
        aria-label="Elevated Apartment Locating — home"
        className="flex flex-col gap-[2px]"
      >
        <span className="font-playfair text-[22px] lg:text-[28px] font-bold tracking-widest text-luxury-text-primary leading-none">
          ELEVATED
        </span>
        <span className="font-inter text-[10px] lg:text-[11px] font-normal tracking-[0.15em] uppercase text-luxury-text-secondary leading-none">
          Apartment Locating
        </span>
      </Link>

      {/* Primary CTA */}
      <button
        type="button"
        className="border border-luxury-gold px-5 lg:px-6 py-2 lg:py-2.5 font-inter text-[13px] lg:text-sm font-semibold tracking-widest uppercase text-luxury-gold rounded-none transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2"
        onClick={() => {
          document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Find My Apartment
      </button>
    </header>
  )
}
