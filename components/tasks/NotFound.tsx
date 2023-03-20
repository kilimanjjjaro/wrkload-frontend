import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import notFoundImage from 'public/images/not-found.webp'
import Button from 'components/shared/Button'
import { ModalsContext } from 'contexts/ModalsContext'

export default function NotFound ({ noProjects }: { noProjects: boolean }): JSX.Element {
  const { setAddDataModalStatus } = useContext(ModalsContext)
  const router = useRouter()

  return (
    <div className='flex flex-col items-center h-full mx-auto mt-16 xl:w-1/3 2xl:mt-28 gap-y-5'>
      <Image
        className='w-72'
        priority
        src={notFoundImage}
        alt='Not found image'
      />
      {!noProjects && (
        <>
          <span className='text-xl text-center text-black dark:text-white font-secondaryFont'><Balancer>We did not find tasks, but there is a solution... You can add the first one right now.</Balancer></span>
          <Button className='!w-auto' onClick={() => setAddDataModalStatus(true)} variant='primary'><PlusIcon className='w-4 stroke-3' /></Button>
        </>
      )}
      {noProjects && (
        <>
          <span className='text-xl text-center text-black dark:text-white font-secondaryFont'><Balancer>To create tasks, you need a project. Let&apos;s create one!</Balancer></span>
          <Button className='!w-auto' onClick={() => router.push('/projects')} variant='primary'><ArrowRightIcon className='w-4 stroke-3' /></Button>
        </>
      )}
    </div>
  )
}
