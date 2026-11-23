import { ROLE_ADMIN, ROLE_PARTNER, ROLE_TRIAL, TRIAL_ACCOUNT_ID } from './api'

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
  role: ROLE_TRIAL,
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

type TaskFields = Pick<
  FixtureTask,
  'title' | 'project' | 'timing' | 'deliveredAt' | 'description'
>

const task = (
  _id: string,
  fields: TaskFields,
  authorId = PARTNER._id
): FixtureTask => ({
  _id,
  authorId,
  createdAt: `${fields.deliveredAt}T09:00:00-03:00`,
  updatedAt: '',
  ...fields
})

export const TASKS = [
  task('64c000000000000000000001', {
    title: 'Landing page',
    project: 'Agency Site',
    timing: '02:30',
    deliveredAt: '2026-11-12',
    description: 'Hero, features and footer sections.'
  }),
  task('64c000000000000000000002', {
    title: 'Checkout flow',
    project: 'Agency Site',
    timing: '01:45',
    deliveredAt: '2026-11-05',
    description: ''
  }),
  task('64c000000000000000000003', {
    title: 'Pricing table',
    project: 'Agency Site',
    timing: '01:00',
    deliveredAt: '2026-10-20',
    description: 'Three plans with a yearly toggle.'
  }),
  task('64c000000000000000000004', {
    title: 'Contact form',
    project: 'Agency Site',
    timing: '00:45',
    deliveredAt: '2026-10-02',
    description: 'Validation and success message.'
  }),
  task('64c000000000000000000005', {
    title: 'Onboarding screens',
    project: 'Mobile App',
    timing: '03:00',
    deliveredAt: '2026-11-10',
    description: 'Four steps with illustrations.'
  }),
  task('64c000000000000000000006', {
    title: 'Push notifications',
    project: 'Mobile App',
    timing: '02:00',
    deliveredAt: '2026-10-28',
    description: ''
  }),
  task(
    '64c000000000000000000007',
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

type ProjectFields = Omit<FixtureProject, 'totalTasks'>

const project = (fields: ProjectFields): FixtureProject => ({
  ...fields,
  totalTasks: TASKS.filter((fixture) => fixture.project === fields.name).length
})

export const PROJECTS = [
  project({
    _id: '64b000000000000000000001',
    name: 'Agency Site',
    authorId: PARTNER._id,
    createdAt: '2026-05-01T10:00:00-03:00'
  }),
  project({
    _id: '64b000000000000000000002',
    name: 'Mobile App',
    authorId: PARTNER._id,
    createdAt: '2026-06-01T10:00:00-03:00'
  }),
  project({
    _id: '64b000000000000000000003',
    name: 'Branding',
    authorId: PARTNER._id,
    createdAt: '2026-07-01T10:00:00-03:00'
  }),
  project({
    _id: '64b000000000000000000004',
    name: 'Admin Panel',
    authorId: ADMIN._id,
    createdAt: '2026-02-01T10:00:00-03:00'
  })
]

const PAST_MONTH_TIMING_HOURS = 1
const PAST_MONTH_TASKS = 2
const CURRENT_MONTH_TIMING_HOURS = 4
const CURRENT_MONTH_TASKS = 2

export const TASK_STATS = {
  totalPastMonthTiming: PAST_MONTH_TIMING_HOURS,
  totalTasksPastMonth: PAST_MONTH_TASKS,
  totalCurrentMonthTiming: CURRENT_MONTH_TIMING_HOURS,
  totalTasksCurrentMonth: CURRENT_MONTH_TASKS,
  performance: 'better'
}

export const PROJECT_STATS = { bestProjectOfPastMonth: 'Agency Site' }
