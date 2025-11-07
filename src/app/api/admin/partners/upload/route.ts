import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { adminStorage } from '@/lib/firebase-admin'

// Server-side file upload to Firebase Storage
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

    // Parse FormData
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `partners/${timestamp}_${file.name}`

    // Upload to Firebase Storage
    const bucket = adminStorage.bucket()
    const fileRef = bucket.file(fileName)

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000',
      },
    })

    // Make file publicly accessible
    await fileRef.makePublic()

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error('Error uploading partner logo:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}



