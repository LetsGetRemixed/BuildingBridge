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
          backgroundImage: "url('/images/BBF 4.JPG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-white text-4xl md:text-5xl font-bold tracking-tight">
            Building Bridges, Strengthening Communities.
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
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
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6 border" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill={foundationGreen}><path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: foundationBrown }}>Our Mission</h3>
                  <p className="mt-2 text-gray-700">
                    To bridge gaps in education, family support, and life skills by partnering
                    with communities and organizations to build lasting opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-6 border" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill={foundationOrange}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v6l5 3"/></svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: foundationBrown }}>Our Vision</h3>
                  <p className="mt-2 text-gray-700">
                    Strong, thriving neighborhoods where every family has access to the tools
                    and support they need to succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Overview */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#FAF9F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6" style={{ color: foundationBrown }}>Our Pillars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Education', href: '/about/pillars#education', icon: '/icons/education.png' },
              { title: 'Families', href: '/about/pillars#families', icon: '/icons/family.png' },
              { title: 'Life Skills', href: '/about/pillars#lifeskills', icon: '/icons/life.png' },
              { title: 'Food/Housing', href: '/about/pillars#support', icon: '/icons/housing.png' },
              { title: 'Community', href: '/about/pillars#community', icon: '/icons/community.png' },
            ].map((p) => (
              <Link key={p.title} href={p.href} className="block group">
                <div className="rounded-lg p-4 h-full border transition-shadow shadow-sm hover:shadow-md bg-white" style={{ borderColor: '#e5e7eb' }}>
                  <div className="mb-3">
                    <Image src={p.icon} alt={`${p.title} icon`} width={40} height={40} className="object-contain" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:underline">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Learn more</p>
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
          <div className="relative overflow-hidden rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
            <div className="relative h-72 md:h-96">
              {/* Current slide */}
              <Image
                src={slides[current].src}
                alt={slides[current].caption}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 80%)' }}>
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
      <section className="py-12 md:py-16" style={{ backgroundColor: '#FAF9F7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold" style={{ color: foundationBrown }}>Our Partners</h2>
            <span className="text-sm text-gray-500">Thank you for your support</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              '/partnerships/christianministries.png',
              '/partnerships/Connections.png',
              '/partnerships/ednabusinessassociation.png',
              '/partnerships/food-bank-logo.png',
              '/partnerships/palacios.png',
            ].map((src, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-lg border shadow-sm hover:shadow-md transition overflow-hidden"
                style={{ borderColor: '#e5e7eb' }}
              >
                <div className="relative h-20 sm:h-24 md:h-28 px-4 py-3 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`Partner ${idx + 1}`}
                      fill
                      className="object-contain transition-transform duration-200 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14" style={{ backgroundColor: foundationGreen }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-white text-2xl md:text-3xl font-bold">Ready to make a difference?</h2>
          <p className="text-white/90 mt-2 max-w-2xl mx-auto">
            Join us as a volunteer, partner with BBF, or reach out to learn more.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/get-involved"
              className="px-6 py-3 rounded-md font-semibold text-white"
              style={{ backgroundColor: foundationOrange }}
            >
              Get Involved
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-md font-semibold text-white border"
              style={{ borderColor: 'white' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
