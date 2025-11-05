import { NextResponse } from 'next/server'
import { testConnection } from '@/lib/mongodb'

export async function GET() {
  const checks = {
    mongodb: false,
    jwtSecret: !!process.env.JWT_SECRET,
    mongodbUri: !!process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }

  try {
    checks.mongodb = await testConnection()
  } catch (error) {
    console.error('Health check error:', error)
  }
  
  const isHealthy = checks.mongodb && checks.jwtSecret && checks.mongodbUri
  
  return NextResponse.json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString()
  }, {
    status: isHealthy ? 200 : 503
  })
}
