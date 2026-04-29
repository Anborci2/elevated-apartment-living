'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContactModal } from '@/components/ui/ContactModalContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useContactModal()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const headerBg = isScrolled || menuOpen
    ? 'bg-luxury-black/95 backdrop-blur-[12px] border-b border-luxury-gold-muted'
    : 'bg-transparent'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 lg:h-[72px] px-6 lg:px-12 transition-all duration-300 ${headerBg}`}>

        {/* Logo */}
        <Link href="/" aria-label="Elevated Apartment Locating — home" className="flex flex-col gap-[2px]">
          <span className="font-playfair text-[22px] lg:text-[28px] font-bold tracking-widest text-luxury-text-primary leading-none">
            ELEVATED
          </span>
          <span className="font-inter text-[10px] lg:text-[11px] font-normal tracking-[0.15em] uppercase text-luxury-text-secondary leading-none">
            Apartment Locating
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          <Link href="/neighborhoods" className="font-inter text-[13px] font-medium tracking-wide text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
            Neighborhoods
          </Link>
          <Link href="/faq" className="font-inter text-[13px] font-medium tracking-wide text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
            FAQ
          </Link>
        </nav>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={openModal}
          className="hidden lg:block border border-luxury-gold px-6 py-2.5 font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2"
        >
          Find My Apartment
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
        >
          <span className={`block w-6 h-[1.5px] bg-luxury-text-primary transition-all duration-300 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-luxury-text-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-luxury-text-primary transition-all duration-300 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-luxury-black flex flex-col pt-16 transition-all duration-300 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col px-8 pt-12 gap-2">
          <Link
            href="/neighborhoods"
            className="font-playfair text-3xl font-bold text-luxury-text-primary py-4 border-b border-luxury-gold-muted hover:text-luxury-gold transition-colors duration-200"
          >
            Neighborhoods
          </Link>
          <Link
            href="/faq"
            className="font-playfair text-3xl font-bold text-luxury-text-primary py-4 border-b border-luxury-gold-muted hover:text-luxury-gold transition-colors duration-200"
          >
            FAQ
          </Link>
        </nav>

        <div className="px-8 pt-10">
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openModal() }}
            className="w-full border border-luxury-gold px-6 py-4 font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black"
          >
            Find My Apartment
          </button>
        </div>
      </div>
    </>
  )
}
