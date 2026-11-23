import { describe, expect, it } from 'vitest'
import { INITIAL_PROJECT_STATE } from 'constants/projects'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { INITIAL_USER_STATE } from 'constants/users'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { TaskInterface } from 'interfaces/tasks/Task'
import type { UserInterface } from 'interfaces/users/User'
import { sortProjects, sortTasks, sortUsers } from 'utils/sortData'

const taskDeliveredAt = (deliveredAt: string): TaskInterface => ({
  ...INITIAL_TASK_STATE,
  deliveredAt
})

const projectCreatedAt = (createdAt: string): ProjectInterface => ({
  ...INITIAL_PROJECT_STATE,
  createdAt
})

const userRegisteredAt = (registeredAt: string): UserInterface => ({
  ...INITIAL_USER_STATE,
  registeredAt
})

describe('sortData', () => {
  it('sorts the tasks from the latest delivery date', () => {
    const tasks = [
      taskDeliveredAt('2026-11-01'),
      taskDeliveredAt('2026-11-20'),
      taskDeliveredAt('2026-10-15')
    ]

    expect(sortTasks(tasks).map(({ deliveredAt }) => deliveredAt)).toEqual([
      '2026-11-20',
      '2026-11-01',
      '2026-10-15'
    ])
  })

  it('sorts the projects from the latest created', () => {
    const projects = [
      projectCreatedAt('2026-01-01T00:00:00-03:00'),
      projectCreatedAt('2026-03-01T00:00:00-03:00')
    ]

    expect(sortProjects(projects).map(({ createdAt }) => createdAt)).toEqual([
      '2026-03-01T00:00:00-03:00',
      '2026-01-01T00:00:00-03:00'
    ])
  })

  it('sorts the users from the latest registered', () => {
    const users = [
      userRegisteredAt('2025-05-01T00:00:00-03:00'),
      userRegisteredAt('2026-05-01T00:00:00-03:00')
    ]

    expect(sortUsers(users).map(({ registeredAt }) => registeredAt)).toEqual([
      '2026-05-01T00:00:00-03:00',
      '2025-05-01T00:00:00-03:00'
    ])
  })
})
