import { sortProjects } from './sortData'

import type { ProjectInterface } from 'interfaces/projects/Project'

export const addProjectOptions = (newProject: ProjectInterface): any => {
  return {
    optimisticData: (projects: ProjectInterface[]) => sortProjects([...projects, newProject]),
    rollbackOnError: true,
    populateCache: (added: ProjectInterface, projects: ProjectInterface[]) => sortProjects([...projects, added]),
    revalidate: false
  }
}

export const updateProjectOptions = (updatedProject: ProjectInterface): any => {
  return {
    optimisticData: (projects: ProjectInterface[]) => {
      const prevProjects = projects.filter(project => {
        return project._id !== updatedProject._id
      })
      return sortProjects([...prevProjects, updatedProject])
    },
    rollbackOnError: true,
    populateCache: (updated: ProjectInterface, projects: ProjectInterface[]) => {
      const prevProjects = projects.filter(project => {
        return project._id !== updatedProject._id
      })
      return sortProjects([...prevProjects, updated])
    },
    revalidate: false
  }
}

export const deleteProjectOptions = (_id: string): any => {
  return {
    optimisticData: (projects: ProjectInterface[]) => {
      return projects.filter(project => {
        return project._id !== _id
      })
    },
    rollbackOnError: true,
    populateCache: (_: null, projects: ProjectInterface[]) => {
      return projects.filter(project => {
        return project._id !== _id
      })
    },
    revalidate: false
  }
}
