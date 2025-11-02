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
        className="relative h-[60vh] min-h-[520px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/homeheader.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="relative z-10 text-center px-6">
          <div className="mb-6 flex justify-center">
            <div className="relative rounded-2xl p-0.5 shadow-lg" style={{
              background: `linear-gradient(135deg, ${foundationGreen}, ${foundationOrange}, ${foundationBrown}, ${foundationGreen})`
            }}>
              <div className="bg-white rounded-2xl p-4 md:p-6 relative">
                {/* Decorative corner brackets */}
                <div className="absolute top-2 left-2 w-6 h-6">
                  <div className="absolute top-0 left-0 w-3 h-0.5" style={{ backgroundColor: foundationGreen }} />
                  <div className="absolute top-0 left-0 w-0.5 h-3" style={{ backgroundColor: foundationGreen }} />
                </div>
                <div className="absolute top-2 right-2 w-6 h-6">
                  <div className="absolute top-0 right-0 w-3 h-0.5" style={{ backgroundColor: foundationOrange }} />
                  <div className="absolute top-0 right-0 w-0.5 h-3" style={{ backgroundColor: foundationOrange }} />
                </div>
                <div className="absolute bottom-2 left-2 w-6 h-6">
                  <div className="absolute bottom-0 left-0 w-3 h-0.5" style={{ backgroundColor: foundationBrown }} />
                  <div className="absolute bottom-0 left-0 w-0.5 h-3" style={{ backgroundColor: foundationBrown }} />
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6">
                  <div className="absolute bottom-0 right-0 w-3 h-0.5" style={{ backgroundColor: foundationGreen }} />
                  <div className="absolute bottom-0 right-0 w-0.5 h-3" style={{ backgroundColor: foundationGreen }} />
                </div>
                
                <Image
                  src="/logo2.png"
                  alt="Building Bridge Foundation"
                  width={800}
                  height={800}
                  priority
                  className="max-w-[200px] md:max-w-sm relative z-10"
                />
              </div>
            </div>
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

      {/* Info Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground2.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <h2 className="font-heading text-4xl md:text-4xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
              A Foundation that bridges Community and Care
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mt-6">
              The Building Bridge Foundation supports Texas nonprofit organizations that assist people to help themselves while nurturing and preserving their self-respect. The Foundation encourages endeavors that strengthen families and communities, with particular interest in self-sufficiency, community development, and programs aimed at the economically disadvantaged, children and youth, seniors, and the disabled.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                   style={{ background: foundationGreen, transform: 'scale(1.5)' }} />
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                   style={{ background: `linear-gradient(135deg, ${foundationGreen}15, ${foundationGreen}05)` }}>
                <svg className="w-12 h-12" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                Preserving Dignity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We support organizations that assist people to help themselves while nurturing and preserving their self-respect.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                   style={{ background: foundationOrange, transform: 'scale(1.5)' }} />
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                   style={{ background: `linear-gradient(135deg, ${foundationOrange}15, ${foundationOrange}05)` }}>
                <svg className="w-12 h-12" style={{ color: foundationOrange }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                Strengthening Communities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We encourage endeavors that strengthen families and communities, with focus on self-sufficiency and community development.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                   style={{ background: foundationBrown, transform: 'scale(1.5)' }} />
              <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                   style={{ background: `linear-gradient(135deg, ${foundationBrown}15, ${foundationBrown}05)` }}>
                <svg className="w-12 h-12" style={{ color: foundationBrown }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                Serving All
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our programs focus on the economically disadvantaged, children and youth, seniors, and the disabled throughout Texas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Initiatives Slider */}
      <section className="py-12 md:py-16 relative overflow-hidden">
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
          <div className="absolute inset-0 " />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

            {/* Right side - Action button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 flex-shrink-0">
              <Link
                href="/contact"
                className="group relative px-6 md:px-8 py-3 rounded-lg font-semibold text-white border-2 border-white/80 hover:border-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-sm bg-white/10"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
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
