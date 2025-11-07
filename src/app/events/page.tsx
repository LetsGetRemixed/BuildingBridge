'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import EventModal from '@/components/EventModal'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data.events || [])
        setError(null)
      } catch (error) {
        console.error('Error fetching events:', error)
        setError('Failed to load events')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const formatDate = (date: Date | string) => {
    const eventDate = new Date(date)
    return eventDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutheader.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white border-b-2 border-white w-fit mx-auto pb-3">
                Events & Initiatives
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6">
              Discover our community events and initiatives that make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mainbackground2.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No events available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {events.map((event) => {
                const eventDate = new Date(event.date)
                const formattedDate = eventDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })

                return (
                  <div
                    key={event._id}
                    onClick={() => handleEventClick(event)}
                    className="group relative cursor-pointer"
                  >
                    <div className="relative h-full rounded-2xl overflow-hidden bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{ borderColor: '#e5e7eb' }}>
                      {/* Image */}
                      <div className="relative w-full h-64 overflow-hidden bg-gray-50">
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                        {/* Category badge */}
                        {event.category && (
                          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                            <span className="text-xs font-semibold" style={{ color: foundationGreen }}>
                              {event.category}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 group-hover:opacity-90 transition-opacity" style={{ color: foundationBrown }}>
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                        {event.location && (
                          <p className="text-gray-500 text-sm mt-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </p>
                        )}
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

