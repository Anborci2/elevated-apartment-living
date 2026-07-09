import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactModalProvider } from '@/components/ui/ContactModalContext'
import { ContactModal } from '@/components/ui/ContactModal'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Elevated Apartment Locating',
  description:
    'Denver\'s premier apartment locating service. Tell us what you\'re looking for — we handle the rest.',
}

// Re-fetch Sanity content (footer contact info + all pages below) hourly,
// so edits published in the Studio go live without a redeploy
export const revalidate = 3600

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="font-inter bg-luxury-black text-luxury-text-primary antialiased">
        <GoogleAnalytics />
        <ContactModalProvider>
          <Header />
          {children}
          <Footer />
          <ContactModal />
        </ContactModalProvider>
      </body>
    </html>
  )
}
