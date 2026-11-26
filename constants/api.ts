const LOCAL_API_ORIGIN = 'http://localhost:5000'

const apiOrigin = (origin: string | undefined) =>
  origin === undefined || origin === '' ? LOCAL_API_ORIGIN : origin

export const API_URL = `${apiOrigin(process.env.NEXT_PUBLIC_BACKEND_URL)}/api/v1`
