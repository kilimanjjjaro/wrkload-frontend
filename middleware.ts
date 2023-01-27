import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  const accessToken = request.cookies.get('accessToken')

  if (accessToken === undefined) return NextResponse.redirect(new URL('/login', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks', '/projects', '/users']
}
