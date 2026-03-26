'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md" style={{ background: foundationGreen }} />
                <Image
                  src="/newlogoicon.png"
                  alt="Building Bridge logo"
                  width={64}
                  height={40}
                  priority
                  className="w-16 h-7 relative transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="hidden lg:block font-heading text-lg md:text-xl font-bold text-gray-900 group-hover:opacity-90 transition-opacity">
                BUILDING BRIDGE FOUNDATION
              </span>
              <span className="sr-only">Home</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link 
              href="/" 
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationGreen }} />
            </Link>

            <Link
              href="/about"
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationGreen }} />
            </Link>

            <Link 
              href="/events" 
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">Events</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationOrange }} />
            </Link>

            <Link 
              href="/contact" 
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationBrown }} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <svg className="h-6 w-6 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-1">
            <Link 
              href="/" 
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            
            <Link
              href="/about"
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>

            <Link 
              href="/events" 
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            
            <Link 
              href="/contact" 
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}


