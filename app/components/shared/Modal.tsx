
import { motion } from 'framer-motion'
import { ModalInterface } from 'interfaces/components'

const BACKGROUND_VARIANTS = {
  open: { opacity: 1, display: 'flex' },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
}

const CONTENT_VARIANTS = {
  initial: { opacity: 0, y: 100, display: 'none' },
  open: { opacity: 1, y: 0, display: 'block', transition: { delay: 0.2 } },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none'
    }
  }
}

export default function Modal ({ children, dependency, close }: ModalInterface): JSX.Element {
  return (
    <motion.div
      className='fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full'
      variants={BACKGROUND_VARIANTS}
      initial={false}
      animate={dependency ? 'open' : 'closed'}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
      <div className='absolute top-0 left-0 w-full h-full bg-black cursor-pointer opacity-95' onClick={() => close()} />
      <motion.div
        className='z-20'
        variants={CONTENT_VARIANTS}
        initial='initial'
        animate={dependency ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >{children}
      </motion.div>
    </motion.div>
  )
}
