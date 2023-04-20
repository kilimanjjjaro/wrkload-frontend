import jwtDecode from 'jwt-decode'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware (request: NextRequest): NextResponse {
  const isLoggedCookie = request.cookies.get('isLogged')
  const accessToken = request.cookies.get('accessToken')
  let isLogged = false

  if (isLoggedCookie !== undefined) isLogged = isLoggedCookie.value === 'true'

  if (!isLogged) return NextResponse.redirect(new URL('/', request.url))

  if (isLogged && accessToken !== undefined) {
    if (request.nextUrl.pathname.startsWith('/users')) {
      const { role }: { role: number } = jwtDecode(accessToken.value)

      if (role === 3) return NextResponse.redirect(new URL('/tasks', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks', '/projects', '/profile', '/users']
}
