import { Dispatch } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Input from 'components/shared/Input'

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
      className='absolute right-0 z-20 flex flex-col mt-5 text-white rounded-3xl bg-blue top-full p-7 gap-y-3'
      animate={dependency ? 'open' : 'closed'}
      variants={VARIANTS}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
      initial={false}
    >
      <h4 className='text-sm font-bold text-center text-black font-secondaryFont'>Date range filter</h4>
      <Input name='startingDate' type='date' placeholder='Starting date' required />
      <Input name='endingDate' type='date' placeholder='Ending date' required />
      <div className='flex gap-x-3'>
        <div className='relative flex justify-center w-full group'>
          <Button type='submit' variant='dark-alternative' fullWidth>
            <CheckIcon className='w-4 stroke-3' />
          </Button>
          <div className='absolute invisible text-black opacity-100 md:opacity-0 tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out top-8 bg-light-blue duration-400 group-hover:opacity-100 group-hover:visible rounded-full'>
            Coming soon
          </div>
        </div>
        <Button onClick={() => setDependency(false)} variant='dark-alternative' fullWidth>
          <XMarkIcon className='w-4 stroke-3' />
        </Button>
      </div>
    </motion.div>
  )
}
