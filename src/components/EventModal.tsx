'use client'

import { useEffect } from 'react'
import Image from 'next/image'

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

interface EventModalProps {
  event: Event
  onClose: () => void
}

export default function EventModal({ event, onClose }: EventModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const formatDate = (date: Date | string) => {
    const eventDate = new Date(date)
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white">
            {/* Image Section */}
            <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gray-50">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                unoptimized
              />
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Section */}
            <div className="px-6 py-6 sm:px-8 sm:py-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: foundationBrown }}>
                      {event.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" style={{ color: foundationGreen }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" style={{ color: foundationOrange }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium">{event.location}</span>
                        </div>
                      )}
                      {event.category && (
                        <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${foundationGreen}15`, color: foundationGreen }}>
                          {event.category}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none">
                <div className="h-px w-full mb-6" style={{ background: `linear-gradient(90deg, ${foundationGreen}, ${foundationOrange})` }} />
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: foundationGreen }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



