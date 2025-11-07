import { NextResponse } from 'next/server'

export async function GET() {
  // Return all environment variables (be careful in production!)
  const envVars = {
    MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'NOT SET',
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'SET' : 'NOT SET',
    // Don't expose actual values for security
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('MONGODB') || 
      key.includes('JWT') || 
      key.includes('FIREBASE')
    ),
    totalEnvKeys: Object.keys(process.env).length,
    nodeEnv: process.env.NODE_ENV
  }
  
  return NextResponse.json(envVars)
}


