import { NextResponse } from 'next/server'

export async function GET() {
  const envVars: Record<string, string | undefined> = {}

  Object.keys(process.env).forEach((key) => {
    envVars[key] = process.env[key]
  })

  return NextResponse.json({
    totalEnvKeys: Object.keys(process.env).length,
    env: envVars,
  })
}



