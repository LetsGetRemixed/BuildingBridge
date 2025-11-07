'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface User {
  id: string
  email: string
  role?: 'user' | 'admin'
}

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Footer() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  return (
    <footer className="relative mt-auto overflow-hidden" style={{ backgroundColor: foundationBrown }}>
      {/* Decorative top border */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${foundationGreen}, ${foundationOrange}, ${foundationGreen})` }} />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationGreen} 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationOrange} 0%, transparent 70%)`, transform: 'translate(30%, 30%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Image
                  src="/logoicon.png"
                  alt="Building Bridge Foundation logo"
                  width={48}
                  height={48}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="font-heading text-lg font-bold text-white group-hover:opacity-90 transition-opacity">
                BUILDING BRIDGE FOUNDATION
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Building bridges, strengthening communities. Empowering families through education, life skills, and community partnerships.
            </p>
           
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Home
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about/pillars" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Our Pillars
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/programs" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Programs
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/get-involved" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Get Involved
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-6">About</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about/partnerships" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Partnerships
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about/events" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Events
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                    Contact Us
                    <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
              {user && user.role === 'admin' && (
                <li>
                  <Link 
                    href="/admin" 
                    className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center group text-sm"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                      Admin Dashboard
                      <svg className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-6">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a href="mailto:info@buildingbridgefoundation.org" className="text-white hover:opacity-80 transition-opacity text-sm">
                    info@buildingbridgefoundation.org
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a href="tel:7262156447" className="text-white hover:opacity-80 transition-opacity text-sm">
                  726-215-6447
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Location</p>
                  <p className="text-white text-sm">Comal County Office<br />408 South Seguin Avenue<br />New Braunfels, Texas 78130</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {new Date().getFullYear()} Building Bridge Foundation. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                Login
              </Link>
              <span className="text-gray-500">|</span>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
