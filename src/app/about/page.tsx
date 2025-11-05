'use client'

import Link from 'next/link'
import Image from 'next/image'

const foundationGreen = '#2E7D32'
const foundationBrown = '#6D4C41'
const foundationOrange = '#EF6C00'

export default function About() {
  const partners = [
    { src: '/partnerships/christianministries.png', name: 'Christian Ministries' },
    { src: '/partnerships/Connections.png', name: 'Connections' },
    { src: '/partnerships/ednabusinessassociation.png', name: 'Edna Business Association' },
    { src: '/partnerships/food-bank-logo.png', name: 'Food Bank' },
    { src: '/partnerships/palacios.png', name: 'Palacios' },
  ]

  const recentEvents = [
    {
      image: '/images/BBF 4.JPG',
      caption: 'Back-to-School Supply Drive',
      date: 'August 2024',
      description: 'Providing essential school supplies to over 200 students in the community.'
    },
    {
      image: '/images/BBF 5.JPG',
      caption: 'Community Mentorship Event',
      date: 'July 2024',
      description: 'Connecting youth with mentors for guidance and support in personal and academic growth.'
    },
    {
      image: '/images/BBF 3.jpg',
      caption: 'Weekend Learning Workshop',
      date: 'June 2024',
      description: 'Interactive workshops focusing on life skills, financial literacy, and career development.'
    },
  ]

  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Board of Directors',
      bio: 'Our dedicated board members bring decades of combined experience in education, community development, and nonprofit management.',
      image: '/images/BBF 4.JPG', // Placeholder - replace with actual headshots
    },
    // Add more team members as needed
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aboutheader.png"
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
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white border-b-2 border-white w-fit mx-auto pb-3">
                About Us
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6">
              Building bridges, strengthening communities. Learn about our mission, values, and the people driving change.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
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
            <div className="group relative">
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
                <div className="relative mb-6">
                  <div className="relative inline-flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                      style={{ 
                        background: foundationGreen,
                        transform: 'scale(1.5)'
                      }}
                    />
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
      <section id="pillars" className="py-16 md:py-24 relative overflow-hidden">
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
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>Our Pillars</h2>
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

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 md:py-24 relative overflow-hidden">
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
                Our Partners
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              Building stronger communities together through meaningful partnerships
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 mb-12">
            {partners.map((partner, idx) => (
              <div key={idx} className="group relative">
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
                        src={partner.src}
                        alt={partner.name}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
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

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="inline-block p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 shadow-lg" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4" style={{ color: foundationBrown }}>
                Interested in partnering?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Join us in building stronger communities. Together, we can create lasting impact and meaningful change.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: foundationGreen }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events / Initiatives */}
      <section id="events" className="py-16 md:py-24 relative overflow-hidden">
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
            <div className="inline-block mb-4">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
                Recent Events & Initiatives
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              See the impact we&apos;re making in our community through recent events and programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {recentEvents.map((event, idx) => (
              <div key={idx} className="group relative">
                <div className="relative h-full rounded-2xl overflow-hidden bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{ borderColor: '#e5e7eb' }}>
                  {/* Image */}
                  <div className="relative w-full h-64 overflow-hidden bg-gray-50">
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={event.image}
                        alt={event.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover blur-md opacity-90 scale-100"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <Image
                        src={event.image}
                        alt={event.caption}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                    {/* Date badge */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
                      <span className="text-xs font-semibold" style={{ color: foundationBrown }}>
                        {event.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-2" style={{ color: foundationBrown }}>
                      {event.caption}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section (Optional) */}
      {teamMembers.length > 0 && (
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
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 pb-3 w-fit mx-auto" style={{ color: foundationBrown, borderBottom: `3px solid ${foundationGreen}` }}>
                  Meet Our Team
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
                The dedicated individuals who drive our mission forward
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="group relative">
                  <div className="relative h-full rounded-2xl p-8 bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                       style={{ 
                         borderColor: '#e5e7eb',
                         background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
                       }}>
                    {/* Headshot */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-md" style={{ borderColor: foundationGreen }}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-heading text-xl md:text-2xl font-bold mb-2" style={{ color: foundationBrown }}>
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base font-semibold mb-4" style={{ color: foundationOrange }}>
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

