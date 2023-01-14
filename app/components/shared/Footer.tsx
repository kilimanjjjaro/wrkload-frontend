import { MoonIcon } from '@heroicons/react/24/solid'
import Languages from 'app/components/shared/Languages'

export default function Footer (): JSX.Element {
  return (
    <footer className='fixed bottom-0 left-0 z-50 flex justify-between w-full px-6 py-6 mx-auto text-dark-gray md:py-8 md:px-8'>
      <span className='text-sm font-secondaryFont'>
        © {new Date().getFullYear()} wrkload. All rights reserved.
      </span>
      <div className='flex gap-x-5'>
        <Languages />
        <button><MoonIcon className='w-[18px] transition ease-in-out duration-400 hover:text-white' /></button>
      </div>
    </footer>
  )
}
