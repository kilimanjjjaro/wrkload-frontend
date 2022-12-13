'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition ({ children }: { children: React.ReactNode }): JSX.Element {
  const pathName = usePathname()

  return (
    <AnimatePresence>
      <motion.div
        key={pathName}
        initial={false}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
