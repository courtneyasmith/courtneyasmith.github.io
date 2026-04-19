import type { Metadata } from 'next'
import { Literata } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/data/site-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-literata',
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={literata.className}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
