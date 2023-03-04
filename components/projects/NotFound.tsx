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
    <div className='flex flex-col items-center h-full mx-auto mt-16 xl:w-1/3 2xl:mt-28 gap-y-5'>
      <Image
        className='w-72'
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center text-black dark:text-white font-secondaryFont'><Balancer>We did not find projects, but there is a solution... You can add the first one right now.</Balancer></span>
      <Button className='!w-auto' onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
