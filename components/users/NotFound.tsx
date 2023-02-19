import Image from 'next/image'
import notFoundImage from 'public/images/not-found.webp'

export default function NotFound (): JSX.Element {
  return (
    <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
      <Image
        className='w-56'
        src={notFoundImage}
        alt='Not found image'
      />
      <span className='text-xl text-center font-secondaryFont text-black'>There are no users to display, but there is a solution... <br className='hidden lg:block' /> You can add the first one right now.</span>
    </div>
  )
}
