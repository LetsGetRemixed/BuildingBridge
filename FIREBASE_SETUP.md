# Firebase Storage Setup Guide

This guide explains how to set up Firebase Admin SDK for server-side file uploads.

## Step 1: Get Firebase Service Account Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `buildingbridgefoundation-3c04d`
3. Click the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Go to the "Service accounts" tab
6. Click "Generate new private key"
7. Download the JSON file (keep this secure - don't commit to git!)

## Step 2: Configure Environment Variables

You have two options:

### Option A: Environment Variable (Recommended for Vercel/Production)

Add to your `.env` file (or Vercel environment variables):

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"buildingbridgefoundation-3c04d",...}
```

**Note:** The entire JSON content should be on one line as a string.

### Option B: Service Account File (For Local Development)

1. Place the downloaded JSON file in your project root (not in `src/`)
2. Add to `.env`:

```env
GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccountKey.json
```

**Important:** Add `serviceAccountKey.json` to your `.gitignore` file!

## Step 3: Update Firebase Storage Rules

Go to Firebase Console → Storage → Rules and update to:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Allow public reads (images need to be viewable)
      allow read: if true;
      
      // Deny all client-side writes
      // All uploads must go through the API route with admin authentication
      allow write: if false;
    }
  }
}
```

This ensures:
- ✅ Anyone can read/view images (for public display)
- ✅ Only server-side API (with admin auth) can upload/delete files
- ✅ No direct client-side uploads are possible

## Step 4: Verify Setup

1. Restart your Next.js development server
2. Try uploading an event image in the admin dashboard
3. Check the browser console and server logs for any errors

## Troubleshooting

### Error: "Firebase Admin not initialized"
- Make sure `FIREBASE_SERVICE_ACCOUNT` or `GOOGLE_APPLICATION_CREDENTIALS` is set
- Verify the JSON is valid and complete
- Restart your development server after adding environment variables

### Error: "Permission denied"
- Check that your service account has Storage Admin role
- In Firebase Console → IAM & Admin, ensure your service account has proper permissions

### Images not displaying
- Verify Storage rules allow public reads: `allow read: if true;`
- Check that files are being made public in the upload route (already implemented)

## Security Notes

- Never commit service account keys to git
- Use environment variables for production
- The API route validates admin authentication before allowing uploads
- Storage rules prevent direct client-side uploads

