import { MoonIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Headline from './Headline'
import TextLink from './TextLink'
import Logo from './Logo'
import KilimanjjjaroLogo from '../../../public/images/kilimanjjjaro.svg'

interface Props {
  variant: 'primary' | 'secondary'
}

export default function Footer ({ variant }: Props): JSX.Element {
  return (
    <>
      {variant === 'primary' &&
        <footer className='container px-6 pt-16 pb-8 mx-auto md:px-8'>
          <div className='grid grid-cols-2 justify-items-start'>
            <div className='justify-self-start'>
              <Link href='/'><Logo /></Link>
            </div>
            <div className='justify-self-end'>
              <Link href='https://kilimanjjjaro.com/'>
                <KilimanjjjaroLogo className='w-16 transition duration-400 ease-in-out md:w-18 2xl:w-18 fill-black dark:fill-white hover:fill-primary dark:hover:fill-primary' />
              </Link>
            </div>
          </div>
          <div className='relative flex justify-center pt-16 pb-12 mx-auto text-center text-black transition duration-400 ease-in-out md:pb-20 md:pt-9 dark:text-white'>
            <TextLink link='/'>
              <Headline variant='xl'>This is the end, <br />do you have ideas?</Headline>
            </TextLink>
          </div>
          <div className='flex flex-col justify-between text-sm text-black md:flex-row dark:text-white font-secondaryFont md:text-base'>
            <div className='mb-3 text-center md:mb-0 md:text-left'>© {new Date().getFullYear()} wrkload. All rights reserved.</div>
            <button className='flex items-center justify-center gap-2 transition duration-400 ease-in-out md:justify-end hover:text-primary '>Dark mode <MoonIcon className='w-4' /></button>
          </div>
        </footer>}

      {variant === 'secondary' &&
        <footer className='container px-6 py-8 mx-auto md:px-8'>
          <div className='text-xs text-center text-black dark:text-gray-800 font-secondaryFont md:text-sm'>
            © {new Date().getFullYear()} wrkload. All rights reserved.
          </div>
        </footer>}
    </>
  )
}
