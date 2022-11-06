import Link from 'next/link'
import Headline from './shared/Headline'
import Dropdown from './shared/Dropdown'
import Logo from './shared/Logo'
import KilimanjjjaroLogo from '../../public/images/kilimanjjjaro.svg'
import { MoonIcon } from '@heroicons/react/24/solid'

export default function Footer () {
  return (
    <>
      <div className='grid grid-cols-2 justify-items-start'>
        <div className='justify-self-start'>
          <Link href='/'><Logo /></Link>
        </div>
        <div className='justify-self-end'>
          <Link href='https://kilimanjjjaro.com/'>
            <KilimanjjjaroLogo className='w-16 h-16 transition duration-500 ease-in-out md:w-20 md:h-20 fill-black dark:fill-white hover:fill-primary' />
          </Link>
        </div>
      </div>
      <div className='pt-16 pb-12 mx-auto text-center text-black md:pb-16 md:pt-5 md:w-3/4 dark:text-white'>
        <Headline type='h3'>This is the end, <br />do you have ideas?</Headline>
      </div>
      <div className='grid content-center grid-cols-1 text-sm text-black gap-y-4 md:gap-y-0 md:grid-cols-2 dark:text-white font-secondaryFont md:text-base'>
        <p className='text-center md:text-left'>© 2022 wrkload. All rights reserved.</p>
        <nav className='flex justify-center md:justify-end gap-x-10'>
          <Dropdown />
          <button className='flex items-center gap-2 transition duration-500 ease-in-out hover:text-primary '>Dark mode <MoonIcon className='w-4' /></button>
        </nav>
      </div>
    </>
  )
}
