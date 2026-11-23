import type { Page, Request, Route } from '@playwright/test'
import {
  ACCESS_TOKEN_EXPIRES_IN,
  API_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
  ROLE_PARTNER,
  TRIAL_ACCOUNT_ID
} from '../constants/api'
import {
  PASSWORDS,
  PROJECTS,
  PROJECT_STATS,
  TASKS,
  TASK_STATS,
  USERS
} from '../constants/fixtures'
import type {
  FixtureProject,
  FixtureTask,
  FixtureUser
} from '../constants/fixtures'

export interface RecordedRequest {
  method: string
  path: string
  query: Record<string, string>
  body: unknown
}

interface Reply {
  status: number
  body: unknown
}

interface FakeApiOptions {
  users?: FixtureUser[]
  projects?: FixtureProject[]
  tasks?: FixtureTask[]
}

const HTTP_STATUS_NO_CONTENT = 204
const FIRST_PAGE = 1
const VALID_TOKEN = 'valid-token'
const ID_LENGTH = 24
const HEX_RADIX = 16

const ok = (body: object, status = HTTP_STATUS_OK): Reply => ({
  status,
  body: { status: 'ok', ...body }
})

const fail = (status: number, code: string, message: string): Reply => ({
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

const uidFromToken = (authorization: string | undefined) => {
  const payload = authorization?.split(' ')[1]?.split('.')[1]
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

const capitalize = (text: string) =>
  text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const secureUser = (user: FixtureUser) => ({
  _id: user._id,
  email: user.email,
  username: user.username,
  avatar: user.avatar,
  role: user.role
})

const paginate = <T>(items: T[], query: Record<string, string>) => {
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

const matches = (text: string, search: string | undefined) =>
  search === undefined ||
  text.toLowerCase().includes(search.replace(/^"|"$/g, '').toLowerCase())

export class FakeApi {
  readonly users: FixtureUser[]
  readonly projects: FixtureProject[]
  readonly tasks: FixtureTask[]
  readonly requests: RecordedRequest[] = []
  private nextId = 1
  private lastUser: FixtureUser | undefined

  constructor(options: FakeApiOptions = {}) {
    this.users = structuredClone(options.users ?? USERS)
    this.projects = structuredClone(options.projects ?? PROJECTS)
    this.tasks = structuredClone(options.tasks ?? TASKS)
  }

  async install(page: Page) {
    await page.route(`${API_URL}/**`, async (route) => {
      await this.handle(route)
    })
  }

  requestsTo(method: string, path: string) {
    return this.requests.filter(
      (request) => request.method === method && request.path === path
    )
  }

  private newId() {
    const id = (this.nextId++).toString(HEX_RADIX)
    return `64f${id.padStart(ID_LENGTH - '64f'.length, '0')}`
  }

  private async handle(route: Route) {
    const request = route.request()
    const origin = (await request.headerValue('origin')) ?? '*'
    const cors = {
      'access-control-allow-origin': origin,
      'access-control-allow-credentials': 'true',
      'access-control-allow-methods': 'GET,PATCH,POST,DELETE',
      'access-control-allow-headers': 'authorization,content-type'
    }

    if (request.method() === 'OPTIONS') {
      await route.fulfill({ status: HTTP_STATUS_NO_CONTENT, headers: cors })
      return
    }

    const url = new URL(request.url())
    const recorded: RecordedRequest = {
      method: request.method(),
      path: url.pathname.replace(new URL(API_URL).pathname, ''),
      query: Object.fromEntries(url.searchParams),
      body: request.postDataJSON() as unknown
    }
    this.requests.push(recorded)

    const { status, body } = this.reply(recorded, request)
    await route.fulfill({
      status,
      headers: cors,
      contentType: 'application/json',
      body: JSON.stringify(body)
    })
  }

  private sessionUser(request: Request) {
    const uid = uidFromToken(request.headers().authorization)
    const user = this.users.find((candidate) => candidate._id === uid)
    if (user !== undefined) this.lastUser = user
    return user
  }

  private reply(recorded: RecordedRequest, request: Request): Reply {
    const [resource, id, extra] = recorded.path.split('/').slice(1)

    if (resource === 'auth') return this.auth(recorded, id, extra)

    const user = this.sessionUser(request)
    if (user === undefined) {
      return fail(
        HTTP_STATUS_UNAUTHORIZED,
        'token/token-not-found',
        'Token not found'
      )
    }

    if (resource === 'tasks') return this.taskRoutes(recorded, user, id)
    if (resource === 'projects') return this.projectRoutes(recorded, user, id)
    return this.userRoutes(recorded, user, id)
  }

  private body(recorded: RecordedRequest) {
    return (recorded.body ?? {}) as Record<string, string>
  }

  private auth(recorded: RecordedRequest, action: string, param?: string) {
    const body = this.body(recorded)
    const user = this.users.find(
      (candidate) => candidate.email === body.email?.toLowerCase()
    )

    switch (`${recorded.method} ${action}`) {
      case 'POST login':
        if (user === undefined) {
          return fail(
            HTTP_STATUS_FORBIDDEN,
            'auth/user-not-found',
            'Wrong email or password'
          )
        }
        if (!user.confirmationStatus) {
          return fail(
            HTTP_STATUS_UNAUTHORIZED,
            'auth/account-not-confirmed',
            'Please check your email to confirm account'
          )
        }
        if (PASSWORDS[user.email] !== body.password) {
          return fail(
            HTTP_STATUS_FORBIDDEN,
            'auth/invalid-credentials',
            'Wrong email or password'
          )
        }
        return ok({
          user: secureUser(user),
          accessToken: accessTokenFor(user),
          expiresIn: ACCESS_TOKEN_EXPIRES_IN
        })
      case 'POST register':
        return user === undefined
          ? ok({}, HTTP_STATUS_CREATED)
          : fail(
              HTTP_STATUS_FORBIDDEN,
              'auth/email-already-exists',
              'User already exists'
            )
      case 'POST remember-password':
        if (user === undefined) {
          return fail(
            HTTP_STATUS_FORBIDDEN,
            'auth/user-not-found',
            'Check your email for reset your password'
          )
        }
        return user._id === TRIAL_ACCOUNT_ID
          ? fail(
              HTTP_STATUS_UNAUTHORIZED,
              'trial/permission-denied',
              'This is a trial account'
            )
          : ok({})
      case 'POST resend-confirm-account':
        if (user === undefined) {
          return fail(
            HTTP_STATUS_FORBIDDEN,
            'auth/user-not-found',
            'Wrong email or password'
          )
        }
        return user.confirmationStatus
          ? fail(
              HTTP_STATUS_UNAUTHORIZED,
              'auth/account-already-confirmed',
              'This account is already confirmed'
            )
          : ok({}, HTTP_STATUS_CREATED)
      case 'PATCH change-password':
        if (user?._id === TRIAL_ACCOUNT_ID) {
          return fail(
            HTTP_STATUS_UNAUTHORIZED,
            'trial/permission-denied',
            'This is a trial account'
          )
        }
        if (
          user === undefined ||
          PASSWORDS[user.email] !== body.oldPassword ||
          body.oldPassword === body.newPassword
        ) {
          return fail(
            HTTP_STATUS_FORBIDDEN,
            'auth/invalid-credentials',
            'Wrong email or password'
          )
        }
        return ok({}, HTTP_STATUS_CREATED)
      case 'PATCH reset-password':
        return recorded.path.endsWith(`/${VALID_TOKEN}`)
          ? ok({}, HTTP_STATUS_CREATED)
          : fail(
              HTTP_STATUS_UNAUTHORIZED,
              'token/invalid-signature',
              'Invalid token signature'
            )
      case 'PATCH confirm-account':
        return param === VALID_TOKEN
          ? ok({}, HTTP_STATUS_CREATED)
          : fail(
              HTTP_STATUS_UNAUTHORIZED,
              'auth/account-already-confirmed',
              'This account is already confirmed'
            )
      case 'GET logout':
        return ok({})
      case 'GET refreshToken':
        return this.lastUser === undefined
          ? fail(
              HTTP_STATUS_UNAUTHORIZED,
              'token/token-not-found',
              'Token not found'
            )
          : ok(
              {
                accessToken: accessTokenFor(this.lastUser),
                expiresIn: ACCESS_TOKEN_EXPIRES_IN
              },
              HTTP_STATUS_CREATED
            )
      default:
        return fail(HTTP_STATUS_NOT_FOUND, 'test/unknown-route', recorded.path)
    }
  }

  private trialError(user: FixtureUser) {
    return user._id === TRIAL_ACCOUNT_ID
      ? fail(
          HTTP_STATUS_UNAUTHORIZED,
          'trial/permission-denied',
          'This is a trial account'
        )
      : undefined
  }

  private taskRoutes(
    recorded: RecordedRequest,
    user: FixtureUser,
    id?: string
  ): Reply {
    const body = this.body(recorded)
    const index = this.tasks.findIndex((task) => task._id === id)

    if (recorded.method === 'GET') {
      const project = capitalize(recorded.query.project ?? '')
      const tasks = this.tasks.filter(
        (task) =>
          task.authorId === user._id &&
          task.project === project &&
          matches(task.title, recorded.query.search)
      )
      if (tasks.length === 0) {
        return ok({ pagination: null, tasks: [], stats: null })
      }
      const { docs, pagination } = paginate(tasks, recorded.query)
      return ok({ pagination, tasks: docs, stats: TASK_STATS })
    }

    const trialError = this.trialError(user)
    if (trialError !== undefined) return trialError

    if (recorded.method === 'POST') {
      const newTask: FixtureTask = {
        _id: this.newId(),
        authorId: user._id,
        createdAt: '2026-11-15T12:00:00-03:00',
        updatedAt: '',
        title: body.title,
        project: body.project,
        timing: body.timing,
        deliveredAt: body.deliveredAt.slice(0, 'YYYY-MM-DD'.length),
        description: body.description ?? ''
      }
      this.tasks.push(newTask)
      return ok({ newTask }, HTTP_STATUS_CREATED)
    }

    if (index === -1) {
      return fail(HTTP_STATUS_NOT_FOUND, 'tasks/task-not-found', 'Task not found')
    }

    if (recorded.method === 'DELETE') {
      this.tasks.splice(index, 1)
      return ok({})
    }

    const updatedTask = { ...this.tasks[index], ...body }
    this.tasks[index] = updatedTask
    return ok({ updatedTask })
  }

  private projectRoutes(
    recorded: RecordedRequest,
    user: FixtureUser,
    id?: string
  ): Reply {
    const body = this.body(recorded)
    const index = this.projects.findIndex((project) => project._id === id)

    if (recorded.method === 'GET') {
      const projects = this.projects.filter(
        (project) =>
          project.authorId === user._id &&
          matches(project.name, recorded.query.search)
      )
      if (projects.length === 0) {
        return ok({ pagination: null, projects: [] })
      }
      const { docs, pagination } = paginate(projects, recorded.query)
      return ok({ pagination, projects: docs, stats: PROJECT_STATS })
    }

    const trialError = this.trialError(user)
    if (trialError !== undefined) return trialError

    if (recorded.method === 'POST') {
      const name = capitalize(body.name)
      if (
        this.projects.some(
          (project) => project.name === name && project.authorId === user._id
        )
      ) {
        return fail(
          HTTP_STATUS_FORBIDDEN,
          'projects/project-already-exists',
          'Project already exists'
        )
      }
      const newProject: FixtureProject = {
        _id: this.newId(),
        name,
        authorId: user._id,
        createdAt: '2026-11-15T12:00:00-03:00',
        totalTasks: 0
      }
      this.projects.push(newProject)
      return ok({ newProject }, HTTP_STATUS_CREATED)
    }

    if (index === -1) {
      return fail(
        HTTP_STATUS_NOT_FOUND,
        'projects/project-not-found',
        'Project not found'
      )
    }

    if (recorded.method === 'DELETE') {
      this.projects.splice(index, 1)
      return ok({})
    }

    const updatedProject = { ...this.projects[index], name: body.name }
    this.projects[index] = updatedProject
    return ok({ updatedProject })
  }

  private userRoutes(
    recorded: RecordedRequest,
    user: FixtureUser,
    id?: string
  ): Reply {
    const body = this.body(recorded)
    const target = this.users.find((candidate) => candidate._id === id)
    const permissionDenied = fail(
      HTTP_STATUS_UNAUTHORIZED,
      'users/permission-denied',
      'Permission denied'
    )

    if (recorded.method === 'GET' && id === undefined) {
      if (user.role === ROLE_PARTNER) return permissionDenied
      const users = this.users.filter((candidate) =>
        matches(candidate.username, recorded.query.search)
      )
      if (users.length === 0) return ok({ pagination: null, users: [] })
      const { docs, pagination } = paginate(users, recorded.query)
      return ok({ pagination, users: docs })
    }

    if (target === undefined) {
      return fail(
        HTTP_STATUS_NOT_FOUND,
        'users/user-not-found',
        "This user doesn't exist"
      )
    }

    if (recorded.method === 'GET') return ok({ user: target })

    if (target._id === TRIAL_ACCOUNT_ID) {
      return fail(
        HTTP_STATUS_UNAUTHORIZED,
        'trial/permission-denied',
        'This is a trial account'
      )
    }

    if (recorded.method === 'DELETE') {
      this.users.splice(this.users.indexOf(target), 1)
      return ok({})
    }

    if (target._id !== user._id) return permissionDenied

    Object.assign(target, body)
    return ok({ user: secureUser(target) })
  }
}
