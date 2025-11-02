import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '@/lib/event'

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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || undefined
    const startDate = searchParams.get('startDate') || undefined
    const endDate = searchParams.get('endDate') || undefined

    const result = await getEvents({
      page,
      limit,
      search,
      startDate,
      endDate
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error getting events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const body = await request.json()
    const { title, description, date, imageUrl, location, category } = body

    // Validation
    if (!title || !description || !date || !imageUrl) {
      return NextResponse.json(
        { error: 'Title, description, date, and imageUrl are required' },
        { status: 400 }
      )
    }

    const event = await createEvent(
      {
        title,
        description,
        date,
        imageUrl,
        location,
        category
      },
      auth.user!._id!
    )

    if (!event) {
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Event created successfully',
      event
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const body = await request.json()
    const { eventId, title, description, date, imageUrl, location, category } = body

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    // Check if event exists
    const existingEvent = await getEventById(eventId)
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (date !== undefined) updateData.date = date
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (location !== undefined) updateData.location = location
    if (category !== undefined) updateData.category = category

    const success = await updateEvent(eventId, updateData)

    if (!success) {
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }

    const updatedEvent = await getEventById(eventId)
    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    // Check if event exists
    const existingEvent = await getEventById(eventId)
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // TODO: Delete image from Firebase Storage if needed
    // For now, we'll just delete from MongoDB
    
    const success = await deleteEvent(eventId)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

