import { useContext, useEffect, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { clearCache } from 'services/clearCache'
import { DataContext } from 'contexts/DataContext'
import api from 'utils/api'
import { PAGES } from 'constants/components'

interface Props {
  showDashboardBox: boolean
  setShowDashboardBox: (value: boolean) => void
}

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
  const { setIsLogged } = useContext(DataContext)
  const [pages, setPages] = useState<typeof PAGES>([])
  const accessToken = getCookie('accessToken')
  const router = useRouter()

  useEffect(() => {
    if (accessToken !== undefined) {
      const { role }: { role: number } = jwtDecode(accessToken as string)
      let filteredPages = PAGES

      if (role !== 1) {
        filteredPages = PAGES.filter((page) => {
          return !page.admin
        })
      }

      setPages(filteredPages)
    }
  }, [accessToken])

  const handleLogout = async (): Promise<void> => {
    setShowDashboardBox(!showDashboardBox)
    await api.get('/auth/logout')
    await clearCache()
    deleteCookie('accessToken')
    setIsLogged(false)
    router.push('/login')
  }

  return (
    <motion.nav
      className='fixed bottom-0 flex-col items-center justify-center w-full h-full gap-6 xl:gap-3 md:mt-8 md:h-auto md:absolute md:top-0 md:w-auto justify-self-center'
      animate={showDashboardBox ? 'open' : 'closed'}
      variants={VARIANTS}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
      initial={false}
    >
      <div className='fixed w-full block xl:hidden h-full -z-10 bg-light-blue dark:bg-black opacity-[0.97]' />
      <ul className='flex flex-col items-center justify-center w-full gap-6 text-3xl text-black md:gap-4 md:text-xl md:flex-row md:w-auto rounded-t-3xl md:rounded-3xl font-secondaryFont'>
        {pages.map((page) => (
          <li className='px-8 py-4 transition ease-in-out rounded-full cursor-pointer md:px-6 md:py-2 bg-blue duration-400 md:rounded-3xl md:hover:bg-black md:hover:text-white dark:md:hover:text-black dark:md:hover:bg-white' key={page.link} onClick={() => setShowDashboardBox(!showDashboardBox)}><Link href={page.link}>{page.name}</Link></li>
        ))}
        <button className='px-8 py-4 transition ease-in-out rounded-full cursor-pointer md:px-5 md:py-2 bg-blue duration-400 md:rounded-3xl md:hover:bg-black md:hover:text-white dark:md:hover:text-black dark:md:hover:bg-white' onClick={() => { void handleLogout() }}>Log out</button>
      </ul>
      <div className='p-2 transition xl:absolute xl:mt-4 xl:top-full ease-in-out rounded-full cursor-pointer w-9 md:w-7 bg-blue duration-400 md:hover:bg-black [&>svg]:dark:md:hover:stroke-black [&>svg]:md:hover:stroke-white dark:md:hover:bg-white' onClick={() => setShowDashboardBox(!showDashboardBox)}>
        <XMarkIcon className='transition ease-in-out stroke-2 stroke-black duration-400' />
      </div>
    </motion.nav>
  )
}
