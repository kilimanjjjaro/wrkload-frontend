import type { Page, Request, Route } from '@playwright/test'
import {
  API_URL,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
  ROLE_ADMIN,
  ROLE_PARTNER,
  TRIAL_ACCOUNT_ID
} from '../constants/api'
import {
  CREATED_AT,
  DATE_START_INDEX,
  FIRST_ID,
  HEX_RADIX,
  ID_INCREMENT,
  ID_LENGTH,
  NEW_PROJECT_TASKS,
  NOT_FOUND_INDEX,
  NO_RESULTS,
  SINGLE_ITEM
} from '../constants/fake-api'
import {
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
import { authReply } from './fake-auth'
import {
  bodyOf,
  capitalize,
  fail,
  matches,
  ok,
  paginate,
  secureUser,
  text,
  trialDenied,
  trialError,
  uidFromToken
} from './fake-api-replies'
import type { RecordedRequest, Reply } from './fake-api-replies'

export { accessTokenFor } from './fake-api-replies'

interface FakeApiOptions {
  users?: FixtureUser[]
  projects?: FixtureProject[]
  tasks?: FixtureTask[]
}

const taskFrom = (
  body: Record<string, unknown>,
  _id: string,
  authorId: string
): FixtureTask => ({
  _id,
  authorId,
  createdAt: CREATED_AT,
  updatedAt: '',
  title: text(body.title) ?? '',
  project: text(body.project) ?? '',
  timing: text(body.timing) ?? '',
  deliveredAt: (text(body.deliveredAt) ?? '').slice(
    DATE_START_INDEX,
    'YYYY-MM-DD'.length
  ),
  description: text(body.description) ?? ''
})

export class FakeApi {
  readonly users: FixtureUser[]
  readonly projects: FixtureProject[]
  readonly tasks: FixtureTask[]
  readonly requests: RecordedRequest[] = []
  private nextId = FIRST_ID
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
    const id = this.nextId.toString(HEX_RADIX)
    this.nextId += ID_INCREMENT
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
    const [, resource, id, extra] = recorded.path.split('/')

    if (resource === 'auth') {
      return authReply({
        recorded,
        action: id,
        param: extra,
        users: this.users,
        lastUser: this.lastUser
      })
    }

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

  private taskRoutes(
    recorded: RecordedRequest,
    user: FixtureUser,
    id?: string
  ): Reply {
    const body = bodyOf(recorded)
    const index = this.tasks.findIndex((task) => task._id === id)

    if (recorded.method === 'GET') {
      const project = capitalize(recorded.query.project ?? '')
      const tasks = this.tasks.filter(
        (task) =>
          task.authorId === user._id &&
          task.project === project &&
          matches(task.title, recorded.query.search)
      )
      if (tasks.length === NO_RESULTS) {
        return ok({ pagination: null, tasks: [], stats: null })
      }
      const { docs, pagination } = paginate(tasks, recorded.query)
      return ok({ pagination, tasks: docs, stats: TASK_STATS })
    }

    const denied = trialError(user)
    if (denied !== undefined) return denied

    if (recorded.method === 'POST') {
      const newTask = taskFrom(body, this.newId(), user._id)
      this.tasks.push(newTask)
      return ok({ newTask }, HTTP_STATUS_CREATED)
    }

    if (index === NOT_FOUND_INDEX) {
      return fail(
        HTTP_STATUS_NOT_FOUND,
        'tasks/task-not-found',
        'Task not found'
      )
    }

    if (recorded.method === 'DELETE') {
      this.tasks.splice(index, SINGLE_ITEM)
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
    const body = bodyOf(recorded)
    const index = this.projects.findIndex((project) => project._id === id)

    if (recorded.method === 'GET') {
      const projects = this.projects.filter(
        (project) =>
          project.authorId === user._id &&
          matches(project.name, recorded.query.search)
      )
      if (projects.length === NO_RESULTS) {
        return ok({ pagination: null, projects: [] })
      }
      const { docs, pagination } = paginate(projects, recorded.query)
      return ok({ pagination, projects: docs, stats: PROJECT_STATS })
    }

    const denied = trialError(user)
    if (denied !== undefined) return denied

    if (recorded.method === 'POST') {
      const name = capitalize(text(body.name) ?? '')
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
        createdAt: CREATED_AT,
        totalTasks: NEW_PROJECT_TASKS
      }
      this.projects.push(newProject)
      return ok({ newProject }, HTTP_STATUS_CREATED)
    }

    if (index === NOT_FOUND_INDEX) {
      return fail(
        HTTP_STATUS_NOT_FOUND,
        'projects/project-not-found',
        'Project not found'
      )
    }

    if (recorded.method === 'DELETE') {
      this.projects.splice(index, SINGLE_ITEM)
      return ok({})
    }

    const updatedProject = {
      ...this.projects[index],
      name: text(body.name) ?? ''
    }
    this.projects[index] = updatedProject
    return ok({ updatedProject })
  }

  private listUsers(recorded: RecordedRequest, user: FixtureUser): Reply {
    const users = this.users.filter(
      (candidate) =>
        (user.role === ROLE_ADMIN || candidate._id === user._id) &&
        matches(candidate.username, recorded.query.search)
    )
    if (users.length === NO_RESULTS) return ok({ pagination: null, users: [] })
    const { docs, pagination } = paginate(users, recorded.query)
    return ok({ pagination, users: docs })
  }

  private userRoutes(
    recorded: RecordedRequest,
    user: FixtureUser,
    id?: string
  ): Reply {
    const body = bodyOf(recorded)
    const target = this.users.find((candidate) => candidate._id === id)
    const permissionDenied = fail(
      HTTP_STATUS_UNAUTHORIZED,
      'users/permission-denied',
      'Permission denied'
    )

    if (recorded.method === 'GET' && id === undefined) {
      if (user.role === ROLE_PARTNER) return permissionDenied
      return this.listUsers(recorded, user)
    }

    if (target === undefined) {
      return fail(
        HTTP_STATUS_NOT_FOUND,
        'users/user-not-found',
        "This user doesn't exist"
      )
    }

    if (recorded.method === 'GET') return ok({ user: target })

    if (target._id === TRIAL_ACCOUNT_ID) return trialDenied()

    if (recorded.method === 'DELETE') {
      this.users.splice(this.users.indexOf(target), SINGLE_ITEM)
      return ok({})
    }

    if (target._id !== user._id && user.role !== ROLE_ADMIN)
      return permissionDenied

    Object.assign(target, body)
    return ok({ user: secureUser(target) })
  }
}
