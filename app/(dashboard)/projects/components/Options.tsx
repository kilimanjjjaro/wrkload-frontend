'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'

export const Options = (): JSX.Element => {
  const [modalStatus, setModalStatus] = useState(false)

  return (
    <div className='hidden lg:flex gap-x-5'>
      <Button onClick={() => setModalStatus(!(modalStatus))} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
      <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
      <Modal dependency={modalStatus} close={() => setModalStatus(!(modalStatus))}>
        {/* <AddProject modalStatus={modalStatus} setModalStatus={setModalStatus} /> */}
      </Modal>
    </div>
  )
}
