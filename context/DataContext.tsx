'use client'

import { createContext, useEffect, useState, Dispatch } from 'react'
import { getCookie } from 'cookies-next'

import type { ChildrenInterface } from 'interfaces/components'
import type { TaskInterface } from 'interfaces/tasks/Task'
import type { ProjectInterface } from 'interfaces/projects/Project'
import type { UserInterface } from 'interfaces/users/User'
import { INITIAL_TASK_STATE } from 'constants/tasks'
import { INITIAL_PROJECT_STATE } from 'constants/projects'
import { INITIAL_USER_STATE } from 'constants/users'

interface DataContextValues {
  isLogged: boolean
  setIsLogged: Dispatch<React.SetStateAction<boolean>>

  selectedTask: TaskInterface
  setSelectedTask: Dispatch<React.SetStateAction<TaskInterface>>
  selectedProject: ProjectInterface
  setSelectedProject: Dispatch<React.SetStateAction<ProjectInterface>>
  selectedUser: UserInterface
  setSelectedUser: Dispatch<React.SetStateAction<UserInterface>>

  shouldRenderStats: boolean
  setShouldRenderStats: Dispatch<React.SetStateAction<boolean>>
};

const DEFAULT_DATA_CONTEXT_VALUE: DataContextValues = {
  isLogged: false,
  setIsLogged: () => {},

  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: () => {},
  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: () => {},
  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: () => {},

  shouldRenderStats: false,
  setShouldRenderStats: () => {}
}

export const DataContext = createContext<DataContextValues>(DEFAULT_DATA_CONTEXT_VALUE)

const DataProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)
  const [isLogged, setIsLogged] = useState(false)
  const accessToken = getCookie('accessToken')
  const [shouldRenderStats, setShouldRenderStats] = useState(() => {
    const showStats = window.localStorage.getItem('showStats')
    if (showStats !== null) {
      return JSON.parse(showStats)
    } else {
      return true
    }
  })

  useEffect(() => {
    window.localStorage.setItem('showStats', JSON.stringify(shouldRenderStats))
  }, [shouldRenderStats])

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [accessToken])

  return (
    <DataContext.Provider value={{ isLogged, setIsLogged, selectedTask, setSelectedTask, selectedProject, setSelectedProject, selectedUser, setSelectedUser, shouldRenderStats, setShouldRenderStats }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
