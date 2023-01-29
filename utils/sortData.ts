import type { TaskInterface } from 'interfaces/tasks/Task'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { UserInterface } from 'interfaces/users/User'

export function sortTasks (tasks: TaskInterface[]): TaskInterface[] {
  return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function sortProjects (projects: ProjectInterface[]): ProjectInterface[] {
  return projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function sortUsers (users: UserInterface[]): UserInterface[] {
  return users.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
}
