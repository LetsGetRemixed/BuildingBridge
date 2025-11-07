'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Event {
  _id?: string
  title: string
  description: string
  date: string
  imageUrl: string
  location?: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Filters and search
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
    location: '',
    category: ''
  })
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      })

      const response = await fetch(`/api/admin/events?${params}`, {
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
        throw new Error('Failed to fetch events')
      }

      const data = await response.json()
      setEvents(data.events || [])
      setPagination(prev => data.pagination || prev)
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to load events')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, startDate, endDate])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error('No image file selected')
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB')
    }

    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Authentication required')
    }

    const contentType = imageFile.type || 'application/octet-stream'

    const signedResponse = await fetch('/api/admin/events/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fileName: imageFile.name,
        contentType
      })
    })

    if (!signedResponse.ok) {
      const data = await signedResponse.json()
      throw new Error(data.error || 'Failed to create upload URL')
    }

    const { uploadUrl, filePath, publicUrl } = await signedResponse.json()

    const uploadHeaders: Record<string, string> = {
      'Content-Type': contentType
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: uploadHeaders,
      body: imageFile
    })

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image to storage')
    }

    const commitResponse = await fetch('/api/admin/events/upload/commit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ filePath })
    })

    if (!commitResponse.ok) {
      const data = await commitResponse.json()
      throw new Error(data.error || 'Failed to finalize image upload')
    }

    const commitData = await commitResponse.json()
    return commitData.publicUrl || publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.date) {
      setError('Title, description, and date are required')
      return
    }

    try {
      setUploading(true)
      setError('')

      let imageUrl = formData.imageUrl

      // Upload new image if file selected
      if (imageFile) {
        imageUrl = await uploadImage()
      }

      if (!imageUrl && !editingEvent) {
        setError('Image is required for new events')
        setUploading(false)
        return
      }

      const token = localStorage.getItem('token')
      const url = editingEvent 
        ? '/api/admin/events'
        : '/api/admin/events'
      
      const method = editingEvent ? 'PUT' : 'POST'
      const body = editingEvent
        ? {
            eventId: editingEvent._id,
            ...formData,
            imageUrl
          }
        : {
            ...formData,
            imageUrl
          }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save event')
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        date: '',
        imageUrl: '',
        location: '',
        category: ''
      })
      setImageFile(null)
      setImagePreview('')
      setEditingEvent(null)
      setShowModal(false)
      
      // Refresh events list
      fetchEvents()
    } catch (error: any) {
      console.error('Error saving event:', error)
      setError(error.message || 'Failed to save event')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      imageUrl: event.imageUrl,
      location: event.location || '',
      category: event.category || ''
    })
    setImagePreview(event.imageUrl)
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/events?eventId=${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete event')
      }

      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      setError('Failed to delete event')
    }
  }

  const handleCreate = () => {
    setEditingEvent(null)
    setFormData({
      title: '',
      description: '',
      date: '',
      imageUrl: '',
      location: '',
      category: ''
    })
    setImageFile(null)
    setImagePreview('')
    setError('')
    setShowModal(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleClearFilters = () => {
    setSearch('')
    setStartDate('')
    setEndDate('')
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  if (loading && events.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
          <p className="text-gray-600">Create, edit, and manage events</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Events List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.imageUrl && (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded"
                        unoptimized
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.location || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.category || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= pagination.totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        pagination.page === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page >= pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date *</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                          type="text"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Workshop, Drive, etc."
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Event location"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image {!editingEvent && '*'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingEvent}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="h-32 w-32 object-cover rounded"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingEvent(null)
                      setFormData({
                        title: '',
                        description: '',
                        date: '',
                        imageUrl: '',
                        location: '',
                        category: ''
                      })
                      setImageFile(null)
                      setImagePreview('')
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

