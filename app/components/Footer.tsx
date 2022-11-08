import Link from 'next/link'
import Headline from './shared/Headline'
import TextLink from './shared/TextLink'
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
            <KilimanjjjaroLogo className='w-16 transition duration-500 ease-in-out md:w-18 2xl:w-18 fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary' />
          </Link>
        </div>
      </div>
      <div className='relative flex justify-center pt-16 pb-12 mx-auto text-center text-black transition duration-500 ease-in-out md:pb-20 md:pt-9 dark:text-white'>
        <TextLink>
          <Headline type='h3'>This is the end, <br />do you have ideas?</Headline>
        </TextLink>
      </div>
      <div className='grid content-center grid-cols-1 text-sm text-black gap-y-4 md:gap-y-0 md:grid-cols-2 dark:text-white font-secondaryFont md:text-base'>
        <p className='text-center md:text-left'>© {new Date().getFullYear()} wrkload. All rights reserved.</p>
        <button className='flex items-center justify-center gap-2 transition duration-500 ease-in-out md:justify-end hover:text-primary '>Dark mode <MoonIcon className='w-4' /></button>
      </div>
    </>
  )
}
