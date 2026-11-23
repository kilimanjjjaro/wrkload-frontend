import { ROLE_ADMIN, ROLE_PARTNER, TRIAL_ACCOUNT_ID } from './api'

export interface FixtureUser {
  _id: string
  username: string
  email: string
  avatar: string
  role: number
  registeredAt: string
  lastActiveAt: string
  recentlyActive: boolean
  confirmationStatus: boolean
}

export interface FixtureProject {
  _id: string
  name: string
  authorId: string
  createdAt: string
  totalTasks: number
}

export interface FixtureTask {
  _id: string
  title: string
  authorId: string
  createdAt: string
  updatedAt: string
  project: string
  timing: string
  deliveredAt: string
  description: string
}

const AVATAR = '/images/default-avatar.svg'

export const PARTNER: FixtureUser = {
  _id: '64a000000000000000000001',
  username: 'Alice',
  email: 'alice@wrkload.test',
  avatar: AVATAR,
  role: ROLE_PARTNER,
  registeredAt: '2026-03-01T10:00:00-03:00',
  lastActiveAt: '2026-11-15T11:30:00-03:00',
  recentlyActive: true,
  confirmationStatus: true
}

export const ADMIN: FixtureUser = {
  _id: '64a000000000000000000002',
  username: 'Bob',
  email: 'bob@wrkload.test',
  avatar: AVATAR,
  role: ROLE_ADMIN,
  registeredAt: '2026-01-10T10:00:00-03:00',
  lastActiveAt: '2026-11-10T09:00:00-03:00',
  recentlyActive: false,
  confirmationStatus: true
}

export const TRIAL: FixtureUser = {
  _id: TRIAL_ACCOUNT_ID,
  username: 'Trial',
  email: 'wrkload@kilimanjjjaro.com',
  avatar: AVATAR,
  role: 2,
  registeredAt: '2025-04-14T10:00:00-03:00',
  lastActiveAt: '2026-11-14T18:00:00-03:00',
  recentlyActive: false,
  confirmationStatus: true
}

export const UNCONFIRMED: FixtureUser = {
  _id: '64a000000000000000000003',
  username: 'Carol',
  email: 'carol@wrkload.test',
  avatar: AVATAR,
  role: ROLE_PARTNER,
  registeredAt: '2026-11-14T10:00:00-03:00',
  lastActiveAt: '',
  recentlyActive: false,
  confirmationStatus: false
}

export const USERS = [PARTNER, ADMIN, TRIAL, UNCONFIRMED]

export const PASSWORDS: Record<string, string> = {
  [PARTNER.email]: 'alice-password',
  [ADMIN.email]: 'bob-password',
  [TRIAL.email]: 'Ec@z92!QWKFkmhY',
  [UNCONFIRMED.email]: 'carol-password'
}

const project = (
  index: number,
  name: string,
  authorId: string,
  createdAt: string,
  totalTasks: number
): FixtureProject => ({
  _id: `64b00000000000000000000${index}`,
  name,
  authorId,
  createdAt,
  totalTasks
})

export const PROJECTS = [
  project(1, 'Agency Site', PARTNER._id, '2026-05-01T10:00:00-03:00', 4),
  project(2, 'Mobile App', PARTNER._id, '2026-06-01T10:00:00-03:00', 2),
  project(3, 'Branding', PARTNER._id, '2026-07-01T10:00:00-03:00', 0),
  project(4, 'Admin Panel', ADMIN._id, '2026-02-01T10:00:00-03:00', 1)
]

const task = (
  index: number,
  fields: Pick<
    FixtureTask,
    'title' | 'project' | 'timing' | 'deliveredAt' | 'description'
  >,
  authorId = PARTNER._id
): FixtureTask => ({
  _id: `64c0000000000000000000${String(index).padStart(2, '0')}`,
  authorId,
  createdAt: `${fields.deliveredAt}T09:00:00-03:00`,
  updatedAt: '',
  ...fields
})

export const TASKS = [
  task(1, {
    title: 'Landing page',
    project: 'Agency Site',
    timing: '02:30',
    deliveredAt: '2026-11-12',
    description: 'Hero, features and footer sections.'
  }),
  task(2, {
    title: 'Checkout flow',
    project: 'Agency Site',
    timing: '01:45',
    deliveredAt: '2026-11-05',
    description: ''
  }),
  task(3, {
    title: 'Pricing table',
    project: 'Agency Site',
    timing: '01:00',
    deliveredAt: '2026-10-20',
    description: 'Three plans with a yearly toggle.'
  }),
  task(4, {
    title: 'Contact form',
    project: 'Agency Site',
    timing: '00:45',
    deliveredAt: '2026-10-02',
    description: 'Validation and success message.'
  }),
  task(5, {
    title: 'Onboarding screens',
    project: 'Mobile App',
    timing: '03:00',
    deliveredAt: '2026-11-10',
    description: 'Four steps with illustrations.'
  }),
  task(6, {
    title: 'Push notifications',
    project: 'Mobile App',
    timing: '02:00',
    deliveredAt: '2026-10-28',
    description: ''
  }),
  task(
    7,
    {
      title: 'Users table',
      project: 'Admin Panel',
      timing: '04:00',
      deliveredAt: '2026-11-01',
      description: 'Sorting and pagination.'
    },
    ADMIN._id
  )
]

export const TASK_STATS = {
  totalPastMonthTiming: 1,
  totalTasksPastMonth: 2,
  totalCurrentMonthTiming: 4,
  totalTasksCurrentMonth: 2,
  performance: 'better'
}

export const PROJECT_STATS = { bestProjectOfPastMonth: 'Agency Site' }
