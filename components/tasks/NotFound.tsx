import { useContext } from 'react'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { PlusIcon } from '@heroicons/react/24/outline'
import notFoundImage from 'public/images/not-found.webp'
import Button from 'components/shared/Button'

import { ModalsContext } from 'contexts/ModalsContext'

export default function NotFound (): JSX.Element {
  const { setAddDataModalStatus } = useContext(ModalsContext)

  return (
    <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
      <Image
        className='w-56'
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center text-black font-secondaryFont'><Balancer>There are no tasks to display, but there is a solution... You can add the first one right now.</Balancer></span>
      <Button onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
