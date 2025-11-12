import { NextResponse } from 'next/server'

export const dynamic: string = 'force-dynamic'

export const runtime: string = 'nodejs'

export function GET(): NextResponse {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' }, status: 200 }
  )
}
