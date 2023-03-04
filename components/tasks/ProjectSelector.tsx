import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { mutate } from 'swr'
import clsx from 'clsx'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { DataContext } from 'contexts/DataContext'

const VARIANTS = {
  open: { opacity: 1, y: 0, display: 'block' },
  closed: {
    opacity: 0,
    y: -15,
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
    window.localStorage.setItem('selectedProject', projectName)
  }

  useEffect(() => {
    const mutateData = async (): Promise<void> => {
      await mutate('tasks')
    }

    mutateData().catch((error) => console.error(error))
  }, [selected])

  return (
    <div className='relative flex items-center bg-transparent md:justify-center'>
      <div
        onClick={() => setOpen(!open)}
        className={clsx('flex gap-x-3 group cursor-pointer font-bold transition-colors ease-in-out duration-400 hover:text-blue dark:hover:text-white', selected === '' && 'text-white')}
      >
        {selected}
        <ChevronDownIcon className={clsx('w-8 stroke-3.5 transition-transform ease-in-out duration-400', open && 'rotate-180')} />
      </div>

      <motion.ul
        className={clsx('z-20 absolute rounded-xl font-secondaryFont top-full text-sm bg-blue mt-5 overflow-x-hidden overflow-y-auto custom-scrollbar max-h-[220px]')}
        variants={VARIANTS}
        initial={false}
        animate={open ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut', duration: 0.4 }}
      >
        <div className='sticky top-0 z-10 flex items-center px-4 py-3 border-b border-black bg-blue'>
          <MagnifyingGlassIcon className='w-4 stroke-3 stroke-black' />
          <input
            className='pl-2 text-black outline-none bg-blue placeholder:text-black'
            type='text'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
            placeholder='Search project'
          />
        </div>
        {projectNames?.map((projectName) => (
          <li
            key={projectName}
            className={clsx('py-3 px-4 flex items-center relative transition text-black ease-in-out duration-400 dark:hover:bg-light-blue hover:bg-white hover:text-black cursor-pointer', projectName.toLowerCase() === selected.toLowerCase() && 'dark:bg-light-blue bg-white text-black', projectName.toLowerCase().startsWith(searchInputValue) ? 'block' : 'hidden')}
            onClick={() => {
              if (projectName.toLowerCase() !== selected.toLowerCase()) {
                void
                handleClick({ projectName })
              }
            }}
          >
            {projectName}
            <span className={clsx(
              'absolute rounded-full right-3 hidden px-2 tracking-wider uppercase bg-black text-[8px] text-white',
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
