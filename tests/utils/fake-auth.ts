import {
  ACCESS_TOKEN_EXPIRES_IN,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
  TRIAL_ACCOUNT_ID
} from '../constants/api'
import { VALID_TOKEN } from '../constants/fake-api'
import { PASSWORDS } from '../constants/fixtures'
import type { FixtureUser } from '../constants/fixtures'
import {
  accessTokenFor,
  bodyOf,
  fail,
  ok,
  secureUser,
  text,
  trialDenied
} from './fake-api-replies'
import type { RecordedRequest, Reply } from './fake-api-replies'

interface AuthRequest {
  body: Record<string, unknown>
  user: FixtureUser | undefined
  path: string
  param: string | undefined
  lastUser: FixtureUser | undefined
}

type AuthHandler = (request: AuthRequest) => Reply

const userNotFound = (message: string) =>
  fail(HTTP_STATUS_FORBIDDEN, 'auth/user-not-found', message)

const invalidCredentials = () =>
  fail(
    HTTP_STATUS_FORBIDDEN,
    'auth/invalid-credentials',
    'Wrong email or password'
  )

const alreadyConfirmed = () =>
  fail(
    HTTP_STATUS_UNAUTHORIZED,
    'auth/account-already-confirmed',
    'This account is already confirmed'
  )

const tokenNotFound = () =>
  fail(HTTP_STATUS_UNAUTHORIZED, 'token/token-not-found', 'Token not found')

const created = () => ok({}, HTTP_STATUS_CREATED)

const login: AuthHandler = ({ body, user }) => {
  if (user === undefined) return userNotFound('Wrong email or password')
  if (!user.confirmationStatus) {
    return fail(
      HTTP_STATUS_UNAUTHORIZED,
      'auth/account-not-confirmed',
      'Please check your email to confirm account'
    )
  }
  if (PASSWORDS[user.email] !== body.password) return invalidCredentials()
  return ok({
    user: secureUser(user),
    accessToken: accessTokenFor(user),
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  })
}

const register: AuthHandler = ({ user }) =>
  user === undefined
    ? created()
    : fail(
        HTTP_STATUS_FORBIDDEN,
        'auth/email-already-exists',
        'User already exists'
      )

const rememberPassword: AuthHandler = ({ user }) => {
  if (user === undefined) {
    return userNotFound('Check your email for reset your password')
  }
  return user._id === TRIAL_ACCOUNT_ID ? trialDenied() : ok({})
}

const resendConfirmAccount: AuthHandler = ({ user }) => {
  if (user === undefined) return userNotFound('Wrong email or password')
  return user.confirmationStatus ? alreadyConfirmed() : created()
}

const changePassword: AuthHandler = ({ body, user }) => {
  if (user?._id === TRIAL_ACCOUNT_ID) return trialDenied()
  if (
    user === undefined ||
    PASSWORDS[user.email] !== body.oldPassword ||
    body.oldPassword === body.newPassword
  ) {
    return invalidCredentials()
  }
  return created()
}

const resetPassword: AuthHandler = ({ path }) =>
  path.endsWith(`/${VALID_TOKEN}`)
    ? created()
    : fail(
        HTTP_STATUS_UNAUTHORIZED,
        'token/invalid-signature',
        'Invalid token signature'
      )

const confirmAccount: AuthHandler = ({ param }) =>
  param === VALID_TOKEN ? created() : alreadyConfirmed()

const refreshToken: AuthHandler = ({ lastUser }) =>
  lastUser === undefined
    ? tokenNotFound()
    : ok(
        {
          accessToken: accessTokenFor(lastUser),
          expiresIn: ACCESS_TOKEN_EXPIRES_IN
        },
        HTTP_STATUS_CREATED
      )

const AUTH_HANDLERS = new Map<string, AuthHandler>([
  ['POST login', login],
  ['POST register', register],
  ['POST remember-password', rememberPassword],
  ['POST resend-confirm-account', resendConfirmAccount],
  ['PATCH change-password', changePassword],
  ['PATCH reset-password', resetPassword],
  ['PATCH confirm-account', confirmAccount],
  ['GET logout', () => ok({})],
  ['GET refreshToken', refreshToken]
])

interface AuthRoute {
  recorded: RecordedRequest
  action: string
  param: string | undefined
  users: FixtureUser[]
  lastUser: FixtureUser | undefined
}

export const authReply = ({
  recorded,
  action,
  param,
  users,
  lastUser
}: AuthRoute): Reply => {
  const handler = AUTH_HANDLERS.get(`${recorded.method} ${action}`)
  if (handler === undefined) {
    return fail(HTTP_STATUS_NOT_FOUND, 'test/unknown-route', recorded.path)
  }

  const body = bodyOf(recorded)
  const email = text(body.email)?.toLowerCase()
  const user = users.find((candidate) => candidate.email === email)
  return handler({ body, user, path: recorded.path, param, lastUser })
}
