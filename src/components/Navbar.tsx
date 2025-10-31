'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const aboutMobileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
      }
      if (aboutMobileRef.current && !aboutMobileRef.current.contains(e.target as Node)) {
        setAboutMobileOpen(false)
      }
    }
    window.addEventListener('click', onClickOutside)
    return () => window.removeEventListener('click', onClickOutside)
  }, [])

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setMobileOpen(false)
    setAboutMobileOpen(false)
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
                  src="/logoicon.png"
                  alt="Building Bridge logo"
                  width={40}
                  height={40}
                  priority
                  className="w-8 h-8 md:w-10 md:h-10 relative transition-transform duration-300 group-hover:scale-110"
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

            <div className="relative" ref={aboutRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setAboutOpen((v) => !v)
                }}
                className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 inline-flex items-center relative group"
                aria-haspopup="true"
                aria-expanded={aboutOpen}
              >
                <span className="relative z-10">About</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${aboutOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationGreen }} />
              </button>

              {aboutOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-gray-200/50 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    <Link 
                      href="/about/pillars" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 relative group"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span className="relative z-10">Our Pillars</span>
                      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: foundationGreen }} />
                    </Link>
                    <Link 
                      href="/about/partnerships" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 relative group"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span className="relative z-10">Partnerships</span>
                      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: foundationOrange }} />
                    </Link>
                    <Link 
                      href="/about/events" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 relative group"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span className="relative z-10">Events</span>
                      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: foundationBrown }} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/programs" 
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">Programs</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationOrange }} />
            </Link>
            <Link 
              href="/get-involved" 
              className="font-heading text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50 relative group"
            >
              <span className="relative z-10">Get Involved</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300 group-hover:h-1 opacity-0 group-hover:opacity-100" style={{ background: foundationGreen }} />
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
            
            <div className="px-4" ref={aboutMobileRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setAboutMobileOpen((v) => !v)
                }}
                className="font-heading w-full text-left py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg inline-flex items-center justify-between transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded={aboutMobileOpen}
              >
                <span>About</span>
                <svg 
                  className={`ml-2 h-5 w-5 transition-transform duration-300 ${aboutMobileOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {aboutMobileOpen && (
                <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-4 animate-in slide-in-from-left duration-200">
                  <Link 
                    href="/about/pillars" 
                    className="font-heading block px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Our Pillars
                  </Link>
                  <Link 
                    href="/about/partnerships" 
                    className="font-heading block px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Partnerships
                  </Link>
                  <Link 
                    href="/about/events" 
                    className="font-heading block px-4 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Events
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/programs" 
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Programs
            </Link>
            <Link 
              href="/get-involved" 
              className="font-heading block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              onClick={closeMobileMenu}
            >
              Get Involved
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


