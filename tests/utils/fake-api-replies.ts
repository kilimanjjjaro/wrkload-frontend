import {
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
  TRIAL_ACCOUNT_ID
} from '../constants/api'
import {
  BEARER_TOKEN_INDEX,
  FIRST_LETTER_INDEX,
  FIRST_PAGE,
  JWT_PAYLOAD_INDEX,
  REST_OF_WORD_INDEX
} from '../constants/fake-api'
import type { FixtureUser } from '../constants/fixtures'

export interface RecordedRequest {
  method: string
  path: string
  query: Partial<Record<string, string>>
  body: unknown
}

export interface Reply {
  status: number
  body: unknown
}

export const ok = (body: object, status = HTTP_STATUS_OK): Reply => ({
  status,
  body: { status: 'ok', ...body }
})

export const fail = (status: number, code: string, message: string): Reply => ({
  status,
  body: { status: 'error', code, message }
})

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url')

export const accessTokenFor = (user: FixtureUser) =>
  [
    encode({ alg: 'HS256', typ: 'JWT' }),
    encode({ uid: user._id, role: user.role, email: user.email }),
    'signature'
  ].join('.')

export const uidFromToken = (authorization: string | undefined) => {
  const payload = authorization
    ?.split(' ')
    .at(BEARER_TOKEN_INDEX)
    ?.split('.')
    .at(JWT_PAYLOAD_INDEX)
  if (payload === undefined) return undefined
  const decoded: unknown = JSON.parse(
    Buffer.from(payload, 'base64url').toString()
  )
  return typeof decoded === 'object' &&
    decoded !== null &&
    'uid' in decoded &&
    typeof decoded.uid === 'string'
    ? decoded.uid
    : undefined
}

export const capitalize = (text: string) =>
  text
    .split(' ')
    .map(
      (word) =>
        word.charAt(FIRST_LETTER_INDEX).toUpperCase() +
        word.slice(REST_OF_WORD_INDEX)
    )
    .join(' ')

export const secureUser = (user: FixtureUser) => ({
  _id: user._id,
  email: user.email,
  username: user.username,
  avatar: user.avatar,
  role: user.role
})

export const paginate = <T>(
  items: T[],
  query: Partial<Record<string, string>>
) => {
  const limit = Number(query.limit ?? items.length)
  const page = Number(query.page ?? FIRST_PAGE)
  const start = (page - FIRST_PAGE) * limit
  const totalPages = Math.ceil(items.length / limit)

  return {
    docs: items.slice(start, start + limit),
    pagination: {
      totalResults: items.length,
      resultsPerPage: limit,
      prevPage: page > FIRST_PAGE ? page - FIRST_PAGE : null,
      page,
      nextPage: page < totalPages ? page + FIRST_PAGE : null
    }
  }
}

export const matches = (text: string, search: string | undefined) =>
  search === undefined ||
  text.toLowerCase().includes(search.replace(/^"|"$/gv, '').toLowerCase())

export const bodyOf = (recorded: RecordedRequest): Record<string, unknown> =>
  typeof recorded.body === 'object' && recorded.body !== null
    ? { ...recorded.body }
    : {}

export const text = (value: unknown) =>
  typeof value === 'string' ? value : undefined

export const trialDenied = () =>
  fail(
    HTTP_STATUS_UNAUTHORIZED,
    'trial/permission-denied',
    'This is a trial account'
  )

export const trialError = (user: FixtureUser) =>
  user._id === TRIAL_ACCOUNT_ID ? trialDenied() : undefined
