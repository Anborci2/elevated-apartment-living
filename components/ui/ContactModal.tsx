'use client'

import { useEffect, useRef, useState } from 'react'
import { useContactModal } from './ContactModalContext'

const BEDROOMS = ['Studio', '1 Bed', '2 Bed', '3+ Bed']
const TIMELINES = ['ASAP', 'Within 1 Month', '2–3 Months', 'Just Exploring']
const BUDGETS = ['Under $1,500', '$1,500–$2,000', '$2,000–$2,500', '$2,500–$3,000', '$3,000+']
const NEIGHBORHOODS = [
  'LoDo', 'LoHi', 'RiNo', 'Cherry Creek',
  'Capitol Hill', 'Washington Park', 'Highlands', 'Five Points', 'Congress Park',
  'Anywhere in Denver',
]
const LEASE_LENGTHS = ['Month-to-Month', '6 Months', '12 Months', 'Flexible']

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  bedrooms: string[]
  timeline: string
  budget: string
  neighborhoods: string[]
  leaseLength: string
  notes: string
}

const EMPTY: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  bedrooms: [], timeline: '', budget: '',
  neighborhoods: [], leaseLength: '', notes: '',
}

type Status = 'idle' | 'loading' | 'success' | 'error'

function toggleItem(arr: string[], item: string) {
  return arr.includes(item) ? arr.filter(v => v !== item) : [...arr, item]
}

