import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getStorage, Storage } from 'firebase-admin/storage'
import { readFileSync } from 'fs'
import { join } from 'path'

let adminApp: App | undefined
let adminStorage: Storage | undefined

if (!getApps().length) {
  try {
    // Option 1: Use service account from environment variable (JSON string)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
    }
    // Option 2: Use service account file path (for local development)
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
      // Handle relative paths
      const resolvedPath = credentialsPath.startsWith('.') 
        ? join(process.cwd(), credentialsPath)
        : credentialsPath
      
      const serviceAccount = JSON.parse(readFileSync(resolvedPath, 'utf8'))
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })
    }
    // Option 3: Try to load from default location (serviceAccountKey.json in root)
    else {
      try {
        const defaultPath = join(process.cwd(), 'serviceAccountKey.json')
        const serviceAccount = JSON.parse(readFileSync(defaultPath, 'utf8'))
        adminApp = initializeApp({
          credential: cert(serviceAccount),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        })
      } catch {
        // Option 4: Use Application Default Credentials (for Vercel/Cloud deployment)
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        })
      }
    }
  } catch (error: any) {
    console.error('Error initializing Firebase Admin:', error)
    console.warn('Firebase Admin Storage will not be available. Please configure service account credentials.')
    console.warn('Error details:', error.message)
  }
} else {
  adminApp = getApps()[0]
}

if (adminApp) {
  try {
    adminStorage = getStorage(adminApp)
    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    console.error('Error initializing Firebase Admin Storage:', error)
  }
} else {
  console.warn('Firebase Admin app not initialized')
}

export { adminApp, adminStorage }

