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
  addTaskModalStatus: boolean
  setAddTaskModalStatus: Dispatch<SetStateAction<boolean>>
  updateTaskModalStatus: boolean
  setUpdateTaskModalStatus: Dispatch<SetStateAction<boolean>>
  deleteTaskModalStatus: boolean
  setDeleteTaskModalStatus: Dispatch<SetStateAction<boolean>>

  selectedProject: ProjectInterface
  setSelectedProject: Dispatch<SetStateAction<ProjectInterface>>
  addProjectModalStatus: boolean
  setAddProjectModalStatus: Dispatch<SetStateAction<boolean>>
  updateProjectModalStatus: boolean
  setUpdateProjectModalStatus: Dispatch<SetStateAction<boolean>>
  deleteProjectModalStatus: boolean
  setDeleteProjectModalStatus: Dispatch<SetStateAction<boolean>>

  selectedUser: UserInterface
  setSelectedUser: Dispatch<SetStateAction<UserInterface>>
  updateUserModalStatus: boolean
  setUpdateUserModalStatus: Dispatch<SetStateAction<boolean>>
  deleteUserModalStatus: boolean
  setDeleteUserModalStatus: Dispatch<SetStateAction<boolean>>

  searchModalStatus: boolean
  setSearchModalStatus: Dispatch<SetStateAction<boolean>>
};

const DEFAULT_VALUE: DataContextValues = {
  isLogged: false,
  setIsLogged: () => {},

  selectedTask: INITIAL_TASK_STATE,
  setSelectedTask: () => {},
  addTaskModalStatus: false,
  setAddTaskModalStatus: () => {},
  updateTaskModalStatus: false,
  setUpdateTaskModalStatus: () => {},
  deleteTaskModalStatus: false,
  setDeleteTaskModalStatus: () => {},

  selectedProject: INITIAL_PROJECT_STATE,
  setSelectedProject: () => {},
  addProjectModalStatus: false,
  setAddProjectModalStatus: () => {},
  updateProjectModalStatus: false,
  setUpdateProjectModalStatus: () => {},
  deleteProjectModalStatus: false,
  setDeleteProjectModalStatus: () => {},

  selectedUser: INITIAL_USER_STATE,
  setSelectedUser: () => {},
  updateUserModalStatus: false,
  setUpdateUserModalStatus: () => {},
  deleteUserModalStatus: false,
  setDeleteUserModalStatus: () => {},

  searchModalStatus: false,
  setSearchModalStatus: () => {}
}

export const DataContext = createContext<DataContextValues>(DEFAULT_VALUE)

const DataProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [selectedTask, setSelectedTask] = useState<TaskInterface>(INITIAL_TASK_STATE)
  const [addTaskModalStatus, setAddTaskModalStatus] = useState(false)
  const [updateTaskModalStatus, setUpdateTaskModalStatus] = useState(false)
  const [deleteTaskModalStatus, setDeleteTaskModalStatus] = useState(false)

  const [selectedProject, setSelectedProject] = useState<ProjectInterface>(INITIAL_PROJECT_STATE)
  const [addProjectModalStatus, setAddProjectModalStatus] = useState(false)
  const [updateProjectModalStatus, setUpdateProjectModalStatus] = useState(false)
  const [deleteProjectModalStatus, setDeleteProjectModalStatus] = useState(false)

  const [selectedUser, setSelectedUser] = useState<UserInterface>(INITIAL_USER_STATE)
  const [updateUserModalStatus, setUpdateUserModalStatus] = useState(false)
  const [deleteUserModalStatus, setDeleteUserModalStatus] = useState(false)

  const [searchModalStatus, setSearchModalStatus] = useState(false)

  const [isLogged, setIsLogged] = useState(false)
  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsLogged(true)
    }
  }, [accessToken])

  return (
    <DataContext.Provider value={{ isLogged, setIsLogged, selectedTask, setSelectedTask, addTaskModalStatus, setAddTaskModalStatus, updateTaskModalStatus, setUpdateTaskModalStatus, deleteTaskModalStatus, setDeleteTaskModalStatus, selectedProject, setSelectedProject, addProjectModalStatus, setAddProjectModalStatus, updateProjectModalStatus, setUpdateProjectModalStatus, deleteProjectModalStatus, setDeleteProjectModalStatus, selectedUser, setSelectedUser, updateUserModalStatus, setUpdateUserModalStatus, deleteUserModalStatus, setDeleteUserModalStatus, searchModalStatus, setSearchModalStatus }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
