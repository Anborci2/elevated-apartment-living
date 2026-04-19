const steps = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    body: 'Fill out a quick form with your budget, size, and timeline.',
  },
  {
    number: '02',
    title: 'Alan Does the Search',
    body: 'We tap into our Denver network to find apartments that actually fit.',
  },
  {
    number: '03',
    title: 'Move Into Your Perfect Place',
    body: 'Get matched, tour, and sign — we guide you the whole way.',
  },
]

export function HowItWorks() {
  return (
    <section
      className="bg-luxury-black py-16 lg:py-24"
      aria-label="How It Works"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center lg:text-left">
              <span className="block font-playfair text-6xl lg:text-7xl font-bold text-luxury-gold leading-none mb-4">
                {step.number}
              </span>
              <div className="w-12 h-px bg-luxury-gold mx-auto lg:mx-0 mb-4" aria-hidden="true" />
              <h3 className="font-playfair text-xl lg:text-2xl font-semibold text-luxury-text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-base text-luxury-text-secondary leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
