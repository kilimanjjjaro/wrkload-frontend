'use client'

import { createContext, useState, Dispatch, SetStateAction } from 'react'

import type { ChildrenInterface } from 'interfaces/components'

interface ModalsContextValues {
  addDataModalStatus: boolean
  setAddDataModalStatus: Dispatch<SetStateAction<boolean>>
  updateDataModalStatus: boolean
  setUpdateDataModalStatus: Dispatch<SetStateAction<boolean>>
  deleteDataModalStatus: boolean
  setDeleteDataModalStatus: Dispatch<SetStateAction<boolean>>

  searchModalStatus: boolean
  setSearchModalStatus: Dispatch<SetStateAction<boolean>>
};

const DEFAULT_MODALS_CONTEXT_VALUES: ModalsContextValues = {
  addDataModalStatus: false,
  setAddDataModalStatus: () => {},
  updateDataModalStatus: false,
  setUpdateDataModalStatus: () => {},
  deleteDataModalStatus: false,
  setDeleteDataModalStatus: () => {},

  searchModalStatus: false,
  setSearchModalStatus: () => {}
}

export const ModalsContext = createContext<ModalsContextValues>(DEFAULT_MODALS_CONTEXT_VALUES)

const ModalsProvider = ({ children }: ChildrenInterface): JSX.Element => {
  const [addDataModalStatus, setAddDataModalStatus] = useState(false)
  const [updateDataModalStatus, setUpdateDataModalStatus] = useState(false)
  const [deleteDataModalStatus, setDeleteDataModalStatus] = useState(false)

  const [searchModalStatus, setSearchModalStatus] = useState(false)

  return (
    <ModalsContext.Provider value={{ addDataModalStatus, setAddDataModalStatus, updateDataModalStatus, setUpdateDataModalStatus, deleteDataModalStatus, setDeleteDataModalStatus, searchModalStatus, setSearchModalStatus }}>
      {children}
    </ModalsContext.Provider>
  )
}

export default ModalsProvider
