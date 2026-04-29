import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Elevated Apartment Locating',
  description: 'Privacy policy for Elevated Apartment Locating.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-luxury-black pt-24 lg:pt-32">
      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-luxury-text-primary tracking-tight">
          Privacy Policy
        </h1>
        <div className="w-16 h-0.5 bg-luxury-gold mt-6 mb-10" aria-hidden="true" />

        <div className="space-y-10 font-inter text-base text-luxury-text-secondary leading-relaxed">

          <div>
            <p className="text-luxury-text-secondary text-sm mb-6">Last updated: {new Date().getFullYear()}</p>
            <p>
              Elevated Apartment Locating (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this website to connect
              prospective renters with apartment locating services in the Denver area. This Privacy
              Policy explains how we collect, use, and protect the information you provide when
              using our site.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Information We Collect
            </h2>
            <p>
              When you submit our lead capture form, we collect the information you voluntarily
              provide, including your name, email address, phone number, income and credit range,
              bedroom preference, desired lease term, and location preference. We only collect
              information that is necessary to provide our locating service.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              How We Use Your Information
            </h2>
            <p>
              The information you provide is used solely to contact you about available apartments
              that match your stated preferences. We do not sell, rent, or share your personal
              information with third parties for marketing purposes. Your information may be shared
              with apartment properties or management companies only as necessary to facilitate
              your apartment search.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Email Communication
            </h2>
            <p>
              By submitting our form, you agree to be contacted by Elevated Apartment Locating via
              email or phone regarding your apartment search. You may opt out of further
              communication at any time by replying to any email with &quot;unsubscribe&quot; or by
              contacting us directly.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Data Retention
            </h2>
            <p>
              We retain your information for as long as necessary to provide our services or as
              required by law. If you would like your information removed from our records, contact
              us at the email below and we will honor your request promptly.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Cookies
            </h2>
            <p>
              This website does not currently use tracking cookies or analytics tools beyond what
              is built into the hosting platform. We do not use advertising cookies or share
              browsing data with third parties.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Security
            </h2>
            <p>
              We take reasonable precautions to protect your personal information. Form submissions
              are transmitted over HTTPS. However, no method of transmission over the internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-playfair text-xl font-semibold text-luxury-text-primary mb-3">
              Contact
            </h2>
            <p>
              Questions about this Privacy Policy or your personal data can be directed to{' '}
              <a
                href="mailto:alan@elevatedapartmentlocating.com"
                className="text-luxury-gold hover:underline"
              >
                alan@elevatedapartmentlocating.com
              </a>
              .
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
