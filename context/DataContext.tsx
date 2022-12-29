'use client'

import { createContext, useState } from 'react'

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

  return (
    <DataContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
