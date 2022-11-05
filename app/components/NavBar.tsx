import Link from 'next/link'
import Logo from './Logo'
import Dropdown from './shared/Dropdown'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const pages = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/features' },
  { name: 'Contact', link: '/contact' }
]

export default function NavBar () {
  return (
    <nav className='container mx-auto py-10 flex items-center justify-between'>
      <Logo />
      <div className='flex items-center gap-x-10 font-secondaryFont font-normal'>
        {
          pages.map((page) => (
            <Link className='text-white hover:text-primary transition ease-in-out duration-500' href={page.link} key={page.name}>{page.name}</Link>
          ))
        }
        <Dropdown />
        <button><MoonIcon className='w-4 text-white hover:text-primary transition ease-in-out duration-500' /></button>
        <Link href='' className='flex items-center gap-1 px-6 h-10 bg-white hover:bg-primary rounded-full font-secondaryFont font-semibold text-black transition ease-in-out duration-500'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Link>
      </div>
    </nav>
  )
}
