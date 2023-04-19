import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  const isLogged = request.cookies.get('isLogged')
  const accessToken = request.cookies.get('accessToken')

  if (isLogged === undefined) return NextResponse.redirect(new URL('/', request.url))

  if (request.nextUrl.pathname.startsWith('/users')) {
    if (accessToken !== undefined) {
      const { role }: { role: number } = jwtDecode(accessToken.value)

      if (role !== 1) return NextResponse.redirect(new URL('/tasks', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks', '/projects', '/profile', '/users']
}
