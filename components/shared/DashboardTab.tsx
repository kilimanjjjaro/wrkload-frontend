import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { CheckCircleIcon, ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { AppContext } from 'contexts/AppContext'
import { PAGES } from 'constants/components'
import logout from 'services/auth/logout'

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
  const { user, setUser } = useContext(AppContext)
  const [pages, setPages] = useState<typeof PAGES>([])
  const router = useRouter()

  useEffect(() => {
    if (user !== null) {
      const { role } = user
      let filteredPages = PAGES

      if (role !== 1) {
        filteredPages = PAGES.filter((page) => {
          return !page.admin
        })
      }

      setPages(filteredPages)
    }
  }, [])

  const handleLogout = async (): Promise<void> => {
    try {
      setShowDashboardBox(!showDashboardBox)

      const response = await logout()

      if (response?.status === 'ok') {
        setUser(null)
        router.push('/')

        toast(
          <>
            <CheckCircleIcon className='w-5 stroke-blue stroke-3' />
            <p>Session ended successfully</p>
          </>
        )
      }
    } catch (error) {
      toast(
        <>
          <ShieldExclamationIcon className='w-5 stroke-blue stroke-3' />
          <p>Something went wrong. Please, try again!</p>
        </>
      )
    }
  }

  return (
    <motion.nav
      className='fixed bottom-0 flex-col items-center justify-center w-full h-full gap-6 xl:gap-3 xl:mt-8 xl:h-auto xl:absolute xl:top-0 xl:w-auto justify-self-center'
      animate={showDashboardBox ? 'open' : 'closed'}
      variants={VARIANTS}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
      initial={false}
    >
      <div className='fixed w-full block xl:hidden h-full -z-10 bg-light-blue dark:bg-black opacity-[0.97]' onClick={() => setShowDashboardBox(!showDashboardBox)} />
      <ul className='flex flex-col items-center justify-center gap-6 text-3xl text-black xl:gap-4 xl:text-xl xl:flex-row xl:w-auto rounded-t-3xl xl:rounded-3xl font-secondaryFont'>
        {pages.map((page) => (
          <li className='px-8 py-4 transition ease-in-out rounded-full cursor-pointer xl:px-6 xl:py-2 bg-blue duration-400 xl:rounded-3xl xl:hover:bg-black xl:hover:text-white dark:xl:hover:text-black dark:xl:hover:bg-white' key={page.link} onClick={() => setShowDashboardBox(!showDashboardBox)}><Link href={page.link}>{page.name}</Link></li>
        ))}
        <button className='px-8 py-4 transition ease-in-out rounded-full cursor-pointer xl:px-5 xl:py-2 bg-blue duration-400 xl:rounded-3xl xl:hover:bg-black xl:hover:text-white dark:xl:hover:text-black dark:xl:hover:bg-white' onClick={() => { void handleLogout() }}>Log out</button>
      </ul>
      <div className='p-2 transition xl:absolute xl:mt-4 xl:top-full ease-in-out rounded-full cursor-pointer w-9 xl:w-7 bg-blue duration-400 xl:hover:bg-black [&>svg]:dark:xl:hover:stroke-black [&>svg]:xl:hover:stroke-white dark:xl:hover:bg-white' onClick={() => setShowDashboardBox(!showDashboardBox)}>
        <XMarkIcon className='transition ease-in-out stroke-2 stroke-black duration-400' />
      </div>
    </motion.nav>
  )
}
