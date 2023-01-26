import { useContext } from 'react'
import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/outline'
import notFoundImage from 'public/images/not-found.webp'
import Button from 'app/components/shared/Button'

import { DataContext } from 'context/DataContext'

export default function NotFound (): JSX.Element {
  const { setAddTaskModalStatus } = useContext(DataContext)

  return (
    <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
      <Image
        className='w-56'
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center font-secondaryFont text-dark-gray'>There are no tasks to display, but there is a solution... <br className='hidden lg:block' /> You can add the first one right now.</span>
      <Button onClick={() => setAddTaskModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
