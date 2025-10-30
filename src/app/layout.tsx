import type { Metadata } from 'next'
import { Inter, Nunito_Sans } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const main = Inter({ subsets: ['latin'], variable: '--font-main' })
const heading = Nunito_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'Vercel Template',
  description: 'A simple Next.js app with MongoDB backend',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={`${main.variable} ${heading.variable} font-main flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