const inputCls = 'w-full bg-white border border-[#C9A96E66] px-4 py-3 font-inter text-sm text-luxury-navy-mid placeholder-[#A8A29E] focus:outline-none focus:border-luxury-gold transition-colors'
const pillBase = 'font-inter text-sm px-5 py-2.5 border transition-all duration-150'
const pillOn   = 'bg-luxury-gold text-luxury-black border-luxury-gold'
const pillOff  = 'bg-white text-luxury-navy-mid border-[#1B3A5F33] hover:border-luxury-gold'

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const panelRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeModal])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setForm(EMPTY); setErrors({}); setStatus('idle') }, 300)
    }
  }, [isOpen])

  function handleBackdropClick(e: React.MouseEvent) {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      closeModal()
    }
  }

  function validate() {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (form.bedrooms.length === 0) e.bedrooms = 'Select at least one'
    if (!form.timeline) e.timeline = 'Required'
    if (!form.budget) e.budget = 'Required'
    if (form.neighborhoods.length === 0) e.neighborhoods = 'Select at least one'
    if (!form.leaseLength) e.leaseLength = 'Required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    /* Backdrop — clicking anywhere outside the panel closes the modal */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label="Find My Apartment"
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-luxury-text-primary border border-luxury-gold-muted shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-luxury-text-primary border-b border-luxury-gold-muted px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-luxury-navy-mid">
              Find My Apartment
            </h2>
            <p className="font-inter text-sm text-luxury-navy-mid mt-1">
              Free service — we&apos;ll follow up within 24 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="text-luxury-navy-mid hover:text-luxury-gold transition-colors duration-200 p-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {status === 'success' ? (
          <div className="px-8 py-16 text-center">
            <div className="w-12 h-0.5 bg-luxury-gold mx-auto mb-6" aria-hidden="true" />
            <h3 className="font-playfair text-2xl font-bold text-luxury-navy-mid mb-3">
              We&apos;ll be in touch.
            </h3>
            <p className="font-inter text-base text-luxury-navy-mid">
              Thanks for reaching out. Expect a response within 24 hours.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-8 font-inter text-sm font-semibold tracking-widest uppercase text-luxury-gold border border-luxury-gold px-6 py-3 transition-all duration-200 hover:bg-luxury-gold hover:text-luxury-black"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 py-8 space-y-8">

            {/* Contact info */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Contact Info
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['firstName', 'lastName'] as const).map((field) => (
                  <div key={field}>
                    <label className="block font-inter text-xs tracking-wide text-luxury-navy-mid mb-1.5">
                      {field === 'firstName' ? 'First Name' : 'Last Name'}
                    </label>
                    <input
                      ref={field === 'firstName' ? firstInputRef : undefined}
                      type="text"
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      className={inputCls}
                    />
                    {errors[field] && <p className="font-inter text-xs text-red-400 mt-1">{errors[field]}</p>}
                  </div>
                ))}
                {(['email', 'phone'] as const).map((field) => (
                  <div key={field}>
                    <label className="block font-inter text-xs tracking-wide text-luxury-navy-mid mb-1.5">
                      {field === 'email' ? 'Email' : 'Phone'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'tel'}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      className={inputCls}
                    />
                    {errors[field] && <p className="font-inter text-xs text-red-400 mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Bedrooms */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Bedrooms <span className="normal-case tracking-normal font-normal text-luxury-navy-mid">(select all that apply)</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {BEDROOMS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, bedrooms: toggleItem(f.bedrooms, opt) }))}
                    className={`${pillBase} ${form.bedrooms.includes(opt) ? pillOn : pillOff}`}
                  >{opt}</button>
                ))}
              </div>
              {errors.bedrooms && <p className="font-inter text-xs text-red-400 mt-2">{errors.bedrooms}</p>}
            </fieldset>

            {/* Timeline */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Move-in Timeline
              </legend>
              <div className="flex flex-wrap gap-3">
                {TIMELINES.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, timeline: opt }))}
                    className={`${pillBase} ${form.timeline === opt ? pillOn : pillOff}`}
                  >{opt}</button>
                ))}
              </div>
              {errors.timeline && <p className="font-inter text-xs text-red-400 mt-2">{errors.timeline}</p>}
            </fieldset>

            {/* Budget */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Monthly Budget
              </legend>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, budget: opt }))}
                    className={`${pillBase} ${form.budget === opt ? pillOn : pillOff}`}
                  >{opt}</button>
                ))}
              </div>
              {errors.budget && <p className="font-inter text-xs text-red-400 mt-2">{errors.budget}</p>}
            </fieldset>

            {/* Neighborhoods */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Preferred Neighborhoods <span className="normal-case tracking-normal font-normal text-luxury-navy-mid">(select all that apply)</span>
              </legend>
              <div className="flex flex-wrap gap-3">
                {NEIGHBORHOODS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, neighborhoods: toggleItem(f.neighborhoods, opt) }))}
                    className={`${pillBase} ${form.neighborhoods.includes(opt) ? pillOn : pillOff}`}
                  >{opt}</button>
                ))}
              </div>
              {errors.neighborhoods && <p className="font-inter text-xs text-red-400 mt-2">{errors.neighborhoods}</p>}
            </fieldset>

            {/* Lease length */}
            <fieldset>
              <legend className="font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Lease Length
              </legend>
              <div className="flex flex-wrap gap-3">
                {LEASE_LENGTHS.map(opt => (
                  <button key={opt} type="button"
                    onClick={() => setForm(f => ({ ...f, leaseLength: opt }))}
                    className={`${pillBase} ${form.leaseLength === opt ? pillOn : pillOff}`}
                  >{opt}</button>
                ))}
              </div>
              {errors.leaseLength && <p className="font-inter text-xs text-red-400 mt-2">{errors.leaseLength}</p>}
            </fieldset>

            {/* Notes */}
            <div>
              <label className="block font-inter text-xs font-semibold tracking-widest uppercase text-luxury-navy-mid mb-4">
                Anything Else? <span className="normal-case tracking-normal font-normal text-luxury-navy-mid">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Pets, must-haves, dealbreakers, specific buildings..."
                className="w-full bg-white border border-[#C9A96E66] px-4 py-3 font-inter text-sm text-luxury-navy-mid placeholder-[#A8A29E] focus:outline-none focus:border-luxury-gold transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="font-inter text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full font-inter text-sm font-semibold tracking-widest uppercase bg-luxury-gold text-luxury-black py-4 transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending…' : 'Submit'}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}
