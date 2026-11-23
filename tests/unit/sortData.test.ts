import { describe, expect, it } from 'vitest'
import { sortProjects, sortTasks, sortUsers } from 'utils/sortData'

describe('sortData', () => {
  it('sorts the tasks from the latest delivery date', () => {
    const tasks = [
      { deliveredAt: '2026-11-01' },
      { deliveredAt: '2026-11-20' },
      { deliveredAt: '2026-10-15' }
    ]

    expect(
      sortTasks(tasks as Parameters<typeof sortTasks>[0]).map(
        ({ deliveredAt }) => deliveredAt
      )
    ).toEqual(['2026-11-20', '2026-11-01', '2026-10-15'])
  })

  it('sorts the projects from the latest created', () => {
    const projects = [
      { createdAt: '2026-01-01T00:00:00-03:00' },
      { createdAt: '2026-03-01T00:00:00-03:00' }
    ]

    expect(
      sortProjects(projects as Parameters<typeof sortProjects>[0]).map(
        ({ createdAt }) => createdAt
      )
    ).toEqual(['2026-03-01T00:00:00-03:00', '2026-01-01T00:00:00-03:00'])
  })

  it('sorts the users from the latest registered', () => {
    const users = [
      { registeredAt: '2025-05-01T00:00:00-03:00' },
      { registeredAt: '2026-05-01T00:00:00-03:00' }
    ]

    expect(
      sortUsers(users as Parameters<typeof sortUsers>[0]).map(
        ({ registeredAt }) => registeredAt
      )
    ).toEqual(['2026-05-01T00:00:00-03:00', '2025-05-01T00:00:00-03:00'])
  })
})
