import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Modal from 'app/components/shared/Modal'
import SearchForm from 'app/components/shared/SearchForm'

export default function Options (): JSX.Element {
  const [searchModalStatus, setSearchModalStatus] = useState(false)

  return (
    <>
      <div className='flex items-start gap-x-5'>
        <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
      </div>
      <Modal modalStatus={searchModalStatus} setModalStatus={setSearchModalStatus}>
        <SearchForm type='user' setModalStatus={setSearchModalStatus} />
      </Modal>
    </>
  )
}
