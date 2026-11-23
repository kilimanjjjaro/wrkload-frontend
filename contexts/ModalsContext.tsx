'use client'

import { createContext, useState, type Dispatch } from 'react'

import type { ChildrenInterface } from 'interfaces/components'
import { noop } from 'utils/noop'

interface ModalsContextValues {
  addDataModalStatus: boolean
  setAddDataModalStatus: Dispatch<React.SetStateAction<boolean>>
  updateDataModalStatus: boolean
  setUpdateDataModalStatus: Dispatch<React.SetStateAction<boolean>>
  deleteDataModalStatus: boolean
  setDeleteDataModalStatus: Dispatch<React.SetStateAction<boolean>>

  searchModalStatus: boolean
  setSearchModalStatus: Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_MODALS_CONTEXT_VALUES: ModalsContextValues = {
  addDataModalStatus: false,
  setAddDataModalStatus: noop,
  updateDataModalStatus: false,
  setUpdateDataModalStatus: noop,
  deleteDataModalStatus: false,
  setDeleteDataModalStatus: noop,

  searchModalStatus: false,
  setSearchModalStatus: noop
}

export const ModalsContext = createContext<ModalsContextValues>(
  DEFAULT_MODALS_CONTEXT_VALUES
)

const ModalsProvider = ({ children }: ChildrenInterface): React.JSX.Element => {
  const [addDataModalStatus, setAddDataModalStatus] = useState(false)
  const [updateDataModalStatus, setUpdateDataModalStatus] = useState(false)
  const [deleteDataModalStatus, setDeleteDataModalStatus] = useState(false)

  const [searchModalStatus, setSearchModalStatus] = useState(false)

  return (
    <ModalsContext.Provider
      value={{
        addDataModalStatus,
        setAddDataModalStatus,
        updateDataModalStatus,
        setUpdateDataModalStatus,
        deleteDataModalStatus,
        setDeleteDataModalStatus,
        searchModalStatus,
        setSearchModalStatus
      }}
    >
      {children}
    </ModalsContext.Provider>
  )
}

export default ModalsProvider
