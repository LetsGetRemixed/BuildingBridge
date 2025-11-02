'use client'

import Link from 'next/link'
import Image from 'next/image'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contactheader.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white border-b-2 border-white w-fit mx-auto pb-3">
                Get in touch with us
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6">
              We'd love to hear from you. Reach out to us at our office or send us an email.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Jackson County Office */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center" style={{ color: foundationGreen }}>
                  <svg 
                    className="w-8 h-8" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl md:text-3xl font-heading font-bold mb-4"
                  style={{ color: foundationBrown }}
                >
                  Jackson County Office
                </h3>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  305 N Allen St<br />
                  Edna, TX 77957
                </p>
              </div>
            </div>

            {/* Comal County Office */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center" style={{ color: foundationOrange }}>
                  <svg 
                    className="w-8 h-8" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl md:text-3xl font-heading font-bold mb-4"
                  style={{ color: foundationBrown }}
                >
                  Comal County Office
                </h3>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  408 South Seguin Avenue<br />
                  New Braunfels, Texas 78130
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center" style={{ color: foundationBrown }}>
                  <svg 
                    className="w-8 h-8" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl md:text-3xl font-heading font-bold mb-4"
                  style={{ color: foundationBrown }}
                >
                  Phone
                </h3>
                <a 
                  href="tel:726-215-6447"
                  className="text-gray-700 hover:text-gray-900 text-lg md:text-xl transition-colors inline-flex items-center gap-2 group"
                >
                  <span>726-215-6447</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center" style={{ color: foundationGreen }}>
                  <svg 
                    className="w-8 h-8" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 
                  className="text-2xl md:text-3xl font-heading font-bold mb-4"
                  style={{ color: foundationBrown }}
                >
                  Email
                </h3>
                <a 
                  href="mailto:info@buildingbridgefoundation.org"
                  className="text-gray-700 hover:text-gray-900 text-lg md:text-xl transition-colors inline-flex items-center gap-2 group break-all"
                >
                  <span>info@buildingbridgefoundation.org</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
