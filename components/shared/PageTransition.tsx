'use client'

import { motion } from 'motion/react'
import { HIDDEN_OPACITY, PAGE_FADE_DURATION, VISIBLE_OPACITY } from 'constants/animation'

export default function PageTransition ({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (

    <motion.div
      initial={{ opacity: HIDDEN_OPACITY }}
      animate={{ opacity: VISIBLE_OPACITY }}
      exit={{ opacity: HIDDEN_OPACITY }}
      transition={{ duration: PAGE_FADE_DURATION, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
