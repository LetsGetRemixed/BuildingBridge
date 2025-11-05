import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, verifyPassword } from '@/lib/user'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    let user
    try {
      user = await findUserByEmail(email)
    } catch (dbError: any) {
      console.error('Database error in findUserByEmail:', dbError)
      // Log more details for debugging
      console.error('MongoDB URI configured:', !!process.env.MONGODB_URI)
      console.error('Error details:', dbError.message || String(dbError))
      return NextResponse.json(
        { 
          error: 'Database connection error', 
          message: dbError.message || 'Failed to connect to database',
          details: process.env.NODE_ENV === 'development' ? String(dbError) : undefined 
        },
        { status: 500 }
      )
    }
    
    if (!user) {
      console.log(`Login attempt failed: User not found for email ${email}`)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    
    if (!isValidPassword) {
      console.log(`Login attempt failed: Invalid password for email ${email}`)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    let token
    try {
      token = generateToken({
        userId: user._id!,
        email: user.email,
        role: user.role || 'user'
      })
    } catch (tokenError) {
      console.error('JWT generation error:', tokenError)
      return NextResponse.json(
        { error: 'Token generation failed' },
        { status: 500 }
      )
    }

    // Return success response with token
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || 'user'
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? String(error) : undefined },
      { status: 500 }
    )
  }
}
