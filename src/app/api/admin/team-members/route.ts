import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { findUserByEmail } from '@/lib/user'
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/team-member'

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

    const result = await getTeamMembers({ page, limit, search })
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { name, role, linkedinLink } = await request.json()

    if (!name || !role || !linkedinLink) {
      return NextResponse.json({ error: 'Name, role, and LinkedIn link are required' }, { status: 400 })
    }

    // Validate LinkedIn URL format
    const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/.+/i
    if (!linkedinUrlPattern.test(linkedinLink)) {
      return NextResponse.json({ error: 'Invalid LinkedIn URL format' }, { status: 400 })
    }

    const newTeamMember = await createTeamMember({ name, role, linkedinLink }, auth.user!._id!)
    if (!newTeamMember) {
      return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
    }

    return NextResponse.json(newTeamMember, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { teamMemberId, name, role, linkedinLink } = await request.json()

    if (!teamMemberId || (!name && !role && !linkedinLink)) {
      return NextResponse.json({ error: 'Team member ID and at least one field (name, role, or linkedinLink) are required' }, { status: 400 })
    }

    // Validate LinkedIn URL format if provided
    if (linkedinLink) {
      const linkedinUrlPattern = /^https?:\/\/(www\.)?linkedin\.com\/.+/i
      if (!linkedinUrlPattern.test(linkedinLink)) {
        return NextResponse.json({ error: 'Invalid LinkedIn URL format' }, { status: 400 })
      }
    }

    const updated = await updateTeamMember(teamMemberId, { name, role, linkedinLink })
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update team member or team member not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Team member updated successfully' })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdmin(request)
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    const { searchParams } = new URL(request.url)
    const teamMemberId = searchParams.get('teamMemberId')

    if (!teamMemberId) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 })
    }

    const deleted = await deleteTeamMember(teamMemberId)
    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete team member or team member not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
  }
}

