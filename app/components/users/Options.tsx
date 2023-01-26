import { useContext } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'

import { ModalsContext } from 'context/ModalsContext'

export default function Options (): JSX.Element {
  const { setSearchModalStatus } = useContext(ModalsContext)

  return (
    <div className='flex items-start gap-x-5'>
      <Button onClick={() => setSearchModalStatus(true)} variant='primary'><MagnifyingGlassIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
