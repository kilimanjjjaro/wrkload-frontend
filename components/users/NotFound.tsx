import Image from 'next/image'
import Balancer from 'react-wrap-balancer'
import notFoundImage from 'public/images/not-found.webp'

export default function NotFound (): JSX.Element {
  return (
    <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
      <Image
        className='w-56'
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center text-black font-secondaryFont'><Balancer>There are no users to display, but there is a solution... You can add the first one right now.</Balancer></span>
    </div>
  )
}
