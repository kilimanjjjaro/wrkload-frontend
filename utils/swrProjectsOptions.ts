import type { MutatorOptions } from 'swr'
import { sortProjects } from './sortData'

import type {
  FullProjectInterface,
  ProjectInterface
} from 'interfaces/projects/Project'

export const addProjectOptions = (
  newProject: ProjectInterface
): MutatorOptions => ({
  optimisticData: (data: FullProjectInterface) => ({
    ...data,
    projects: sortProjects([...data.projects, newProject])
  }),
  rollbackOnError: true,
  populateCache: (added: ProjectInterface, data: FullProjectInterface) => ({
    ...data,
    projects: sortProjects([...data.projects, added])
  })
})

export const updateProjectOptions = (
  updatedProject: ProjectInterface
): MutatorOptions => ({
  optimisticData: (data: FullProjectInterface) => {
    const prevProjects = data.projects.filter(
      (project) => project._id !== updatedProject._id
    )
    return {
      ...data,
      projects: sortProjects([...prevProjects, updatedProject])
    }
  },
  rollbackOnError: true,
  populateCache: (updated: ProjectInterface, data: FullProjectInterface) => {
    const prevProjects = data.projects.filter(
      (project) => project._id !== updatedProject._id
    )
    return { ...data, projects: sortProjects([...prevProjects, updated]) }
  }
})

export const deleteProjectOptions = (_id: string): MutatorOptions => ({
  optimisticData: (data: FullProjectInterface) => ({
    ...data,
    projects: data.projects.filter((project) => project._id !== _id)
  }),
  rollbackOnError: true,
  populateCache: (_: null, data: FullProjectInterface) => ({
    ...data,
    projects: data.projects.filter((project) => project._id !== _id)
  })
})
