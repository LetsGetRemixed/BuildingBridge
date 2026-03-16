'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EventModal from '@/components/EventModal'

type Slide = {
  src: string
  caption: string
}

interface Event {
  _id?: string
  title: string
  description: string
  date: Date | string
  imageUrl: string
  location?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
}

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [eventsError, setEventsError] = useState<string | null>(null)
  const [current, setCurrent] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  
  const infoSectionRef = useRef<HTMLElement>(null)
  const sliderSectionRef = useRef<HTMLElement>(null)
  const ctaSectionRef = useRef<HTMLElement>(null)

  // Convert events to slides format
  const slides: Slide[] = events.map(event => ({
    src: event.imageUrl,
    caption: event.title
  }))

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true)
        const response = await fetch('/api/events?limit=3')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        // Get the first 3 events (already sorted by date descending)
        setEvents((data.events || []).slice(0, 3))
        setEventsError(null)
      } catch (error) {
        console.error('Error fetching events:', error)
        setEventsError('Failed to load events')
        setEvents([])
      } finally {
        setEventsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Auto-advance slider
  useEffect(() => {
    if (slides.length === 0) return
    
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [slides.length])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true
          }))
        }
      })
    }, observerOptions)

    const sections = [
      infoSectionRef.current,
      sliderSectionRef.current,
      ctaSectionRef.current
    ].filter(Boolean) as Element[]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/homeheader.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <div
            className="mb-10 flex justify-center opacity-0 animate-scale-in"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-3xl opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${foundationGreen}, ${foundationOrange}, ${foundationBrown})`,
                  backgroundSize: '200% 200%',
                }}
              />
              <div
                className="relative rounded-3xl p-1 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${foundationGreen}, ${foundationOrange}, ${foundationBrown}, ${foundationGreen})`,
                  backgroundSize: '300% 300%',
                }}
              >
                <div className="bg-white rounded-[22px] p-5 md:p-8 shadow-inner">
                  <Image
                    src="/bridgelogo.png"
                    alt="Building Bridge Foundation"
                    width={800}
                    height={800}
                    priority
                    className="max-w-[180px] md:max-w-[260px] w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1
            className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            Building brighter futures—one community at a time.
          </h1>
          <div
            className="mt-6 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
          >
            <div className="h-px w-16 rounded-full bg-white/60" aria-hidden="true" />
            <p className="text-white/95 text-base md:text-lg max-w-xl mx-auto font-medium tracking-wide">
              Helping People Cross Gaps They Couldn&apos;t Cross Alone
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section
        ref={infoSectionRef}
        id="info-section"
        className={`py-20 md:py-28 relative overflow-hidden transition-all duration-1000 ${
          isVisible['info-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground2.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 md:mb-20">
            <p
              className={`font-main text-sm uppercase tracking-[0.2em] mb-3 transition-all duration-700 ${
                isVisible['info-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ color: foundationGreen }}
            >
              Our mission
            </p>
            <h2
              className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight transition-all duration-700 ${
                isVisible['info-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ color: foundationBrown }}
            >
              A Foundation that bridges Community and Care
            </h2>
            <div
              className={`mt-4 w-20 h-1 rounded-full mx-auto transition-all duration-700 ${
                isVisible['info-section'] ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ backgroundColor: foundationGreen }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {[
              {
                title: 'Preserving Dignity',
                body: 'We support organizations that assist people to help themselves while nurturing and preserving their self-respect.',
                color: foundationGreen,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                title: 'Strengthening Communities',
                body: 'We encourage endeavors that strengthen families and communities, with focus on self-sufficiency and community development.',
                color: foundationOrange,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                ),
              },
              {
                title: 'Serving All',
                body: 'Our programs focus on the economically disadvantaged, children and youth, seniors, and the disabled throughout Texas.',
                color: foundationBrown,
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`group relative transition-all duration-700 ${
                  isVisible['info-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
              >
                <div
                  className="h-full rounded-3xl border border-gray-200/80 bg-white p-8 md:p-10 shadow-soft transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:border-gray-200"
                  style={{ boxShadow: '0 4px 24px -4px rgba(0,0,0,0.06), 0 8px 48px -8px rgba(0,0,0,0.04)' }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl transition-opacity duration-300"
                    style={{ backgroundColor: card.color }}
                  />
                  <div className="relative flex flex-col items-center text-center">
                    <div
                      className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(145deg, ${card.color}18, ${card.color}08)`,
                        boxShadow: `0 8px 24px -4px ${card.color}30`,
                      }}
                    >
                      <svg className="h-12 w-12" style={{ color: card.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {card.icon}
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px] md:text-base">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Initiatives Slider */}
      <section
        ref={sliderSectionRef}
        id="slider-section"
        className={`py-20 md:py-28 relative overflow-hidden transition-all duration-1000 ${
          isVisible['slider-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-gray-50/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="font-main text-sm uppercase tracking-[0.2em] mb-1" style={{ color: foundationGreen }}>
                What we do
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: foundationBrown }}>
                Recent Initiatives
              </h2>
            </div>
            {slides.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous slide"
                  onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
                  className="h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 shadow-sm"
                  style={{ borderColor: foundationBrown, color: foundationBrown }}
                >
                  <span className="text-xl font-light leading-none">‹</span>
                </button>
                <button
                  aria-label="Next slide"
                  onClick={() => setCurrent((c) => (c + 1) % slides.length)}
                  className="h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border-2 shadow-sm"
                  style={{ borderColor: foundationBrown, color: foundationBrown }}
                >
                  <span className="text-xl font-light leading-none">›</span>
                </button>
              </div>
            )}
          </div>

          {eventsLoading ? (
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-soft">
              <div className="relative w-full h-80 md:h-[28rem] lg:h-[32rem] flex items-center justify-center">
                <p className="text-gray-500">Loading initiatives...</p>
              </div>
            </div>
          ) : eventsError ? (
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-soft">
              <div className="relative w-full h-80 md:h-[28rem] lg:h-[32rem] flex items-center justify-center">
                <p className="text-red-600">{eventsError}</p>
              </div>
            </div>
          ) : slides.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 shadow-soft">
              <div className="relative w-full h-80 md:h-[28rem] lg:h-[32rem] flex items-center justify-center">
                <p className="text-gray-500">No recent initiatives available at this time.</p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="relative overflow-hidden rounded-3xl border-2 border-gray-200/90 bg-white shadow-card cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:border-gray-300"
                onClick={() => {
                  if (events[current]) {
                    setSelectedEvent(events[current])
                    setShowModal(true)
                  }
                }}
              >
                <div className="relative w-full h-80 md:h-[28rem] lg:h-[32rem]">
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={slides[current].src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-cover blur-lg opacity-80"
                      aria-hidden="true"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                    <Image
                      key={current}
                      src={slides[current].src}
                      alt={slides[current].caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-contain transition-all duration-500 animate-fade-in"
                      unoptimized
                    />
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)' }}
                  >
                    <p className="text-white text-lg md:text-xl font-semibold drop-shadow-sm">
                      {slides[current].caption}
                    </p>
                    <p className="text-white/90 text-sm mt-2 inline-flex items-center gap-2">
                      Click to read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-10'
                        : 'w-2.5 hover:opacity-80'
                    }`}
                    style={{
                      backgroundColor: i === current ? foundationGreen : 'rgba(0,0,0,0.2)',
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaSectionRef}
        id="cta-section"
        className={`relative py-16 md:py-24 overflow-hidden transition-all duration-1000 ${
          isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          background: `linear-gradient(135deg, ${foundationGreen} 0%, #1B5E20 50%, ${foundationGreen} 100%)`,
          backgroundSize: '200% 200%',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationOrange} 0%, transparent 60%)`, transform: 'translate(-40%, -40%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: `radial-gradient(circle, ${foundationBrown} 0%, transparent 60%)`, transform: 'translate(40%, 40%)' }} />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Ready to make a difference?
              </h2>
              <p className="mt-4 text-white/95 text-base md:text-lg max-w-xl mx-auto md:mx-0">
                Join us as a volunteer, partner with BBF, or reach out to learn more.
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white border-2 border-white/90 hover:border-white bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-white/25"
              >
                Get in Touch
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setShowModal(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
}
