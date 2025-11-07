import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { adminStorage, getAdminBucket } from '@/lib/firebase-admin'
import { Buffer } from 'buffer'

export const runtime = 'nodejs'

// Handle multipart uploads directly via Firebase Admin SDK
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await findUserByEmail(decoded.email)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Check if Firebase Admin Storage is initialized
    if (!adminStorage) {
      return NextResponse.json({ 
        error: 'Firebase Admin not initialized. Please configure service account credentials.' 
      }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const sanitizedName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '_')
    const timestamp = Date.now()
    const filePath = `events/${timestamp}_${sanitizedName}`

    const bucket = getAdminBucket()
    const fileRef = bucket.file(filePath)

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    })

    await fileRef.makePublic()

    try {
      await fileRef.setMetadata({ cacheControl: 'no-cache, max-age=0' })
    } catch (_) {
      // Non-fatal
    }

    const [meta] = await fileRef.getMetadata()
    const generation = meta?.generation ?? ''

    const baseUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURI(filePath)}`
    const downloadURL = generation ? `${baseUrl}?v=${generation}` : baseUrl

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: downloadURL,
      fileName: filePath
    })
  } catch (error: any) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 })
  }
}

