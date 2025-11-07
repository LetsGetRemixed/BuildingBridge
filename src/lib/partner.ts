import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export interface Partner {
  _id?: string
  name: string
  logoUrl: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
}

// Internal interface for database operations with ObjectId
interface DbPartner {
  _id?: ObjectId
  name: string
  logoUrl: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: ObjectId
}

export async function createPartner(partnerData: Omit<Partner, '_id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Partner | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const partners = db.collection<DbPartner>('partners')

    const partner: DbPartner = {
      name: partnerData.name,
      logoUrl: partnerData.logoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectId(userId)
    }

    const result = await partners.insertOne(partner)
    return {
      ...partner,
      _id: result.insertedId.toString(),
      createdBy: userId
    }
  } catch (error) {
    console.error('Error creating partner:', error)
    throw error
  }
}

export async function getAllPartners(): Promise<Partner[]> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const partners = db.collection<DbPartner>('partners')

    const partnerList = await partners.find({}).sort({ createdAt: -1 }).toArray()
    
    return partnerList.map(partner => ({
      ...partner,
      _id: partner._id?.toString(),
      createdBy: partner.createdBy?.toString()
    }))
  } catch (error) {
    console.error('Error getting all partners:', error)
    throw error
  }
}

export async function getPartnerById(partnerId: string): Promise<Partner | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const partners = db.collection<DbPartner>('partners')

    const partner = await partners.findOne({ _id: new ObjectId(partnerId) })
    if (!partner) return null

    return {
      ...partner,
      _id: partner._id?.toString(),
      createdBy: partner.createdBy?.toString()
    }
  } catch (error) {
    console.error('Error getting partner by ID:', error)
    throw error
  }
}

export async function updatePartner(partnerId: string, partnerData: Partial<Omit<Partner, '_id' | 'createdAt' | 'createdBy'>>): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const partners = db.collection<DbPartner>('partners')

    const updateData: any = {
      updatedAt: new Date()
    }

    if (partnerData.name) updateData.name = partnerData.name
    if (partnerData.logoUrl) updateData.logoUrl = partnerData.logoUrl

    const result = await partners.updateOne(
      { _id: new ObjectId(partnerId) },
      { $set: updateData }
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error updating partner:', error)
    throw error
  }
}

export async function deletePartner(partnerId: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const partners = db.collection<DbPartner>('partners')

    const result = await partners.deleteOne({ _id: new ObjectId(partnerId) })

    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting partner:', error)
    throw error
  }
}

