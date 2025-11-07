'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Partner {
  _id?: string
  name: string
  logoUrl: string
  createdAt?: string
  updatedAt?: string
}

export default function PartnersManagement() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: ''
  })
  const [uploading, setUploading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/partners', {
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
        throw new Error('Failed to fetch partners')
      }

      const data = await response.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
      setError('Failed to load partners')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

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

    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch('/api/admin/partners/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to upload image')
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      setError('Partner name is required')
      return
    }

    try {
      setUploading(true)
      setError('')

      let logoUrl = formData.logoUrl

      // Upload new image if file selected
      if (imageFile) {
        logoUrl = await uploadImage()
      }

      if (!logoUrl && !editingPartner) {
        setError('Partner logo is required for new partners')
        setUploading(false)
        return
      }

      const token = localStorage.getItem('token')
      const url = '/api/admin/partners'
      
      const method = editingPartner ? 'PUT' : 'POST'
      const body = editingPartner
        ? {
            partnerId: editingPartner._id,
            name: formData.name,
            logoUrl: logoUrl || editingPartner.logoUrl
          }
        : {
            name: formData.name,
            logoUrl
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
        throw new Error(data.error || 'Failed to save partner')
      }

      // Reset form and close modal
      setFormData({
        name: '',
        logoUrl: ''
      })
      setImageFile(null)
      setImagePreview('')
      setEditingPartner(null)
      setShowModal(false)
      
      // Refresh partners list
      fetchPartners()
    } catch (error: any) {
      console.error('Error saving partner:', error)
      setError(error.message || 'Failed to save partner')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      logoUrl: partner.logoUrl
    })
    setImagePreview(partner.logoUrl)
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (partnerId: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/partners?partnerId=${partnerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete partner')
      }

      fetchPartners()
    } catch (error) {
      console.error('Error deleting partner:', error)
      setError('Failed to delete partner')
    }
  }

  const handleCreate = () => {
    setEditingPartner(null)
    setFormData({
      name: '',
      logoUrl: ''
    })
    setImageFile(null)
    setImagePreview('')
    setError('')
    setShowModal(true)
  }

  if (loading && partners.length === 0) {
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
          <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
          <p className="text-gray-600">Create, edit, and manage partners</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Partner
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {partners.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No partners found. Create your first partner to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {partners.map((partner) => (
              <div key={partner._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center space-y-4">
                  {partner.logoUrl && (
                    <div className="w-32 h-32 relative flex items-center justify-center bg-gray-50 rounded">
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        width={128}
                        height={128}
                        className="object-contain max-w-full max-h-full"
                        unoptimized
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-gray-900 text-center">{partner.name}</h3>
                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleEdit(partner)}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id!)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {editingPartner ? 'Edit Partner' : 'Create New Partner'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Partner Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Partner Logo {!editingPartner && '*'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingPartner}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="h-32 w-32 object-contain rounded border border-gray-200"
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
                    {uploading ? 'Saving...' : (editingPartner ? 'Update Partner' : 'Create Partner')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingPartner(null)
                      setFormData({
                        name: '',
                        logoUrl: ''
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


