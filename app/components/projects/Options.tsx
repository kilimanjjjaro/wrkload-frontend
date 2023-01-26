'use client'

import { useContext, useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import SearchForm from 'app/components/shared/SearchForm'

import { DataContext } from 'context/DataContext'

export default function Options (): JSX.Element {
  const { setAddProjectModalStatus } = useContext(DataContext)
  const [searchModalStatus, setSearchModalStatus] = useState(false)

  return (
    <>
      <div className='flex items-start gap-x-5'>
        <Button onClick={() => setAddProjectModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
        <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      </div>
      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='project' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
