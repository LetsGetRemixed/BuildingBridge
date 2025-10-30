'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  id: string
  email: string
  role?: 'user' | 'admin'
}

export default function Footer() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [])

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">
              © 2024 Vercel Template. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            {user && user.role === 'admin' && (
              <Link
                href="/admin"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            {/* Sign Up removed */}
          </div>
        </div>
      </div>
    </footer>
  )
}
