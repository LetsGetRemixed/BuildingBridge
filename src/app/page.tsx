'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HealthResponse {
  connected: boolean
  timestamp: string
  error?: string
}

interface User {
  id: string
  email: string
  role?: 'user' | 'admin'
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    const checkConnection = async () => {
      try {
        const response = await fetch('/api/health')
        const data: HealthResponse = await response.json()
        setIsConnected(data.connected)
      } catch (error) {
        console.error('Failed to check MongoDB connection:', error)
        setIsConnected(false)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to Vercel Template
        </h1>
        
        {user ? (
          <div className="mb-8">
            <p className="text-2xl text-green-600 dark:text-green-400 font-semibold mb-4">
              Hello {user.email}!
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              A simple Next.js app with MongoDB backend
            </p>
            <div className="space-x-4">
              <Link
                href="/auth/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Database Status
          </h2>
          
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">Checking connection...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {isConnected ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-medium">Connected to MongoDB</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-medium">Not connected to MongoDB</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>This app will automatically check the MongoDB connection status.</p>
          <p>Make sure to set your MONGODB_URI environment variable in Vercel.</p>
        </div>
      </div>
    </div>
  )
}
