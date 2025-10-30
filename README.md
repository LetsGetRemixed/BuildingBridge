# Vercel Template with MongoDB

A simple Next.js fullstack application with MongoDB backend, ready for deployment on Vercel.

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Tailwind CSS for styling
- ✅ MongoDB connection with health check
- ✅ Real-time connection status display
- ✅ **JWT Authentication System**
- ✅ **User Registration & Login**
- ✅ **Password Encryption with bcrypt**
- ✅ **Secure Session Management**
- ✅ Vercel deployment ready

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and configure your MongoDB connection:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
```

### 3. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable `MONGODB_URI` in Vercel dashboard
4. Deploy!

### 3. Environment Variables in Vercel

In your Vercel project settings, add:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing

**Important**: Make sure to set these environment variables in your Vercel dashboard before deploying!

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your environment variables

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017`

## How It Works

### Authentication
- **User Registration**: Create new accounts with email and password
- **Secure Login**: Password-based authentication with bcrypt encryption
- **JWT Tokens**: Secure session management with JSON Web Tokens
- **User Display**: Shows "Hello [email]" when logged in

### Database
- The homepage displays the current MongoDB connection status
- Connection status is checked every 30 seconds automatically
- If MongoDB is not connected, a red "Not connected to MongoDB" message appears
- If connected, a green "Connected to MongoDB" message appears
- The `/api/health` endpoint provides the connection status as JSON

### User Flow
1. **Not Logged In**: Shows "Sign In" and "Sign Up" buttons and database status
2. **Sign Up**: Click "Sign Up" → Enter email and password → Account created
3. **Sign In**: Click "Sign In" → Enter email and password → Logged in
4. **Logged In**: Shows "Hello [email]!" and "Sign Out" button

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts           # Login API
│   │   │   │   └── signup/route.ts          # Signup API
│   │   │   └── health/route.ts              # Health check API
│   │   ├── auth/
│   │   │   ├── login/page.tsx               # Login page
│   │   │   └── signup/page.tsx              # Signup page
│   │   ├── globals.css                      # Global styles
│   │   ├── layout.tsx                       # Root layout
│   │   └── page.tsx                         # Homepage
│   └── lib/
│       ├── jwt.ts                           # JWT utilities
│       ├── middleware.ts                    # Auth middleware
│       ├── mongodb.ts                       # MongoDB connection utility
│       └── user.ts                          # User model and utilities
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```
