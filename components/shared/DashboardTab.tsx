import { useContext } from 'react'
import { deleteCookie } from 'cookies-next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import api from 'utils/api'
import { DataContext } from 'contexts/DataContext'
import { clearCache } from 'services/clearCache'

interface Props {
  showDashboardBox: boolean
  setShowDashboardBox: (value: boolean) => void
}

const PAGES = [
  { name: 'Tasks', link: '/tasks', protected: true },
  { name: 'Projects', link: '/projects', protected: true },
  { name: 'Users', link: '/users', protected: true }
]

const VARIANTS = {
  open: { opacity: 1, y: 0, display: 'flex' },
  closed: {
    opacity: 0,
    y: 32,
    transitionEnd: {
      display: 'none'
    }
  }
}

export default function DashboardTab ({ showDashboardBox, setShowDashboardBox }: Props): JSX.Element {
  const router = useRouter()
  const { setIsLogged } = useContext(DataContext)

  const handleLogout = async (): Promise<void> => {
    await api.get('/auth/logout')
    await clearCache()
    deleteCookie('_id')
    deleteCookie('accessToken')
    setIsLogged(false)
    router.push('/login')
  }

  return (
    <>
      <motion.nav
        className='fixed bottom-0 flex-col items-center w-full h-full gap-3 md:mt-8 md:h-auto md:absolute md:top-0 md:w-auto justify-self-center'
        animate={showDashboardBox ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        <div className='fixed w-full block xl:hidden h-full -z-10 bg-light-blue dark:bg-black opacity-[0.97]' />
        <ul className='flex flex-col items-center justify-center w-full h-full gap-10 text-4xl text-black md:gap-4 md:text-base md:flex-row md:w-auto rounded-t-3xl md:rounded-3xl font-secondaryFont'>
          {PAGES.map((page) => (
            <li className='px-10 py-4 transition ease-in-out rounded-full cursor-pointer md:px-5 md:py-2 bg-blue duration-400 md:rounded-3xl md:hover:bg-black md:hover:text-white dark:md:hover:text-black dark:md:hover:bg-white' key={page.link} onClick={() => setShowDashboardBox(!showDashboardBox)}><Link href={page.link}>{page.name}</Link></li>
          ))}
          <button className='px-10 py-4 transition ease-in-out rounded-full cursor-pointer md:px-5 md:py-2 bg-blue duration-400 md:rounded-3xl md:hover:bg-black md:hover:text-white dark:md:hover:text-black dark:md:hover:bg-white' onClick={() => { void handleLogout() }}>Log out</button>
          <div className='p-2 transition xl:absolute xl:-bottom-full ease-in-out rounded-full cursor-pointer w-9 md:w-7 bg-blue duration-400 md:hover:bg-black [&>svg]:dark:md:hover:stroke-black [&>svg]:md:hover:stroke-white dark:md:hover:bg-white' onClick={() => setShowDashboardBox(!showDashboardBox)}>
            <XMarkIcon className='transition ease-in-out stroke-2 stroke-black duration-400' />
          </div>
        </ul>
      </motion.nav>
    </>
  )
}
