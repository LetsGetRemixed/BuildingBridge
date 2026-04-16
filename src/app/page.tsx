'use client'

import { useEffect, useState, useRef } from 'react'
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
      sliderSectionRef.current
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
          backgroundImage: "url('/images/bridge3.webp')",
          backgroundSize: '120% 120%',
          backgroundPosition: '20% center',
        }}
      >
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

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
                    src="/logo1.png"
                    alt="Building Bridge Foundation"
                    width={800}
                    height={800}
                    priority
                    className="max-w-[260px] md:max-w-[320px] w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1
            className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            Helping People Cross Gaps They Couldn&apos;t Cross Alone
          </h1>
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
                title: 'Strengthening Communities',
                body: 'We encourage endeavors that strengthen families and communities, with focus on self-sufficiency and community development.',
                color: foundationOrange,
              },
              {
                title: 'Preserving Dignity',
                body: 'We support organizations that assist people to help themselves while nurturing and preserving their self-respect.',
                color: foundationGreen,
              },
              {
                title: 'Serving Others',
                body: 'Our programs focus on the economically disadvantaged, children and youth, seniors, and the disabled throughout Texas.',
                color: foundationBrown,
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
                  <div className="relative flex flex-col items-center text-center pt-2">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold mb-5" style={{ color: foundationBrown }}>
                      {card.title === 'Serving Others' ? (
                        <>
                          Serving
                          <br />
                          Others
                        </>
                      ) : (
                        card.title
                      )}
                    </h3>
                    <div
                      className="h-1 w-12 rounded-full mb-5"
                      style={{ backgroundColor: card.color }}
                    />
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
