'use client'

import { createContext, useContext, useState } from 'react'
import { UserContextInterface } from 'interfaces/components'

const CONTEXT_DEFAULT_VALUES: UserContextInterface = {
  user: null,
  setUser: () => {}
}

export const UserContext = createContext<UserContextInterface>(CONTEXT_DEFAULT_VALUES)

export const useUser = (): UserContextInterface => {
  return useContext(UserContext)
}

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}
    >{children}
    </UserContext.Provider>
  )
}

export default UserProvider
