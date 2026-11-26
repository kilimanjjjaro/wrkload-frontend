import type { InternalAxiosRequestConfig } from 'axios'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import api from 'utils/api'
import privateApi from 'utils/privateApi'
import login from 'services/auth/login'
import logout from 'services/auth/logout'
import register from 'services/auth/register'
import deleteAccount from 'services/auth/deleteAccount'
import { getTasks } from 'services/tasks/getTasks'
import searchTasks from 'services/tasks/searchTasks'
import { addTask } from 'services/tasks/addTask'
import { getProjects } from 'services/projects/getProjects'
import { getUser } from 'services/users/getUser'
import { getUsers } from 'services/users/getUsers'
import { updateUser } from 'services/users/updateUser'
import { updateAvatar } from 'services/users/updateAvatar'
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HTTP_STATUS_OK,
  ROLE_PARTNER
} from '../constants/api'
import {
  clearCookies,
  createAdapter,
  firstConfigOf,
  readCookie,
  readDecodedCookie
} from '../utils/axios'
import { NO_STORED_ITEMS } from '../constants/unit'

const USER = {
  _id: '6439b01cf35b6e22570cd000',
  email: 'kili@wrkload.test',
  username: 'Kili',
  avatar: 'https://wrkload.test/avatar.png',
  role: ROLE_PARTNER
}

const ACCESS_TOKEN = [
  'header',
  btoa(JSON.stringify({ uid: USER._id, role: USER.role, email: USER.email })),
  'signature'
].join('.')

const {
  defaults: { adapter: originalAdapter }
} = api

const respondWith = (data: unknown) => {
  const adapter = createAdapter(() => ({ status: HTTP_STATUS_OK, data }))
  api.defaults.adapter = adapter
  privateApi.defaults.adapter = adapter
  return adapter
}

const requestOf = (config: InternalAxiosRequestConfig) => ({
  method: config.method,
  url: config.url,
  data:
    typeof config.data === 'string'
      ? (JSON.parse(config.data) as unknown)
      : undefined
})

beforeEach(() => {
  clearCookies()
  window.localStorage.clear()
})

afterEach(() => {
  api.defaults.adapter = originalAdapter
  privateApi.defaults.adapter = originalAdapter
})

describe('auth services', () => {
  it('logs in, storing the access token cookie and the user', async () => {
    const adapter = respondWith({
      status: 'ok',
      user: USER,
      accessToken: ACCESS_TOKEN,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN
    })

    const response = await login({ email: USER.email, password: 'password' })

    expect(response.user).toEqual(USER)
    expect(requestOf(firstConfigOf(adapter))).toEqual({
      method: 'post',
      url: '/auth/login',
      data: { email: USER.email, password: 'password' }
    })
    expect(readDecodedCookie('accessToken')).toBe(ACCESS_TOKEN)
    expect(JSON.parse(window.localStorage.getItem('user') ?? '')).toEqual(USER)
  })

  it('logs out, clearing the session', async () => {
    document.cookie = `accessToken=${ACCESS_TOKEN}`
    document.cookie = 'isLogged=true'
    window.localStorage.setItem('user', JSON.stringify(USER))
    window.localStorage.setItem('selectedProject', 'Web')
    window.localStorage.setItem('darkMode', 'false')
    respondWith({ status: 'ok' })

    await logout()

    expect(readCookie('accessToken')).toBeUndefined()
    expect(readCookie('isLogged')).toBeUndefined()
    expect(window.localStorage.length).toBe(NO_STORED_ITEMS)
  })

  it('registers with the default avatar and role', async () => {
    const adapter = respondWith({ status: 'ok' })

    await register({
      username: 'Kili',
      email: USER.email,
      password: 'password'
    })

    expect(requestOf(firstConfigOf(adapter))).toEqual({
      method: 'post',
      url: '/auth/register',
      data: {
        username: 'Kili',
        email: USER.email,
        password: 'password',
        avatar: 'https://wrkload.kilimanjjjaro.com/images/default-avatar.svg',
        role: ROLE_PARTNER
      }
    })
  })

  it('deletes the account after checking the credentials', async () => {
    const adapter = respondWith({
      status: 'ok',
      user: USER,
      accessToken: ACCESS_TOKEN,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN
    })

    await deleteAccount({ email: USER.email, password: 'password' })

    expect(adapter.mock.calls.map(([config]) => requestOf(config))).toEqual([
      {
        method: 'post',
        url: '/auth/login',
        data: { email: USER.email, password: 'password' }
      },
      { method: 'delete', url: `/users/${USER._id}`, data: undefined }
    ])
  })
})

