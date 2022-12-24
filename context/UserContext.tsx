'use client'

import { createContext, SetStateAction, useContext, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'

interface UserContextInterface {
  user: null
  setUser: (user: SetStateAction<null>) => void
}

const CONTEXT_DEFAULT_VALUES: UserContextInterface = {
  user: null,
  setUser: () => {}
}

export const UserContext = createContext<UserContextInterface>(CONTEXT_DEFAULT_VALUES)

export const useUser = (): UserContextInterface => {
  return useContext(UserContext)
}

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const accessToken = getCookie('accessToken')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (user !== null && accessToken !== undefined) {
      setUser(JSON.parse(user))
    }
  }, [accessToken])

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
