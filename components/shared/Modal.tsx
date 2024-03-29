import { Dispatch } from 'react'
import { motion } from 'framer-motion'
import useDelayUnmount from 'hooks/useDelayUnmount'

import { BACKGROUND_VARIANTS, CONTENT_VARIANTS } from 'constants/framerMotion'

interface Props {
  children: React.ReactNode
  modalStatus: boolean
  setModalStatus: Dispatch<React.SetStateAction<boolean>>
}

export default function Modal ({ children, modalStatus, setModalStatus }: Props): JSX.Element {
  const renderChild = useDelayUnmount(modalStatus, 400)

  return (
    <motion.div
      className='fixed top-0 left-0 z-20 flex items-end justify-center w-full h-full md:items-center'
      variants={BACKGROUND_VARIANTS}
      initial={false}
      animate={modalStatus ? 'open' : 'closed'}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
      <div className='absolute top-0 left-0 w-full h-full cursor-pointer bg-light-blue dark:bg-black opacity-[0.97]' onClick={() => setModalStatus(false)} />

      {renderChild && (
        <motion.div
          className='z-20 w-full md:w-auto'
          variants={CONTENT_VARIANTS}
          initial='initial'
          animate={modalStatus ? 'open' : 'closed'}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
        >
          {children}

        </motion.div>
      )}
    </motion.div>
  )
}
