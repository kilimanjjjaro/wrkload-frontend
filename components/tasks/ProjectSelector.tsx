import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { mutate } from 'swr'
import clsx from 'clsx'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { DataContext } from 'contexts/DataContext'

const VARIANTS = {
  open: { opacity: 1, y: 0, display: 'block' },
  closed: {
    opacity: 0,
    y: -30,
    transitionEnd: {
      display: 'none'
    }
  }
}

export default function ProjectSelector ({ projectNames }: { projectNames: string[] }): JSX.Element {
  const { setSelectedProjectToFetch } = useContext(DataContext)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(projectNames[0])
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleClick = async ({ projectName }: { projectName: string }): Promise<void> => {
    setSelected(projectName)
    setSearchInputValue('')
    setOpen(false)
    setSelectedProjectToFetch(projectName)
  }

  useEffect(() => {
    const mutateData = async (): Promise<void> => {
      await mutate('tasks')
    }
    mutateData().catch((error) => console.error(error))
  }, [selected])

  return (
    <div className='relative flex items-center justify-center bg-transparent'>
      <div
        onClick={() => setOpen(!open)}
        className={clsx('flex gap-x-3 group cursor-pointer font-bold transition-colors ease-in-out duration-[0.6s] hover:text-white', selected === '' && 'text-white')}
      >
        {selected}
        <svg
          className={clsx('w-8 stroke-3.5 transition-transform ease-in-out duration-[0.6s]', open && 'rotate-180')}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </div>

      <motion.ul
        className={clsx('z-20 absolute font-secondaryFont top-full text-base bg-blue mt-5 overflow-x-hidden overflow-y-auto custom-scrollbar max-h-[217px]')}
        variants={VARIANTS}
        initial={false}
        animate={open ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut', duration: 0.6 }}
      >
        <div className='sticky top-0 flex items-center px-3 border-b border-black bg-blue'>
          <MagnifyingGlassIcon className='w-4 stroke-3 stroke-black' />
          <input
            className='p-2 text-black outline-none bg-blue placeholder:text-black'
            type='text'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
            placeholder='Search project'
          />
        </div>
        {projectNames?.map((projectName) => (
          <li
            key={projectName}
            className={clsx('p-3 flex items-center relative text-sm transition text-black ease-in-out duration-400 hover:bg-light-blue hover:text-black cursor-pointer', projectName.toLowerCase() === selected.toLowerCase() && 'bg-light-blue text-black', projectName.toLowerCase().startsWith(searchInputValue) ? 'block' : 'hidden')}
            onClick={() => {
              if (projectName.toLowerCase() !== selected.toLowerCase()) {
                void
                handleClick({ projectName })
              }
            }}
          >
            {projectName}
            <span className={clsx(
              'absolute right-3 hidden px-[5px] tracking-wider uppercase bg-black text-[8px] text-white',
              projectName.toLowerCase() === selected.toLowerCase() && '!flex'
            )}
            >
              Selected
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

// Credits of base code: https://github.com/Sridhar-C-25/Custom-Dropdown-menu
