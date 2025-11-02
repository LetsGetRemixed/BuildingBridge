import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export interface Event {
  _id?: string
  title: string
  description: string
  date: Date | string
  imageUrl: string
  location?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
}

// Internal interface for database operations with ObjectId
interface DbEvent {
  _id?: ObjectId
  title: string
  description: string
  date: Date
  imageUrl: string
  location?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: ObjectId
}

interface GetEventsParams {
  page?: number
  limit?: number
  search?: string
  startDate?: string
  endDate?: string
}

interface PaginatedEvents {
  events: Event[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function createEvent(eventData: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Event | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const events = db.collection<DbEvent>('events')

    const event: DbEvent = {
      title: eventData.title,
      description: eventData.description,
      date: new Date(eventData.date),
      imageUrl: eventData.imageUrl,
      location: eventData.location,
      category: eventData.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectId(userId)
    }

    const result = await events.insertOne(event)
    return {
      ...event,
      _id: result.insertedId.toString(),
      createdBy: userId
    }
  } catch (error) {
    console.error('Error creating event:', error)
    return null
  }
}

export async function getEvents(params: GetEventsParams = {}): Promise<PaginatedEvents> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const events = db.collection<DbEvent>('events')

    const page = params.page || 1
    const limit = params.limit || 10
    const skip = (page - 1) * limit

    // Build query
    const query: any = {}

    // Search filter
    if (params.search) {
      query.$or = [
        { title: { $regex: params.search, $options: 'i' } },
        { description: { $regex: params.search, $options: 'i' } }
      ]
    }

    // Date range filter
    if (params.startDate || params.endDate) {
      query.date = {}
      if (params.startDate) {
        query.date.$gte = new Date(params.startDate)
      }
      if (params.endDate) {
        query.date.$lte = new Date(params.endDate)
      }
    }

    // Get total count
    const total = await events.countDocuments(query)

    // Get events
    const eventList = await events
      .find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Convert ObjectId to string
    const formattedEvents: Event[] = eventList.map(event => ({
      ...event,
      _id: event._id?.toString(),
      date: event.date.toISOString(),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      createdBy: event.createdBy?.toString()
    }))

    return {
      events: formattedEvents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error getting events:', error)
    return {
      events: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    }
  }
}

export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const events = db.collection<DbEvent>('events')

    const event = await events.findOne({ _id: new ObjectId(eventId) })
    if (!event) return null

    return {
      ...event,
      _id: event._id?.toString(),
      date: event.date.toISOString(),
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      createdBy: event.createdBy?.toString()
    }
  } catch (error) {
    console.error('Error getting event by ID:', error)
    return null
  }
}

export async function updateEvent(eventId: string, eventData: Partial<Omit<Event, '_id' | 'createdAt' | 'createdBy'>>): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const events = db.collection<DbEvent>('events')

    const updateData: any = {
      updatedAt: new Date()
    }

    if (eventData.title) updateData.title = eventData.title
    if (eventData.description) updateData.description = eventData.description
    if (eventData.date) updateData.date = new Date(eventData.date)
    if (eventData.imageUrl) updateData.imageUrl = eventData.imageUrl
    if (eventData.location !== undefined) updateData.location = eventData.location
    if (eventData.category !== undefined) updateData.category = eventData.category

    const result = await events.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error updating event:', error)
    return false
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const events = db.collection<DbEvent>('events')

    const result = await events.deleteOne({ _id: new ObjectId(eventId) })

    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting event:', error)
    return false
  }
}

