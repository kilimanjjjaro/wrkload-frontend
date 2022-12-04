'use client'

import { createContext, useState } from 'react'

export const DataContext = createContext<any>({})

const DataProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState({})
  const [showTaskModal, setShowTaskModal] = useState(false)

  return (
    <DataContext.Provider value={{ user, setUser, showTaskModal, setShowTaskModal }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
