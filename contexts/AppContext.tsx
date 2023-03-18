'use client'

import { createContext, useEffect, useState, Dispatch } from 'react'
import type { ChildrenInterface } from 'interfaces/components'
import type { TaskInterface } from 'interfaces/tasks/Task'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { UserInterface } from 'interfaces/users/User'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { INITIAL_PROJECT_STATE } from 'constants/projects'
import { INITIAL_USER_STATE } from 'constants/users'

interface AppContextValues {
  user: UserInterface | null
  setUser: Dispatch<React.SetStateAction<UserInterface | null>>
  selectedUser: UserInterface
  setSelectedUser: Dispatch<React.SetStateAction<UserInterface>>
  selectedTask: TaskInterface
  setSelectedTask: Dispatch<React.SetStateAction<TaskInterface>>
  selectedProject: ProjectInterface
  setSelectedProject: Dispatch<React.SetStateAction<ProjectInterface>>
  selectedProjectToFetch: string
  setSelectedProjectToFetch: Dispatch<React.SetStateAction<string>>
  shouldRenderStats: boolean
  setShouldRenderStats: Dispatch<React.SetStateAction<boolean>>
};

const DEFAULT_APP_CONTEXT_VALUE: AppContextValues = {
  user: null,
  setUser: () => {},
  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: () => {},
  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: () => {},
  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: () => {},
  selectedProjectToFetch: '',
  setSelectedProjectToFetch: () => {},
  shouldRenderStats: false,
  setShouldRenderStats: () => {}
}

export const AppContext = createContext<AppContextValues>(DEFAULT_APP_CONTEXT_VALUE)

const AppProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [selectedProjectToFetch, setSelectedProjectToFetch] = useState('')
  const [shouldRenderStats, setShouldRenderStats] = useState(true)

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem('user')
    console.log('userFromLocalStorage', userFromLocalStorage)

    if (userFromLocalStorage !== null) {
      setUser(JSON.parse(userFromLocalStorage))
    }

    const showStats = window.localStorage.getItem('showStats')
    if (showStats !== null) setShouldRenderStats(JSON.parse(showStats))
  }, [])

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      selectedUser,
      setSelectedUser,
      selectedTask,
      setSelectedTask,
      selectedProject,
      setSelectedProject,
      selectedProjectToFetch,
      setSelectedProjectToFetch,
      shouldRenderStats,
      setShouldRenderStats
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
