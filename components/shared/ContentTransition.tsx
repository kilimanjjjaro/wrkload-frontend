import { motion } from 'framer-motion'

export default function ContentTransition ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className='overflow-hidden'>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      >
        {children}
      </motion.div>
    </div>
  )
}
