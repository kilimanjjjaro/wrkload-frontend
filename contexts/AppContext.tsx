'use client'

import { createContext, useEffect, useState, useSyncExternalStore, type Dispatch } from 'react'
import { setCookie } from 'cookies-next/client'
import type { ChildrenInterface } from 'interfaces/components'
import type { TaskInterface } from 'interfaces/tasks/Task'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { SecureUserInterface, UserInterface } from 'interfaces/users/User'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { INITIAL_PROJECT_STATE } from 'constants/projects'
import { INITIAL_USER_STATE } from 'constants/users'
import useStoredState from 'hooks/useStoredState'
import { noop, subscribeToNothing } from 'utils/noop'
import { parseStoredBoolean, parseStoredUser } from 'utils/storage'
import { LOGGED_IN_MAX_AGE_SECONDS } from 'constants/auth'

interface AppContextValues {
  user: SecureUserInterface | null
  setUser: Dispatch<React.SetStateAction<SecureUserInterface | null>>
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
  isLoggingIn: boolean
  setIsLoggingIn: Dispatch<React.SetStateAction<boolean>>
  trialMode: boolean
  setTrialMode: Dispatch<React.SetStateAction<boolean>>
};

const DEFAULT_APP_CONTEXT_VALUE: AppContextValues = {
  user: null,
  setUser: noop,
  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: noop,
  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: noop,
  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: noop,
  selectedProjectToFetch: '',
  setSelectedProjectToFetch: noop,
  shouldRenderStats: false,
  setShouldRenderStats: noop,
  isLoggingIn: false,
  setIsLoggingIn: noop,
  trialMode: false,
  setTrialMode: noop
}

const parseText = (stored: string): string => stored

export const AppContext = createContext<AppContextValues>(DEFAULT_APP_CONTEXT_VALUE)

const AppProvider = ({ children }: ChildrenInterface): React.JSX.Element => {
  const [user, setUser] = useStoredState<SecureUserInterface | null>('user', parseStoredUser, null)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [selectedProjectToFetch, setSelectedProjectToFetch] = useStoredState('selectedProject', parseText, '')
  const [shouldRenderStats, setShouldRenderStats] = useStoredState('showStats', parseStoredBoolean, true)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [trialMode, setTrialMode] = useState(false)

  const hasStoredUser = useSyncExternalStore(
    subscribeToNothing,
    () => window.localStorage.getItem('user') !== null,
    () => false
  )

  useEffect(() => {
    if (hasStoredUser) {
      setCookie('isLogged', true, {
        maxAge: LOGGED_IN_MAX_AGE_SECONDS
      })
    }
  }, [hasStoredUser])

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
      setShouldRenderStats,
      isLoggingIn,
      setIsLoggingIn,
      trialMode,
      setTrialMode
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
