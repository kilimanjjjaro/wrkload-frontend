import { Dispatch } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Input from 'app/components/shared/Input'

const VARIANTS = {
  open: { opacity: 1, x: 0, display: 'flex' },
  closed: {
    opacity: 0,
    x: 40,
    transitionEnd: {
      display: 'none'
    }
  }
}

interface Props {
  dependency: boolean
  setDependency: Dispatch<React.SetStateAction<boolean>>
}

export default function DateFilter ({ dependency, setDependency }: Props): JSX.Element {
  return (
    <motion.div
      className='absolute right-0 z-10 flex flex-col mt-5 text-white bg-dark-gray top-full p-7 gap-y-3'
      animate={dependency ? 'open' : 'closed'}
      variants={VARIANTS}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
      initial={false}
    >
      <h4 className='text-sm font-bold text-center font-secondaryFont'>Date range filter</h4>
      <Input variant='primary' name='startingDate' type='date' placeholder='Starting date' required />
      <Input variant='primary' name='endingDate' type='date' placeholder='Ending date' required />
      <div className='flex gap-x-3'>
        <Button type='submit' variant='light-alternative' fullWidth>
          <CheckIcon className='w-4 stroke-3' />
        </Button>
        <Button onClick={() => setDependency(false)} variant='light-alternative' fullWidth>
          <XMarkIcon className='w-4 stroke-3' />
        </Button>
      </div>
    </motion.div>
  )
}
