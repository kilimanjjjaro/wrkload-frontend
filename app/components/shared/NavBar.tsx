import Link from 'next/link'
import Logo from './Logo'
import Dropdown from './Dropdown'
import Button from './Button'
import TextLink from './TextLink'
import { MoonIcon } from '@heroicons/react/24/solid'
import { LockClosedIcon } from '@heroicons/react/24/outline'

const PAGES = [
  { name: 'Home', link: '/' },
  { name: 'Tasks', link: '/tasks' }
]

export default function NavBar (): JSX.Element {
  return (
    <nav className='container flex items-center justify-between px-6 mx-auto py-7 md:py-10 md:px-8'>
      <Link href='/'><Logo /></Link>
      <div className='items-center hidden font-normal lg:flex gap-x-10'>
        {
          PAGES.map((page) => (
            <TextLink link={page.link} key={page.name}>{page.name}</TextLink>
          ))
        }
        <Dropdown />
        <button><MoonIcon className='w-4 text-black transition duration-500 ease-in-out dark:text-white hover:text-primary dark:hover:text-primary' /></button>
        <Button type='primary' link='/'>Log in <LockClosedIcon className='w-4 stroke-width-3' /></Button>
      </div>
    </nav>
  )
}
