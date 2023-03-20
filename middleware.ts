import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  const isLogged = request.cookies.get('isLogged')

  if (isLogged === undefined) return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks', '/projects', '/profile', '/users']
}
