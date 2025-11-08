import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getStorage, Storage } from 'firebase-admin/storage'
import { readFileSync } from 'fs'
import { join } from 'path'

let adminApp: App | undefined
let adminStorage: Storage | undefined

const normalizeStorageBucket = (bucket?: string | null) => {
  if (!bucket) return undefined
  const trimmed = bucket.trim()
  if (!trimmed) return undefined
  const cleaned = trimmed
    .replace(/\\r/g, '')
    .replace(/\\n/g, '')
    .replace(/\r/g, '')
    .replace(/\n/g, '')
  if (cleaned.startsWith('gs://')) {
    return cleaned.replace('gs://', '').replace(/\/$/, '')
  }
  return cleaned.replace(/^\//, '').replace(/\/$/, '')
}

const resolvedStorageBucket = normalizeStorageBucket(
  process.env.FIREBASE_ADMIN_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
)

if (!getApps().length) {
  try {
    // Option 1: Use service account from environment variable (JSON string)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      const serviceAccount = rawServiceAccount ? JSON.parse(rawServiceAccount) : null
      if (!serviceAccount) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT is set but could not be parsed')
      }
      if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
        serviceAccount.private_key = serviceAccount.private_key.includes('\\n')
          ? serviceAccount.private_key.replace(/\\n/g, '\n')
          : serviceAccount.private_key
      }
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: resolvedStorageBucket,
      })
    }
    // Option 2: Use individual service account environment variables (fallback)
    else if (
      process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID
    ) {
      const rawPrivateKey = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
      const serviceAccount = {
        type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE || 'service_account',
        project_id: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID || '',
        private_key: rawPrivateKey?.includes('\\n')
          ? rawPrivateKey.replace(/\\n/g, '\n')
          : rawPrivateKey,
        client_email: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID || '',
        auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL || '',
        universe_domain: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN || 'googleapis.com',
      }
      adminApp = initializeApp({
        credential: cert(serviceAccount as any),
        storageBucket: resolvedStorageBucket,
      })
    }
    // Option 3: Use service account file path (for local development fallback)
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
      // Handle relative paths
      const resolvedPath = credentialsPath.startsWith('.') 
        ? join(process.cwd(), credentialsPath)
        : credentialsPath
      
      const serviceAccount = JSON.parse(readFileSync(resolvedPath, 'utf8'))
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: resolvedStorageBucket,
      })
    }
    // Option 4: Try to load from default location (serviceAccountKey.json in root)
    else {
      try {
        const defaultPath = join(process.cwd(), 'serviceAccountKey.json')
        const serviceAccount = JSON.parse(readFileSync(defaultPath, 'utf8'))
        adminApp = initializeApp({
          credential: cert(serviceAccount),
          storageBucket: resolvedStorageBucket,
        })
      } catch {
        // Option 5: Use Application Default Credentials (for Vercel/Cloud deployment)
        adminApp = initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: resolvedStorageBucket,
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
    console.log('Firebase Admin initialized successfully with bucket:', resolvedStorageBucket)
  } catch (error) {
    console.error('Error initializing Firebase Admin Storage:', error)
  }
} else {
  console.warn('Firebase Admin app not initialized')
}

const getAdminBucket = () => {
  if (!adminStorage) {
    throw new Error('Firebase Admin storage is not initialized')
  }

  return resolvedStorageBucket
    ? adminStorage.bucket(resolvedStorageBucket)
    : adminStorage.bucket()
}

export { adminApp, adminStorage, resolvedStorageBucket, getAdminBucket }

