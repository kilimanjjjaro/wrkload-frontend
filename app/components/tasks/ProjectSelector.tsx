import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { DataContext } from 'context/DataContext'
import { mutate } from 'swr'

interface Props {
  projectNames: string[]
}

export default function ProjectSelector ({ projectNames }: Props): JSX.Element {
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
    <div className='relative flex items-center justify-center bg-transparent '>
      <div
        onClick={() => setOpen(!open)}
        className={clsx('flex gap-x-3 cursor-pointer font-bold transition ease-in-out duration-400 hover:text-dark-gray', selected === '' && 'text-white')}
      >
        {selected}
        <ChevronDownIcon className={clsx('w-4 md:w-6 2xl:w-8 stroke-3.5', open && 'rotate-180')} />
      </div>
      <ul
        className={clsx('z-20 absolute font-secondaryFont top-full text-base bg-dark-gray mt-5 overflow-x-hidden overflow-y-auto', open && 'max-h-40', !open && 'max-h-0')}
      >
        <div className='sticky top-0 flex items-center px-3 border-b border-light-gray'>
          <MagnifyingGlassIcon className='w-4 stroke-3 stroke-white' />
          <input
            type='text'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value.toLowerCase())}
            placeholder='Search project'
            className='p-2 outline-none bg-dark-gray placeholder:text-white'
          />
        </div>
        {projectNames?.map((projectName) => (
          <li
            key={projectName}
            className={clsx('p-3 text-sm transition ease-in-out duration-400 hover:bg-light-gray/30 hover:text-white cursor-pointer', projectName.toLowerCase() === selected.toLowerCase() && 'bg-light-gray/30 text-white', projectName.toLowerCase().startsWith(searchInputValue) ? 'block' : 'hidden')}
            onClick={() => {
              if (projectName.toLowerCase() !== selected.toLowerCase()) {
                void
                handleClick({ projectName })
              }
            }}
          >
            {projectName}
          </li>
        ))}
      </ul>
    </div>
  )
}
