'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Slide = {
  src: string
  caption: string
}

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Home() {
  const slides: Slide[] = [
    { src: '/images/BBF 4.JPG', caption: 'Back-to-school supply drive' },
    { src: '/images/BBF 5.JPG', caption: 'Community mentorship event' },
    { src: '/images/BBF 3.jpg', caption: 'Weekend learning workshop' },
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[60vh] min-h-[420px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/headerbackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="relative z-10 text-center px-6">
          <div className="mb-6 flex justify-center">
            <Image
              src="/logo2.png"
              alt="Building Bridge Foundation"
              width={800}
              height={800}
              priority
              className="max-w-[200px] md:max-w-sm"
              style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, .8)) drop-shadow(0 0 5px rgba(255, 255, 255, .5))' }}
            />
          </div>
          <h1 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Building Bridges, Strengthening Communities.
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto text-sm md:text-base">
            Empowering families through education, life skills, and community partnerships.
          </p>
          <Link
            href="/about"
            className="inline-block mt-6 px-6 py-3 rounded-md text-white font-semibold"
            style={{ backgroundColor: foundationGreen }}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationGreen} 0%, transparent 70%)`, transform: 'translate(-50%, -50%)' }} />
          <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationOrange} 0%, transparent 70%)`, transform: 'translate(50%, -50%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-24 mx-auto mb-4 rounded-full" style={{ background: `linear-gradient(90deg, ${foundationGreen}, ${foundationOrange})` }} />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: foundationBrown }}>
                Our Foundation
              </h2>
              <div className="h-1 w-24 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${foundationOrange}, ${foundationGreen})` }} />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              The principles that guide our work and shape our impact in the community
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission Card */}
            <div className="group relative">
              {/* Floating shadow effect */}
              <div 
                className="absolute -z-10 inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                style={{ 
                  background: foundationGreen,
                  transform: 'translateY(12px) scale(0.95)'
                }}
              />

              <div 
                className="relative h-full rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                style={{ 
                  borderColor: '#e5e7eb',
                  background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${foundationGreen}, ${foundationBrown})`
                  }}
                />

                {/* Top accent bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${foundationGreen}, ${foundationBrown})`
                  }}
                />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="relative inline-flex items-center justify-center">
                    {/* Glowing background circle */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                      style={{ 
                        background: foundationGreen,
                        transform: 'scale(1.5)'
                      }}
                    />
                    {/* Icon container */}
                    <div 
                      className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${foundationGreen}15, ${foundationGreen}05)`
                      }}
                    >
                      <svg 
                        className="w-12 h-12 transition-colors duration-500" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: foundationGreen }}
                      >
                        <path 
                          d="M12 2L15 9H22L17 13L19 20L12 16L5 20L7 13L2 9H9L12 2Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 
                    className="text-3xl md:text-4xl font-heading font-bold mb-4 transition-colors duration-300"
                    style={{ color: foundationBrown }}
                  >
                    Our Mission
                  </h3>
                  <div className="h-1 w-16 mb-6 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: foundationGreen }} />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    To bridge gaps in education, family support, and life skills by partnering
                    with communities and organizations to build lasting opportunities.
                  </p>
                  
                  {/* Decorative bottom accent */}
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
                          style={{ 
                            background: foundationGreen,
                            opacity: 0.3 + (i * 0.2)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500 ml-2">Building bridges together</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative">
              {/* Floating shadow effect */}
              <div 
                className="absolute -z-10 inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                style={{ 
                  background: foundationOrange,
                  transform: 'translateY(12px) scale(0.95)'
                }}
              />

              <div 
                className="relative h-full rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                style={{ 
                  borderColor: '#e5e7eb',
                  background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${foundationOrange}, ${foundationBrown})`
                  }}
                />

                {/* Top accent bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${foundationOrange}, ${foundationBrown})`
                  }}
                />

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="relative inline-flex items-center justify-center">
                    {/* Glowing background circle */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                      style={{ 
                        background: foundationOrange,
                        transform: 'scale(1.5)'
                      }}
                    />
                    {/* Icon container */}
                    <div 
                      className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${foundationOrange}15, ${foundationOrange}05)`
                      }}
                    >
                      <svg 
                        className="w-12 h-12 transition-colors duration-500" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: foundationOrange }}
                      >
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M12 6V12L16 14" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 
                    className="text-3xl md:text-4xl font-heading font-bold mb-4 transition-colors duration-300"
                    style={{ color: foundationBrown }}
                  >
                    Our Vision
                  </h3>
                  <div className="h-1 w-16 mb-6 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: foundationOrange }} />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    Strong, thriving neighborhoods where every family has access to the tools
                    and support they need to succeed.
                  </p>
                  
                  {/* Decorative bottom accent */}
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
                          style={{ 
                            background: foundationOrange,
                            opacity: 0.3 + (i * 0.2)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500 ml-2">Envisioning tomorrow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Overview */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#FAF9F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: foundationBrown }}>Our Pillars</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The foundation of our mission rests on five core pillars that guide everything we do
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {[
              { 
                title: 'Education', 
                href: '/about/pillars#education', 
                icon: '/icons/education.png',
                description: 'Empowering minds through learning opportunities'
              },
              { 
                title: 'Families', 
                href: '/about/pillars#families', 
                icon: '/icons/family.png',
                description: 'Strengthening family bonds and support systems'
              },
              { 
                title: 'Life Skills', 
                href: '/about/pillars#lifeskills', 
                icon: '/icons/life.png',
                description: 'Building practical skills for everyday success'
              },
              { 
                title: 'Food/Housing', 
                href: '/about/pillars#support', 
                icon: '/icons/housing.png',
                description: 'Ensuring basic needs are met with dignity'
              },
              { 
                title: 'Community', 
                href: '/about/pillars#community', 
                icon: '/icons/community.png',
                description: 'Fostering connections and collective growth'
              },
            ].map((p, index) => (
              <Link key={p.title} href={p.href} className="block group">
                <div className="relative h-full rounded-2xl p-6 md:p-8 bg-white border-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2" 
                     style={{ 
                       borderColor: '#e5e7eb',
                       background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                     }}>
                  {/* Decorative accent */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: index === 0 ? `linear-gradient(90deg, ${foundationGreen}, ${foundationBrown})` :
                                  index === 1 ? `linear-gradient(90deg, ${foundationBrown}, ${foundationOrange})` :
                                  index === 2 ? `linear-gradient(90deg, ${foundationOrange}, ${foundationGreen})` :
                                  index === 3 ? `linear-gradient(90deg, ${foundationGreen}, ${foundationOrange})` :
                                  `linear-gradient(90deg, ${foundationBrown}, ${foundationGreen})`
                    }}
                  />
                  
                  {/* Icon container with enhanced styling */}
                  <div className="relative mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" 
                         style={{ 
                           background: index === 0 ? foundationGreen :
                                      index === 1 ? foundationBrown :
                                      index === 2 ? foundationOrange :
                                      index === 3 ? foundationGreen :
                                      foundationBrown
                         }}
                    />
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Image 
                        src={p.icon} 
                        alt={`${p.title} icon`} 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={`font-heading font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors break-words ${
                      p.title === 'Food/Housing' 
                        ? 'text-base sm:text-lg md:text-xl lg:text-xl leading-tight' 
                        : 'text-xl md:text-xl'
                    }`}>
                      {p.title === 'Food/Housing' ? (
                        <>
                          Food/<wbr />Housing
                        </>
                      ) : (
                        p.title
                      )}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold" 
                         style={{ color: foundationGreen }}>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                        Learn more
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Initiatives Slider */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: foundationBrown }}>Recent Initiatives</h2>
            <div className="flex items-center space-x-2">
              <button
                aria-label="Previous slide"
                onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
                className="h-9 w-9 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                ‹
              </button>
              <button
                aria-label="Next slide"
                onClick={() => setCurrent((c) => (c + 1) % slides.length)}
                className="h-9 w-9 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                ›
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-gray-10" style={{ borderColor: '#e5e7eb' }}>
            <div className="relative w-full h-72 md:h-96 lg:h-[500px]">
              {/* Blurred background version */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slides[current].src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover blur-md opacity-90 scale-100"
                  aria-hidden="true"
                  priority
                />
              </div>
              {/* Current slide - sharp foreground */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image
                  src={slides[current].src}
                  alt={slides[current].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 10%)' }}>
                <p className="text-white text-sm md:text-base">{slides[current].caption}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-3 space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full ${i === current ? 'bg-gray-800' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Highlights */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#FAF9F7' }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationGreen} 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationOrange} 0%, transparent 70%)`, transform: 'translate(30%, 30%)' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <div className="h-1 w-20 mx-auto mb-3 rounded-full" style={{ background: `linear-gradient(90deg, ${foundationGreen}, ${foundationOrange})` }} />
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3" style={{ color: foundationBrown }}>
                Our Partners
              </h2>
              <div className="h-1 w-20 mx-auto mt-3 rounded-full" style={{ background: `linear-gradient(90deg, ${foundationOrange}, ${foundationGreen})` }} />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Building stronger communities together through meaningful partnerships
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {[
              { src: '/partnerships/christianministries.png', name: 'Christian Ministries' },
              { src: '/partnerships/Connections.png', name: 'Connections' },
              { src: '/partnerships/ednabusinessassociation.png', name: 'Edna Business Association' },
              { src: '/partnerships/food-bank-logo.png', name: 'Food Bank' },
              { src: '/partnerships/palacios.png', name: 'Palacios' },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="group relative"
              >
                {/* Card with enhanced styling */}
                <div 
                  className="relative h-full bg-white rounded-2xl p-6 md:p-8 border-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-3 overflow-hidden"
                  style={{ 
                    borderColor: '#e5e7eb',
                    background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                  }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${foundationGreen}, ${foundationOrange})`
                    }}
                  />
                  
                  {/* Top accent bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: idx % 2 === 0 
                        ? `linear-gradient(90deg, ${foundationGreen}, ${foundationBrown})`
                        : `linear-gradient(90deg, ${foundationOrange}, ${foundationBrown})`
                    }}
                  />
                  
                  {/* Subtle background glow on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
                    style={{ 
                      background: idx % 2 === 0 ? foundationGreen : foundationOrange
                    }}
                  />

                  {/* Logo Container */}
                  <div className="relative z-10">
                    <div className="relative h-32 sm:h-36 md:h-40 mb-4 flex items-center justify-center">
                      {/* Decorative circle behind logo */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                        style={{ 
                          background: `radial-gradient(circle, ${idx % 2 === 0 ? foundationGreen : foundationOrange} 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Logo with smooth transitions */}
                      <div className="relative w-full h-full px-4">
                        <Image
                          src={partner.src}
                          alt={`${partner.name} logo`}
                          fill
                          sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px"
                          className="object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                        />
                      </div>
                    </div>

                    {/* Partner name with elegant typography */}
                    <div className="text-center">
                      <h3 className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
                        {partner.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 rounded-full transition-all duration-500"
                    style={{ 
                      background: idx % 2 === 0 ? foundationGreen : foundationOrange
                    }}
                  />
                </div>

                {/* Floating shadow effect */}
                <div 
                  className="absolute -z-10 inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ 
                    background: idx % 2 === 0 ? foundationGreen : foundationOrange,
                    transform: 'translateY(8px) scale(0.95)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Thank you message */}
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
              <svg className="w-5 h-5" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm md:text-base font-medium text-gray-700">
                Thank you for your unwavering support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-8 md:py-10 overflow-hidden" style={{ backgroundColor: foundationGreen }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${foundationOrange} 0%, transparent 70%)`, transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, ${foundationBrown} 0%, transparent 70%)`, transform: 'translate(30%, 30%)' }} />
        </div>

        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            {/* Left side - Text content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                Ready to make a difference?
              </h2>
              <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto md:mx-0">
                Join us as a volunteer, partner with BBF, or reach out to learn more.
              </p>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 flex-shrink-0">
              <Link
                href="/get-involved"
                className="group relative px-6 md:px-8 py-3 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: foundationOrange }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg" style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent)'
                }} />
                <span className="relative z-10 flex items-center gap-2">
                  Get Involved
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/contact"
                className="group relative px-6 md:px-8 py-3 rounded-lg font-semibold text-white border-2 border-white/80 hover:border-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-white/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
