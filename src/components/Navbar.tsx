'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
      }
    }
    window.addEventListener('click', onClickOutside)
    return () => window.removeEventListener('click', onClickOutside)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logoicon.png"
                alt="Building Bridge logo"
                width={40}
                height={40}
                priority
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="hidden lg:block font-heading text-lg font-semibold text-gray-900">BUILDING BRIDGE FOUNDATION</span>
              <span className="sr-only">Home</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-heading text-sm font-medium text-gray-700 hover:text-gray-900">Home</Link>

            <div className="relative" ref={aboutRef}>
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                className="font-heading text-sm font-medium text-gray-700 hover:text-gray-900 inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={aboutOpen}
              >
                About
                <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {aboutOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/5 z-20">
                  <div className="py-1">
                    <Link href="/about/pillars" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Pillars</Link>
                    <Link href="/about/partnerships" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Partnerships</Link>
                    <Link href="/about/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Events</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/programs" className="font-heading text-sm font-medium text-gray-700 hover:text-gray-900">Programs</Link>
            <Link href="/get-involved" className="font-heading text-sm font-medium text-gray-700 hover:text-gray-900">Get Involved</Link>
            <Link href="/contact" className="font-heading text-sm font-medium text-gray-700 hover:text-gray-900">Contact</Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Home</Link>
            <div className="px-2">
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                className="font-heading w-full text-left px-0 py-2 text-gray-700 hover:bg-gray-50 rounded inline-flex items-center justify-between"
                aria-haspopup="true"
                aria-expanded={aboutOpen}
              >
                <span>About</span>
                <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {aboutOpen && (
                <div className="mt-1 ml-4 space-y-1">
                  <Link href="/about/pillars" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Pillars</Link>
                  <Link href="/about/partnerships" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Partnerships</Link>
                  <Link href="/about/events" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Events</Link>
                </div>
              )}
            </div>
            <Link href="/programs" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Programs</Link>
            <Link href="/get-involved" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Get Involved</Link>
            <Link href="/contact" className="font-heading block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}


