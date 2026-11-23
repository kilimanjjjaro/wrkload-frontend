import { useContext, useState } from 'react'
import { motion } from 'motion/react'
import clsx from 'clsx'
import {
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { AppContext } from 'contexts/AppContext'
import { FIRST_INDEX } from 'constants/math'
import {
  HIDDEN_OPACITY,
  NO_OFFSET,
  PROJECT_SELECTOR_OFFSET_Y,
  TRANSITION_DURATION,
  VISIBLE_OPACITY
} from 'constants/animation'

const VARIANTS = {
  open: { opacity: VISIBLE_OPACITY, y: NO_OFFSET, display: 'block' },
  closed: {
    opacity: HIDDEN_OPACITY,
    y: PROJECT_SELECTOR_OFFSET_Y,
    transitionEnd: {
      display: 'none'
    }
  }
}

export default function ProjectSelector({
  projectNames
}: {
  projectNames: string[]
}): React.JSX.Element {
  const { selectedProjectToFetch, setSelectedProjectToFetch } =
    useContext(AppContext)
  const [open, setOpen] = useState(false)
  const selected = projectNames.includes(selectedProjectToFetch)
    ? selectedProjectToFetch
    : projectNames[FIRST_INDEX]
  const [searchInputValue, setSearchInputValue] = useState('')

  const handleClick = ({ projectName }: { projectName: string }): void => {
    setSearchInputValue('')
    setOpen(false)
    setSelectedProjectToFetch(projectName)
    window.localStorage.setItem('selectedProject', projectName)
  }

  return (
    <div className='relative flex items-center bg-transparent md:justify-center'>
      <div
        onClick={() => {
          setOpen(!open)
        }}
        className={clsx(
          'flex gap-x-3 group cursor-pointer font-bold transition-colors ease-in-out duration-400 hover:text-blue dark:hover:text-white flex-wrap xl:flex-nowrap',
          selected === '' && 'text-white'
        )}
      >
        {selected}
        <ChevronDownIcon
          className={clsx(
            'w-8 stroke-3.5 transition-transform ease-in-out duration-400',
            open && 'rotate-180'
          )}
        />
      </div>

      <motion.ul
        className={clsx(
          'z-20 absolute rounded-xl font-secondaryFont top-full text-sm bg-blue mt-5 overflow-x-hidden'
        )}
        variants={VARIANTS}
        initial={false}
        animate={open ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut', duration: TRANSITION_DURATION }}
      >
        <div className='sticky top-0 z-10 flex items-center px-4 py-3 border-b border-black bg-blue'>
          <MagnifyingGlassIcon className='w-4 stroke-3 stroke-black' />
          <input
            className='pl-2 text-black outline-hidden bg-blue placeholder:text-black'
            type='text'
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value.toLowerCase())
            }}
            placeholder='Search project'
          />
        </div>
        {projectNames.map((projectName) => (
          <li
            key={projectName}
            className={clsx(
              'py-3 px-4 flex items-center relative transition text-black ease-in-out duration-400 hover:bg-light-blue hover:text-black cursor-pointer',
              projectName.toLowerCase() === selected.toLowerCase() &&
                'bg-light-blue text-black',
              projectName.toLowerCase().startsWith(searchInputValue)
                ? 'block'
                : 'hidden'
            )}
            onClick={() => {
              if (projectName.toLowerCase() !== selected.toLowerCase()) {
                handleClick({ projectName })
              }
            }}
          >
            {projectName}
            <span
              className={clsx(
                'absolute rounded-full right-3 hidden px-2 tracking-wider uppercase bg-black text-[8px] leading-5 text-white',
                projectName.toLowerCase() === selected.toLowerCase() && 'flex!'
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
