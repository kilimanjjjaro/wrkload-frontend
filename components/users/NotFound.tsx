import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import notFoundImage from 'public/images/not-found.webp'

export default function NotFound (): JSX.Element {
  return (
    <div className='flex flex-col items-center h-full mx-auto mt-16 xl:w-1/3 2xl:mt-28 gap-y-5'>
      <Image
        className='w-72'
        priority
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center text-black dark:text-white font-secondaryFont'><Balancer>We did not find users, but there is a solution... You can add the first one right now.</Balancer></span>
    </div>
  )
}
