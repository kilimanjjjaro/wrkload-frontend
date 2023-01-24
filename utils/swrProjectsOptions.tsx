import type { ProjectInterface } from 'interfaces/projects/Project'

export const addProjectOptions = (newProject: ProjectInterface): any => {
  return {
    optimisticData: (projects: ProjectInterface[]) => [...projects, newProject]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    rollbackOnError: true,
    populateCache: (added: ProjectInterface, projects: ProjectInterface[]) => [...projects, added]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    revalidate: false
  }
}

export const updateProjectOptions = (updatedProject: ProjectInterface): any => {
  return {
    optimisticData: (projects: ProjectInterface[]) => {
      const prevProjects = projects.filter(project => {
        return project._id !== updatedProject._id
      })
      return [...prevProjects, updatedProject]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    },
    rollbackOnError: true,
    populateCache: (updated: ProjectInterface, projects: ProjectInterface[]) => {
      const prevProjects = projects.filter(project => {
        return project._id !== updatedProject._id
      })
      return [...prevProjects, updated]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
