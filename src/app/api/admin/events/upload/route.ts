import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { adminStorage, getAdminBucket } from '@/lib/firebase-admin'
import { randomUUID } from 'crypto'

// Request a signed upload URL for Firebase Storage (GCS)
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

    const { contentType, fileName } = await request.json()

    if (!contentType || typeof contentType !== 'string' || !contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid or missing image contentType' }, { status: 400 })
    }

    const safeBaseName = typeof fileName === 'string' && fileName.trim().length > 0
      ? fileName.trim().toLowerCase().replace(/[^a-z0-9.\-_]/g, '_')
      : `image_${Date.now()}`

    const allowedExt = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg'])
    const extFromName = safeBaseName.includes('.') ? (safeBaseName.split('.').pop() || '').toLowerCase() : ''
    const extensionMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
      'image/tiff': 'tiff',
      'image/svg+xml': 'svg'
    }
    const typeExt = extensionMap[contentType] || (contentType.split('/').pop() || '').toLowerCase() || 'jpg'
    const candidateExt = extFromName && allowedExt.has(extFromName) ? extFromName : typeExt
    const safeExt = allowedExt.has(candidateExt) ? candidateExt : 'jpg'

    const uniqueId = `${Date.now()}-${randomUUID()}`
    const filePath = `events/${uniqueId}.${safeExt}`

    const bucket = getAdminBucket()
    const file = bucket.file(filePath)

    const expires = Date.now() + 15 * 60 * 1000 // 15 minutes
    const [uploadUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires,
      contentType
    })

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURI(filePath)}`

    return NextResponse.json({
      uploadUrl,
      filePath,
      publicUrl,
      expiresAt: new Date(expires).toISOString()
    })
  } catch (error: any) {
    console.error('Error creating signed upload URL:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to create signed upload URL' 
    }, { status: 500 })
  }
}

