'use client'

import { motion } from 'framer-motion'

export default function PageTransition ({ children }: { children: React.ReactNode }): JSX.Element {
  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 1, delay: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
