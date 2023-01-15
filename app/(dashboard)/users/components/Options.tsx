import { useState } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import AddUser from 'app/(dashboard)/users/components/AddUser'

export const Options = (): JSX.Element => {
  const [addUserModalStatus, setAddUserModalStatus] = useState(false)

  return (
    <>
      <div className='hidden lg:flex gap-x-5'>
        <Button onClick={() => setAddUserModalStatus(!(addUserModalStatus))} variant='primary'><PlusIcon className='w-4 stroke-width-3' /></Button>
        <Button variant='primary'><MagnifyingGlassIcon className='w-4 stroke-width-3' /></Button>
      </div>
      <Modal dependency={addUserModalStatus} close={() => setAddUserModalStatus(!(addUserModalStatus))}>
        <AddUser modalStatus={addUserModalStatus} setModalStatus={setAddUserModalStatus} />
      </Modal>
    </>
  )
}
