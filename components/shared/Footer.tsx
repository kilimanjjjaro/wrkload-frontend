// import { motion } from 'framer-motion'
import ThemeSelector from 'components/shared/ThemeSelector'
import Languages from 'components/shared/Languages'
// import GitHubLogo from 'public/images/github.svg'

export default function Footer (): JSX.Element {
  return (
    <footer className='fixed bottom-0 left-0 flex items-center justify-between w-full px-6 pb-6 mx-auto text-black md:z-50 dark:text-blue md:pb-8 md:px-8'>
      <span className='text-sm font-light font-secondaryFont'>© 2023 wrkload</span>
      <div className='flex gap-x-5'>
        <Languages />
        <ThemeSelector />
        {/* <motion.a
          className='will-change-transform'
          href='https://github.com/kilimanjjjaro/wrkload-frontend'
          aria-label='See repository in Github'
          target='_blank'
          rel='noopener noreferrer'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10
          }}
        >
          <GitHubLogo className='w-[18px] transition ease-in-out duration-400 fill-black dark:fill-blue hover:fill-blue dark:hover:fill-white' />
        </motion.a> */}
      </div>
    </footer>
  )
}
