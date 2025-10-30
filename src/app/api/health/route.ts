import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/mongodb'

export async function GET() {
  try {
    const isConnected = await testConnection()
    return NextResponse.json({ 
      connected: isConnected,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ 
      connected: false,
      error: 'Failed to check connection',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
