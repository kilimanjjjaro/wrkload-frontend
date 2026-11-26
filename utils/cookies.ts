export const accessTokenCookieOptions = (maxAge: number) => ({
  maxAge,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production'
})
