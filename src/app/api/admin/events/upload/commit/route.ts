import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { adminStorage, getAdminBucket } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
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

    if (!adminStorage) {
      return NextResponse.json({
        error: 'Firebase Admin not initialized. Please configure service account credentials.'
      }, { status: 500 })
    }

    const { filePath } = await request.json()

    if (!filePath || typeof filePath !== 'string' || !filePath.startsWith('events/')) {
      return NextResponse.json({ error: 'Invalid filePath' }, { status: 400 })
    }

    const bucket = getAdminBucket()
    const file = bucket.file(filePath)
    const [exists] = await file.exists()

    if (!exists) {
      return NextResponse.json({ error: 'Uploaded file not found' }, { status: 400 })
    }

    await file.makePublic()
    try {
      await file.setMetadata({ cacheControl: 'no-cache, max-age=0' })
    } catch (err) {
      console.warn('Failed to set cacheControl metadata for', filePath, err)
    }

    const [meta] = await file.getMetadata()
    const generation = meta?.generation ?? ''

    const baseUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURI(filePath)}`
    const publicUrl = generation ? `${baseUrl}?v=${generation}` : baseUrl

    return NextResponse.json({
      publicUrl,
      filePath,
      generation
    })
  } catch (error: any) {
    console.error('Error committing uploaded image:', error)
    return NextResponse.json({
      error: error.message || 'Failed to finalize uploaded image'
    }, { status: 500 })
  }
}

