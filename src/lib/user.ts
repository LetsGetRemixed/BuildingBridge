import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export interface User {
  _id?: string
  email: string
  password: string
  role?: 'user' | 'admin'
  createdAt?: Date
}

// Internal interface for database operations with ObjectId
interface DbUser {
  _id?: ObjectId
  email: string
  password: string
  role?: 'user' | 'admin'
  createdAt?: Date
}

export async function createUser(email: string, password: string): Promise<User | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const users = db.collection<DbUser>('users')

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return null // User already exists
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user: DbUser = {
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    }

    const result = await users.insertOne(user)
    return { ...user, _id: result.insertedId.toString() }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const users = db.collection<DbUser>('users')

    const user = await users.findOne({ email })
    if (!user) return null
    
    return {
      ...user,
      _id: user._id?.toString()
    }
  } catch (error) {
    console.error('Error finding user:', error)
    // Re-throw the error so callers can distinguish between "user not found" and "database error"
    throw error
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const users = db.collection<DbUser>('users')

    const userList = await users.find({}, { projection: { password: 0 } }).toArray()
    
    // Convert ObjectId to string
    return userList.map(user => ({
      ...user,
      _id: user._id?.toString()
    }))
  } catch (error) {
    console.error('Error getting all users:', error)
    return []
  }
}

export async function updateUserRole(userId: string, role: 'user' | 'admin'): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const users = db.collection<DbUser>('users')

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role } }
    )

    return result.modifiedCount > 0
  } catch (error) {
    console.error('Error updating user role:', error)
    return false
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db('vercel-template')
    const users = db.collection<DbUser>('users')

    const result = await users.deleteOne({ _id: new ObjectId(userId) })

    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting user:', error)
    return false
  }
}
