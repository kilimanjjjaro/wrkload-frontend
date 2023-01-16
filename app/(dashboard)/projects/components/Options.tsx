'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddProject from 'app/(dashboard)/projects/components/AddProject'

export const Options = (): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(false)

  return (
    <div className='hidden lg:flex gap-x-5'>
      <Button onClick={() => setModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
      <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
      <Modal dependency={modalStatus} close={() => setModalStatus(false)}>
        <AddProject modalStatus={modalStatus} setModalStatus={setModalStatus} />
      </Modal>
    </div>
  )
}
