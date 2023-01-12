'use client'

import { getCookie } from 'cookies-next'
import { createContext, useEffect, useState } from 'react'

interface DataContextValues {
  isLogged: boolean
  setIsLogged: (isLogged: boolean) => void
};

const DEFAULT_VALUE: DataContextValues = {
  isLogged: false,
  setIsLogged: () => {}
}

export const DataContext = createContext<DataContextValues>(DEFAULT_VALUE)

const DataProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const accessToken = getCookie('accessToken')

  useEffect(() => {
    if (accessToken !== undefined) {
      setIsLogged(true)
    }
  }, [accessToken])

  return (
    <DataContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
