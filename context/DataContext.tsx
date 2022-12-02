'use client'
import { createContext } from 'react'
import { signal } from '@preact/signals-react'
import { LayoutProps, UserContextInterface } from 'interfaces/components'

export const DataContext = createContext<UserContextInterface | null>(null)

const DataProvider = ({ children }: LayoutProps): JSX.Element => {
  const user = signal({ email: '', password: '' })

  return (
    <DataContext.Provider value={{ user }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
