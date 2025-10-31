import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const main = Inter({ subsets: ['latin'], variable: '--font-main' })
const heading = Cinzel({ subsets: ['latin'], weight: ['700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'Building Bridge Foundation',
  description: 'Building Bridges, Strengthening Communities.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-title': 'Building Bridge',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${main.variable} ${heading.variable} font-main flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
