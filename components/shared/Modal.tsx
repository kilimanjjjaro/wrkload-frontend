import type { Dispatch } from 'react'
import { motion } from 'motion/react'
import useDelayUnmount from 'hooks/useDelayUnmount'

import { BACKGROUND_VARIANTS, CONTENT_VARIANTS } from 'constants/framerMotion'
import {
  MODAL_UNMOUNT_DELAY_MS,
  TRANSITION_DURATION
} from 'constants/animation'

interface Props {
  children: React.ReactNode
  modalStatus: boolean
  setModalStatus: Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({
  children,
  modalStatus,
  setModalStatus
}: Props): React.JSX.Element {
  const renderChild = useDelayUnmount(modalStatus, MODAL_UNMOUNT_DELAY_MS)

  return (
    <motion.div
      className='fixed top-0 left-0 z-20 flex items-end justify-center w-full h-full md:items-center'
      variants={BACKGROUND_VARIANTS}
      initial={false}
      animate={modalStatus ? 'open' : 'closed'}
      transition={{ ease: 'easeInOut', duration: TRANSITION_DURATION }}
    >
      <div
        className='absolute top-0 left-0 w-full h-full cursor-pointer bg-light-blue dark:bg-black opacity-[0.97]'
        onClick={() => {
          setModalStatus(false)
        }}
      />

      {renderChild && (
        <motion.div
          className='z-20 w-full md:w-auto'
          variants={CONTENT_VARIANTS}
          initial='initial'
          animate={modalStatus ? 'open' : 'closed'}
          transition={{ ease: 'easeInOut', duration: TRANSITION_DURATION }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
