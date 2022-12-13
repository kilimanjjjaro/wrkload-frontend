'use client'

import { createContext, useState } from 'react'

export const TasksContext = createContext<any>({})

export const TasksProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [tasks, setTasks] = useState([])
  const [showTaskModal, setShowTaskModal] = useState(false)

  return (
    <TasksContext.Provider value={{ showTaskModal, setShowTaskModal, tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}
