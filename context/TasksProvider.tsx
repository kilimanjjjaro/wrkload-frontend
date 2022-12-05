'use client'

import { createContext, useState } from 'react'

export const TasksContext = createContext<any>({})

export const TasksProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [showTaskModal, setShowTaskModal] = useState(false)

  return (
    <TasksContext.Provider value={{ showTaskModal, setShowTaskModal }}>
      {children}
    </TasksContext.Provider>
  )
}
