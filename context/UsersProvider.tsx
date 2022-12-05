'use client'

import { createContext, useState } from 'react'

export const UsersContext = createContext<any>({})

export const UsersProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState({})

  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  )
}
