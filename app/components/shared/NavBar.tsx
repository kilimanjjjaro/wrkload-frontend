import Link from 'next/link'
import Logo from './Logo'
import Dropdown from './Dropdown'
import Button from './Button'
import TextLink from './TextLink'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const pages = [
  { name: 'Home', link: '/' },
  { name: 'Features', link: '/features' },
  { name: 'Contact', link: '/contact' }
]

export default function NavBar () {
  return (
    <nav className='container flex items-center justify-between mx-auto py-7 md:py-10'>
      <Link href='/'><Logo /></Link>
      <div className='items-center hidden font-normal md:flex gap-x-10'>
        {
          pages.map((page) => (
            <TextLink link={page.link} key={page.name}>{page.name}</TextLink>
          ))
        }
        <Dropdown />
        <button><MoonIcon className='w-4 text-white transition duration-500 ease-in-out hover:text-primary' /></button>
        <Button type='primary'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>
      </div>
    </nav>
  )
}
