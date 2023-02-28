'use client'

import { motion } from 'framer-motion'
import HeroHeader from 'components/home/HeroHeader'
import { PAGE_VARIANTS } from 'constants/framerMotion'

export default function Home (): JSX.Element {
  return (
    <motion.main
      className='px-6 md:px-[5vw] mt-44 md:mt-0'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={PAGE_VARIANTS}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <HeroHeader />
    </motion.main>
  )
}
