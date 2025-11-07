'use client'

import { useEffect, useState } from 'react'

export default function AdminEnvPage() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})
  const [totalEnvKeys, setTotalEnvKeys] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEnv = async () => {
      try {
        setLoading(true)
        setError(null)

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

        const response = await fetch('/api/debug-env', {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = (await response.json()) as { env: Record<string, string | undefined>; totalEnvKeys: number }
        setEnvVars(data.env || {})
        setTotalEnvKeys(data.totalEnvKeys || 0)
      } catch (err: any) {
        setError(err.message || 'Failed to load environment details')
        setEnvVars({})
        setTotalEnvKeys(0)
      } finally {
        setLoading(false)
      }
    }

    fetchEnv()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Environment Diagnostics</h2>
        <p className="mt-1 text-sm text-gray-500">
          View the exact environment variables reported by the running server for debugging purposes.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <div className="text-gray-500">Loading environment data…</div>
        ) : error ? (
          <div className="text-red-600 text-sm">Error: {error}</div>
        ) : Object.keys(envVars).length ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Total environment variables: <span className="font-semibold">{totalEnvKeys}</span>
              </p>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(JSON.stringify(envVars, null, 2))
                    .catch(() => setError('Failed to copy to clipboard'))
                }}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Copy JSON
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Key</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {Object.entries(envVars).map(([key, value]) => (
                    <tr key={key}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{key}</td>
                      <td className="px-4 py-2 font-mono text-xs text-gray-700 break-all">
                        {value ?? <span className="italic text-gray-400">undefined</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No environment data available.</div>
        )}
      </div>
    </div>
  )
}

