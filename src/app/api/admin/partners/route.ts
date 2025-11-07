import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { getAllPartners, createPartner, updatePartner, deletePartner, getPartnerById } from '@/lib/partner'

// Helper function to verify admin authentication
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401, user: null }
  }

  const token = authHeader.substring(7)
  const decoded = verifyToken(token)
  
  if (!decoded) {
    return { error: 'Invalid token', status: 401, user: null }
  }

  const user = await findUserByEmail(decoded.email)
  if (!user || user.role !== 'admin') {
    return { error: 'Admin access required', status: 403, user: null }
  }

  return { error: null, status: 0, user }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const partners = await getAllPartners()
    return NextResponse.json({ partners })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const body = await request.json()
    const { name, logoUrl } = body

    if (!name || !logoUrl) {
      return NextResponse.json(
        { error: 'Name and logo URL are required' },
        { status: 400 }
      )
    }

    const partner = await createPartner(
      { name, logoUrl },
      auth.user!._id!
    )

    if (!partner) {
      return NextResponse.json(
        { error: 'Failed to create partner' },
        { status: 500 }
      )
    }

    return NextResponse.json({ partner }, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const body = await request.json()
    const { partnerId, name, logoUrl } = body

    if (!partnerId) {
      return NextResponse.json(
        { error: 'Partner ID is required' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (logoUrl) updateData.logoUrl = logoUrl

    const success = await updatePartner(partnerId, updateData)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update partner' },
        { status: 500 }
      )
    }

    const updatedPartner = await getPartnerById(partnerId)
    return NextResponse.json({ partner: updatedPartner })
  } catch (error) {
    console.error('Error updating partner:', error)
    return NextResponse.json(
      { error: 'Failed to update partner' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get('partnerId')

    if (!partnerId) {
      return NextResponse.json(
        { error: 'Partner ID is required' },
        { status: 400 }
      )
    }

    const success = await deletePartner(partnerId)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete partner' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Partner deleted successfully' })
  } catch (error) {
    console.error('Error deleting partner:', error)
    return NextResponse.json(
      { error: 'Failed to delete partner' },
      { status: 500 }
    )
  }
}

