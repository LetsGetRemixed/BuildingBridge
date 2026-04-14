'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import EventModal from '@/components/EventModal'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

interface Partner {
  _id?: string
  name: string
  logoUrl: string
  createdAt?: Date
  updatedAt?: Date
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

export default function About() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnersLoading, setPartnersLoading] = useState(true)
  const [partnersError, setPartnersError] = useState<string | null>(null)

  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [eventsError, setEventsError] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const missionSectionRef = useRef<HTMLElement>(null)
  const pillarsSectionRef = useRef<HTMLElement>(null)
  const partnersSectionRef = useRef<HTMLElement>(null)
  const eventsSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setPartnersLoading(true)
        const response = await fetch('/api/partners')
        if (!response.ok) {
          throw new Error('Failed to fetch partners')
        }
        const data = await response.json()
        setPartners(data.partners || [])
        setPartnersError(null)
      } catch (error) {
        console.error('Error fetching partners:', error)
        setPartnersError('Failed to load partners')
        setPartners([])
      } finally {
        setPartnersLoading(false)
      }
    }

    fetchPartners()
  }, [])

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
        setRecentEvents((data.events || []).slice(0, 3))
        setEventsError(null)
      } catch (error) {
        console.error('Error fetching events:', error)
        setEventsError('Failed to load events')
        setRecentEvents([])
      } finally {
        setEventsLoading(false)
      }
    }

    fetchEvents()
  }, [])

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
      missionSectionRef.current,
      pillarsSectionRef.current,
      partnersSectionRef.current,
      eventsSectionRef.current
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bridge5.webp"
            alt=""
            fill
            className="object-cover object-[center_68%]"
            priority
            sizes="100vw"
          />
          {/* Light overlay for text readability while keeping the photo bright */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white border-b-2 border-white w-fit mx-auto pb-3" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                About Us
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Learn about our mission, values, and the people driving change.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section 
        ref={missionSectionRef}
        id="mission-section"
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          isVisible['mission-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
                Our Foundation
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              The principles that guide our work and shape our impact in the community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission Card */}
            <div className={`group relative transition-all duration-700 ${
              isVisible['mission-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.2s' }}>
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
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${foundationGreen}, ${foundationBrown})`
                  }}
                />
                <div 
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${foundationGreen}, ${foundationBrown})`
                  }}
                />
                <div className="relative z-10 pt-2">
                  <h3
                    className="text-3xl md:text-4xl font-heading font-bold mb-4 transition-colors duration-300"
                    style={{ color: foundationBrown }}
                  >
                    Our Mission
                  </h3>
                  <div className="h-1 w-16 mb-6 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: foundationGreen }} />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    The Building Bridge Foundation supports
                    organizations that improve our communities through education and empowerment.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className={`group relative transition-all duration-700 ${
              isVisible['mission-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.4s' }}>
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
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${foundationOrange}, ${foundationBrown})`
                  }}
                />
                <div 
                  className="absolute top-0 left-0 right-0 h-2 rounded-t-3xl transition-all duration-500"
                  style={{ 
                    background: `linear-gradient(90deg, ${foundationOrange}, ${foundationBrown})`
                  }}
                />
                <div className="relative z-10 pt-2">
                  <h3
                    className="text-3xl md:text-4xl font-heading font-bold mb-4 transition-colors duration-300"
                    style={{ color: foundationBrown }}
                  >
                    Our Vision
                  </h3>
                  <div className="h-1 w-16 mb-6 rounded-full transition-all duration-500 group-hover:w-24" style={{ background: foundationOrange }} />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    The Building Bridge Foundation is dedicated to
                    enriching and preserving our communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Overview */}
      <section 
        ref={pillarsSectionRef}
        id="pillars-section"
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          isVisible['pillars-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto transition-all duration-700 ${
              isVisible['pillars-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>Our Interest</h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible['pillars-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '0.1s' }}>
              Primarily, we aim to support, promote, and advance organizations focused on the following:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                title: 'Education/CTE', 
                href: '/about/pillars#education', 
                icon: '/icons/education.png',
              },
              { 
                title: 'After School Care', 
                href: '/about/pillars#families', 
                icon: '/icons/family.png',
              },
              { 
                title: 'Living Into Potential', 
                href: '/about/pillars#lifeskills', 
                icon: '/icons/life.png',
              },
              { 
                title: 'Public Good', 
                href: '/about/pillars#support', 
                icon: '/icons/housing.png',
              },
              { 
                title: 'Well-being', 
                href: '/about/pillars#community', 
                icon: '/icons/wellbeing.png',
              },
              { 
                title: 'Health', 
                href: '/about/pillars#health', 
                icon: '/icons/Health.png',
              },
              { 
                title: 'Technology', 
                href: '/about/pillars#technology', 
                icon: '/icons/Technology.png',
              },
              { 
                title: 'The Arts', 
                href: '/about/pillars#arts', 
                icon: '/icons/arts.png',
              },
            ].map((p, index) => (
              <Link 
                key={p.title} 
                href={p.href} 
                className={`block group transition-all duration-700 ${
                  isVisible['pillars-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.2 + (index * 0.1)}s` }}
              >
                <div className="relative h-full rounded-2xl p-6 md:p-8 bg-white border-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-2" 
                     style={{ 
                       borderColor: '#e5e7eb',
                       background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                     }}>
                  {/* Decorative accent */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: `linear-gradient(90deg, ${[
                        `${foundationGreen}, ${foundationBrown}`,
                        `${foundationBrown}, ${foundationOrange}`,
                        `${foundationOrange}, ${foundationGreen}`,
                        `${foundationGreen}, ${foundationOrange}`,
                        `${foundationBrown}, ${foundationGreen}`
                      ][index % 5]})`
                    }}
                  />
                  
                  {/* Icon container with enhanced styling */}
                  <div className="relative mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300" 
                         style={{ 
                           background: [foundationGreen, foundationBrown, foundationOrange, foundationGreen, foundationBrown][index % 5] || foundationBrown
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
                    <h3 className={`font-heading font-bold text-gray-900 group-hover:text-gray-800 transition-colors break-words ${
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section 
        ref={partnersSectionRef}
        id="partners-section"
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          isVisible['partners-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
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
            <div className={`inline-block mb-4 transition-all duration-700 ${
              isVisible['partners-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
                Our Partners
              </h2>
            </div>
            <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6 transition-all duration-700 ${
              isVisible['partners-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '0.1s' }}>
              Building stronger communities together through meaningful partnerships
            </p>
          </div>

          {/* Partners Grid */}
          {partnersLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading partners...</p>
            </div>
          ) : partnersError ? (
            <div className="text-center py-12">
              <p className="text-red-600">{partnersError}</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No partners available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-12">
              {partners.map((partner, idx) => (
                <div 
                  key={partner._id || idx} 
                  className={`group relative transition-all duration-700 ${
                    isVisible['partners-section'] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${0.2 + (idx * 0.05)}s` }}
                >
                  <div 
                    className="relative h-full bg-white rounded-2xl p-6 md:p-8 border-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-3 overflow-hidden"
                    style={{ 
                      borderColor: '#e5e7eb',
                      background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${foundationGreen}, ${foundationOrange})`
                      }}
                    />
                    
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: idx % 2 === 0 
                          ? `linear-gradient(90deg, ${foundationGreen}, ${foundationBrown})`
                          : `linear-gradient(90deg, ${foundationOrange}, ${foundationBrown})`
                      }}
                    />
                    
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="relative w-full h-32 sm:h-36 md:h-40 mb-4">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          unoptimized
                        />
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors">
                        {partner.name}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-block p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 shadow-lg" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                Interested in partnering?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Join us in building stronger communities. Together, we can create lasting impact and meaningful change.
              </p>
              <div
                className="inline-block rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${foundationGreen} 0%, #1B5E20 50%, ${foundationGreen} 100%)`,
                  backgroundSize: '200% 200%',
                }}
              >
                <a
                  href="mailto:info@buildingbridgefoundation.org"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg text-white border-2 border-white/90 hover:border-white bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-white/25"
                >
                  Get in Touch
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events / Initiatives */}
      <section 
        ref={eventsSectionRef}
        id="events-section"
        className={`py-16 md:py-24 relative overflow-hidden transition-all duration-1000 ${
          isVisible['events-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground1.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className={`inline-block mb-4 transition-all duration-700 ${
              isVisible['events-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
                Recent Events & Initiatives
              </h2>
            </div>
            <p className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6 transition-all duration-700 ${
              isVisible['events-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '0.1s' }}>
              See the impact we&apos;re making in our community through recent events and programs
            </p>
          </div>

          {eventsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : eventsError ? (
            <div className="text-center py-12">
              <p className="text-red-600">{eventsError}</p>
            </div>
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No recent events available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {recentEvents.map((event, idx) => {
                // Format date for display
                const eventDate = new Date(event.date)
                const formattedDate = eventDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })

                return (
                  <div
                    key={event._id || idx}
                    className={`group relative cursor-pointer transition-all duration-700 ${
                      isVisible['events-section'] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{ transitionDelay: `${0.2 + (idx * 0.1)}s` }}
                    onClick={() => {
                      setSelectedEvent(event)
                      setShowModal(true)
                    }}
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{ borderColor: '#e5e7eb' }}>
                      {/* Image */}
                      <div className="relative w-full h-64 overflow-hidden bg-gray-50">
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover blur-md opacity-90 scale-100 transition-transform duration-300 group-hover:scale-110"
                            aria-hidden="true"
                            unoptimized
                          />
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                          />
                        </div>
                        {/* Date badge */}
                        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                          <span className="text-xs font-semibold" style={{ color: foundationBrown }}>
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 group-hover:opacity-90 transition-opacity" style={{ color: foundationBrown }}>
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                        <div className="mt-4 flex items-center text-sm font-semibold" style={{ color: foundationGreen }}>
                          <span className="group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center">
                            Read more
                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
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

