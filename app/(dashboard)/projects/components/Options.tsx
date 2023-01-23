'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddProject from 'app/(dashboard)/projects/components/AddProject'
import SearchForm from 'app/components/shared/SearchForm'

export const Options = (): JSX.Element => {
  const [addProjectModalStatus, setAddProjectModalStatus] = useState(false)
  const [searchModalStatus, setSearchModalStatus] = useState(false)

  return (
    <>
      <div className='flex items-start gap-x-5'>
        <Button onClick={() => setAddProjectModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
        <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      </div>
      <Modal modalStatus={addProjectModalStatus} setModalStatus={setAddProjectModalStatus}>
        <AddProject setModalStatus={setAddProjectModalStatus} />
      </Modal>
      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='project' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
