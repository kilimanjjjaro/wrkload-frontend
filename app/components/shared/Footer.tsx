import { MoonIcon } from '@heroicons/react/24/solid'
import Dropdown from 'app/components/shared/Dropdown'

export default function Footer (): JSX.Element {
  return (
    <footer className='fixed bottom-0 left-0 z-50 flex justify-between w-full px-6 py-6 mx-auto text-sm text-dark-gray md:py-8 md:px-8'>
      <span className='font-secondaryFont'>
        © {new Date().getFullYear()} wrkload. All rights reserved.
      </span>
      <div className='flex gap-x-10'>
        <Dropdown />
        <button><MoonIcon className='w-4 transition ease-in-out duration-400 hover:text-white dark:hover:text-primary' /></button>
      </div>
    </footer>
  )
}
