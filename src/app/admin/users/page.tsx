'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface User {
  _id: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [createForm, setCreateForm] = useState({ email: '', password: '' })
  const [creating, setCreating] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; email: string; currentRole: string; newRole: string } | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchUsers()
    
    // Check if we should show create form
    if (searchParams.get('action') === 'create') {
      setShowCreateForm(true)
    }
  }, [searchParams])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
        return
      }

      if (response.status === 403) {
        setError('Admin access required')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = (userId: string, currentRole: string, newRole: string, userEmail: string) => {
    if (currentRole === newRole) return // No change needed
    
    setSelectedUser({
      id: userId,
      email: userEmail,
      currentRole,
      newRole
    })
    setShowRoleModal(true)
  }

  const confirmRoleUpdate = async () => {
    if (!selectedUser) return

    setUpdating(selectedUser.id)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: selectedUser.id, role: selectedUser.newRole as 'user' | 'admin' })
      })

      if (!response.ok) {
        throw new Error('Failed to update user role')
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === selectedUser.id ? { ...user, role: selectedUser.newRole as 'user' | 'admin' } : user
      ))
      
      // Close modal
      setShowRoleModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error updating user role:', error)
      setError('Failed to update user role')
    } finally {
      setUpdating(null)
    }
  }

  const deleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete user "${userEmail}"? This action cannot be undone.`)) {
      return
    }

    setDeleting(userId)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      })

      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      // Remove user from local state
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
      setError('Failed to delete user')
    } finally {
      setDeleting(null)
    }
  }

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createForm)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create user')
      }

      const data = await response.json()
      
      // Add new user to local state
      setUsers([...users, data.user])
      
      // Reset form
      setCreateForm({ email: '', password: '' })
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error creating user:', error)
      setError(error instanceof Error ? error.message : 'Failed to create user')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error && !showCreateForm) {
    return (
      <div className="text-center">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <button
          onClick={() => setError('')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New User
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Create New User
            </h3>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength={6}
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 bg-white"
                  placeholder="Minimum 6 characters"
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create User'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false)
                    setCreateForm({ email: '', password: '' })
                    setError('')
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            All Users ({users.length})
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage user roles and delete accounts
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user._id}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, user.role, e.target.value, user.email)}
                      disabled={updating === user._id}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button
                    onClick={() => deleteUser(user._id, user.email)}
                    disabled={deleting === user._id}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm disabled:opacity-50"
                  >
                    {deleting === user._id ? 'Deleting...' : 'Delete'}
                  </button>
                  {updating === user._id && (
                    <div className="text-sm text-gray-500">Updating...</div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Role Change Confirmation Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Confirm Role Change
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to change <strong>{selectedUser.email}</strong>&apos;s role from{' '}
                  <span className="font-semibold text-blue-600">{selectedUser.currentRole}</span> to{' '}
                  <span className="font-semibold text-green-600">{selectedUser.newRole}</span>?
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  This will immediately affect their access permissions.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <div className="flex space-x-3">
                  <button
                    onClick={confirmRoleUpdate}
                    disabled={updating === selectedUser.id}
                    className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {updating === selectedUser.id ? 'Updating...' : 'Confirm Change'}
                  </button>
                  <button
                    onClick={() => {
                      setShowRoleModal(false)
                      setSelectedUser(null)
                    }}
                    disabled={updating === selectedUser.id}
                    className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
