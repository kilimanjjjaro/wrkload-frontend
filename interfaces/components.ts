import { Dispatch, SetStateAction } from 'react'

export interface LayoutProps {
  children: React.ReactNode
}

export interface StatsInterface {
  type: string
  value: string
  avg?: string
}

export interface ModalInterface {
  children: React.ReactNode
  dependency: boolean
  close: () => void
}

export interface UserContextInterface {
  user: null
  setUser: Dispatch<SetStateAction<void>>
}
