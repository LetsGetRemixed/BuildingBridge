import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export interface TeamMember {
  _id?: string
  name: string
  role: string
  linkedinLink: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
}

// Internal interface for database operations with ObjectId
interface DbTeamMember {
  _id?: ObjectId
  name: string
  role: string
  linkedinLink: string
  createdAt?: Date
  updatedAt?: Date
  createdBy?: ObjectId
}

interface GetTeamMembersParams {
  page?: number
  limit?: number
  search?: string
}

interface PaginatedTeamMembers {
  teamMembers: TeamMember[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function createTeamMember(teamMemberData: Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<TeamMember | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const teamMember: DbTeamMember = {
      name: teamMemberData.name,
      role: teamMemberData.role,
      linkedinLink: teamMemberData.linkedinLink,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: new ObjectId(userId)
    }

    const result = await teamMembers.insertOne(teamMember)
    return {
      ...teamMember,
      _id: result.insertedId.toString(),
      createdBy: userId
    }
  } catch (error) {
    console.error('Error creating team member:', error)
    throw error
  }
}

export async function getTeamMembers(params: GetTeamMembersParams = {}): Promise<PaginatedTeamMembers> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const page = params.page || 1
    const limit = params.limit || 10
    const skip = (page - 1) * limit

    const query: any = {}
    if (params.search) {
      query.$or = [
        { name: { $regex: params.search, $options: 'i' } },
        { role: { $regex: params.search, $options: 'i' } }
      ]
    }

    const total = await teamMembers.countDocuments(query)
    const teamMemberList = await teamMembers
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const formattedTeamMembers: TeamMember[] = teamMemberList.map(teamMember => ({
      ...teamMember,
      _id: teamMember._id?.toString(),
      createdBy: teamMember.createdBy?.toString()
    }))

    return {
      teamMembers: formattedTeamMembers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error getting team members:', error)
    return {
      teamMembers: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    }
  }
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const teamMemberList = await teamMembers.find({}).sort({ createdAt: -1 }).toArray()
    
    return teamMemberList.map(teamMember => ({
      ...teamMember,
      _id: teamMember._id?.toString(),
      createdBy: teamMember.createdBy?.toString()
    }))
  } catch (error) {
    console.error('Error getting all team members:', error)
    throw error
  }
}

export async function getTeamMemberById(teamMemberId: string): Promise<TeamMember | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const teamMember = await teamMembers.findOne({ _id: new ObjectId(teamMemberId) })
    if (!teamMember) return null

    return {
      ...teamMember,
      _id: teamMember._id?.toString(),
      createdBy: teamMember.createdBy?.toString()
    }
  } catch (error) {
    console.error('Error getting team member by ID:', error)
    throw error
  }
}

export async function updateTeamMember(teamMemberId: string, teamMemberData: Partial<Omit<TeamMember, '_id' | 'createdAt' | 'createdBy'>>): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const updateData: any = {
      updatedAt: new Date()
    }

    if (teamMemberData.name) updateData.name = teamMemberData.name
    if (teamMemberData.role) updateData.role = teamMemberData.role
    if (teamMemberData.linkedinLink) updateData.linkedinLink = teamMemberData.linkedinLink

    const result = await teamMembers.updateOne(
      { _id: new ObjectId(teamMemberId) },
      { $set: updateData }
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error updating team member:', error)
    throw error
  }
}

export async function deleteTeamMember(teamMemberId: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const teamMembers = db.collection<DbTeamMember>('teamMembers')

    const result = await teamMembers.deleteOne({ _id: new ObjectId(teamMemberId) })

    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting team member:', error)
    throw error
  }
}

