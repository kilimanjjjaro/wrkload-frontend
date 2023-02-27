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
        className='fixed bottom-0 md:mt-8 flex-col items-center w-full h-[85vh] md:h-auto gap-3 md:absolute md:top-0 md:w-auto justify-self-center'
        animate={showDashboardBox ? 'open' : 'closed'}
        variants={VARIANTS}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
        initial={false}
      >
        <ul className='flex flex-col items-center justify-center order-2 w-full h-full gap-10 px-6 py-3 text-4xl text-black transition ease-in-out md:gap-4 md:text-base md:flex-row md:order-1 md:w-auto rounded-t-3xl md:rounded-3xl bg-blue duration-400 font-secondaryFont'>
          {PAGES.map((page) => (
            <li className='transition ease-in-out duration-400 md:hover:text-white' key={page.link} onClick={() => setShowDashboardBox(!showDashboardBox)}><Link href={page.link}>{page.name}</Link></li>
          ))}
          <button className='transition ease-in-out duration-400 hover:text-white' onClick={() => { void handleLogout() }}>Log out</button>
        </ul>
        <div className='order-1 p-2 transition ease-in-out rounded-full cursor-pointer w-9 md:order-2 md:w-7 bg-blue duration-400 md:hover:bg-white' onClick={() => setShowDashboardBox(!showDashboardBox)}>
          <XMarkIcon className='stroke-2 stroke-black' />
        </div>
      </motion.nav>
    </>
  )
}
