'use client'

import { createContext, useEffect, useState, Dispatch } from 'react'
import { getCookies } from 'cookies-next'
import type { ChildrenInterface } from 'interfaces/components'
import type { TaskInterface } from 'interfaces/tasks/Task'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { UserInterface } from 'interfaces/users/User'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { INITIAL_PROJECT_STATE } from 'constants/projects'
import { INITIAL_USER_STATE } from 'constants/users'
import refreshAccessToken from 'services/refreshAccessToken'

interface AppContextValues {
  selectedUser: UserInterface
  setSelectedUser: Dispatch<React.SetStateAction<UserInterface>>
  isLogged: boolean
  setIsLogged: Dispatch<React.SetStateAction<boolean>>
  selectedTask: TaskInterface
  setSelectedTask: Dispatch<React.SetStateAction<TaskInterface>>
  selectedProject: ProjectInterface
  setSelectedProject: Dispatch<React.SetStateAction<ProjectInterface>>
  selectedProjectToFetch: string
  setSelectedProjectToFetch: Dispatch<React.SetStateAction<string>>
  shouldRenderStats: boolean
  setShouldRenderStats: Dispatch<React.SetStateAction<boolean>>
  error: string
  setError: Dispatch<React.SetStateAction<string>>
  success: string
  setSuccess: Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  setIsLoading: Dispatch<React.SetStateAction<boolean>>
};

const DEFAULT_APP_CONTEXT_VALUE: AppContextValues = {
  isLogged: false,
  setIsLogged: () => {},
  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: () => {},
  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: () => {},
  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: () => {},
  selectedProjectToFetch: '',
  setSelectedProjectToFetch: () => {},
  shouldRenderStats: false,
  setShouldRenderStats: () => {},
  error: '',
  setError: () => {},
  success: '',
  setSuccess: () => {},
  isLoading: false,
  setIsLoading: () => {}
}

export const AppContext = createContext<AppContextValues>(DEFAULT_APP_CONTEXT_VALUE)

const AppProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)
  const [isLogged, setIsLogged] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [selectedProjectToFetch, setSelectedProjectToFetch] = useState('')
  const [shouldRenderStats, setShouldRenderStats] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken, refreshToken } = getCookies()

  useEffect(() => {
    const showStats = window.localStorage.getItem('showStats')
    if (showStats !== null) setShouldRenderStats(JSON.parse(showStats))

    if (accessToken === undefined && refreshToken !== undefined) {
      void refreshAccessToken()
      setIsLogged(true)
    }
  }, [])

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [accessToken])

  return (
    <AppContext.Provider value={{
      selectedUser,
      setSelectedUser,
      isLogged,
      setIsLogged,
      selectedTask,
      setSelectedTask,
      selectedProject,
      setSelectedProject,
      selectedProjectToFetch,
      setSelectedProjectToFetch,
      shouldRenderStats,
      setShouldRenderStats,
      error,
      setError,
      success,
      setSuccess,
      isLoading,
      setIsLoading
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
