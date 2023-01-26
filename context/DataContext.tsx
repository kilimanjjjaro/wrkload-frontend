'use client'

import { createContext, useEffect, useState, Dispatch, SetStateAction } from 'react'
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
  setIsLogged: Dispatch<SetStateAction<boolean>>

  selectedTask: TaskInterface
  setSelectedTask: Dispatch<SetStateAction<TaskInterface>>
  selectedProject: ProjectInterface
  setSelectedProject: Dispatch<SetStateAction<ProjectInterface>>
  selectedUser: UserInterface
  setSelectedUser: Dispatch<SetStateAction<UserInterface>>
};

const DEFAULT_DATA_CONTEXT_VALUE: DataContextValues = {
  isLogged: false,
  setIsLogged: () => {},

  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: () => {},
  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: () => {},
  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: () => {}
}

export const DataContext = createContext<DataContextValues>(DEFAULT_DATA_CONTEXT_VALUE)

const DataProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)

  const [isLogged, setIsLogged] = useState(false)
  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsLogged(true)
    }
  }, [accessToken])

  return (
    <DataContext.Provider value={{ isLogged, setIsLogged, selectedTask, setSelectedTask, selectedProject, setSelectedProject, selectedUser, setSelectedUser }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