describe('data services', () => {
  it('requests the tasks of a project page by page', async () => {
    const adapter = respondWith({ status: 'ok', tasks: [] })

    await getTasks({ page: '2', project: 'Web' })
    await getTasks({ page: null, project: 'Web' })

    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual([
      '/tasks?project=Web&limit=11&page=2',
      '/tasks?project=Web&limit=11&page=1'
    ])
  })

  it('encodes the project and the search in the query', async () => {
    const adapter = respondWith({ status: 'ok', tasks: [] })

    await searchTasks({ project: 'R&D', query: 'a&b', page: null })

    expect(firstConfigOf(adapter).url).toBe(
      '/tasks?project=R%26D&search=a%26b&limit=8&page=1'
    )
  })

  it('sends only the task fields', async () => {
    const newTask = { _id: 'task', title: 'Landing' }
    const adapter = respondWith({ status: 'ok', newTask })

    const response = await addTask({
      _id: '',
      title: 'Landing',
      project: 'Web',
      timing: '01:00',
      deliveredAt: '2026-11-20',
      description: 'Notes',
      createdAt: ''
    })

    expect(response).toEqual(newTask)
    expect(requestOf(firstConfigOf(adapter))).toEqual({
      method: 'post',
      url: '/tasks',
      data: {
        title: 'Landing',
        project: 'Web',
        timing: '01:00',
        deliveredAt: '2026-11-20',
        description: 'Notes'
      }
    })
  })

  it('requests every project or a page of projects', async () => {
    const adapter = respondWith({ status: 'ok', projects: [] })

    await getProjects({ page: '1', noLimit: true })
    await getProjects({ page: '3' })

    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual([
      '/projects',
      '/projects?limit=11&page=3'
    ])
  })

  it('requests a page of users', async () => {
    const adapter = respondWith({ status: 'ok', users: [] })

    await getUsers({ page: null })

    expect(firstConfigOf(adapter).url).toBe('/users?limit=8&page=1')
  })

  it('gets the user of the access token', async () => {
    document.cookie = `accessToken=${ACCESS_TOKEN}`
    const adapter = respondWith({ status: 'ok', user: USER })

    expect(await getUser()).toEqual(USER)
    expect(firstConfigOf(adapter).url).toBe(`/users/${USER._id}`)
  })

  it('updates the avatar and stores the updated user', async () => {
    window.localStorage.setItem('user', JSON.stringify(USER))
    const updated = { ...USER, avatar: 'https://wrkload.test/new.png' }
    const adapter = respondWith({ status: 'ok', user: updated })

    expect(await updateAvatar({ avatar: updated.avatar })).toEqual(updated)
    expect(requestOf(firstConfigOf(adapter))).toEqual({
      method: 'patch',
      url: `/users/${USER._id}`,
      data: { avatar: updated.avatar }
    })
    expect(JSON.parse(window.localStorage.getItem('user') ?? '')).toEqual(
      updated
    )
  })

  it('returns the user updated by the api', async () => {
    const updated = { ...USER, username: 'New name' }
    respondWith({ status: 'ok', user: updated })

    expect(
      await updateUser({
        ...USER,
        username: 'New name',
        registeredAt: '',
        lastActiveAt: '',
        recentlyActive: false,
        confirmationToken: '',
        confirmationStatus: true
      })
    ).toEqual(updated)
  })
})
