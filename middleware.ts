import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === '/tasks') {
    // get cookie here
  }

  return NextResponse.next()
}
