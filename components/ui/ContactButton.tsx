'use client'

import { useContactModal } from './ContactModalContext'

interface ContactButtonProps {
  label?: string
  className?: string
}

export function ContactButton({
  label = 'Find My Apartment',
  className,
}: ContactButtonProps) {
  const { openModal } = useContactModal()

  return (
    <button
      type="button"
      onClick={openModal}
      className={
        className ??
        'font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold border border-luxury-gold px-8 py-4 transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxury-gold focus-visible:outline-offset-2'
      }
    >
      {label}
    </button>
  )
}
