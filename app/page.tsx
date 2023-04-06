'use client'

import { useState } from 'react'
import IntroducingTasks from 'components/home/IntroducingTasks'
import IntroducingStats from 'components/home/IntroducingStats'

const HOME_SECTIONS = [
  {
    name: 'Tasks',
    value: 'tasks'
  },
  {
    name: 'Stats',
    value: 'stats'
  },
  {
    name: 'Projects',
    value: 'projects'
  }
]

export default function Home (): JSX.Element {
  const [show, setShow] = useState('tasks')

  const handleClick = ({ section }: { section: string }): void => {
    setShow(section)
    window.scrollTo(0, 0)
  }

  return (
    <div className='px-6 md:px-8 2xl:px-[5vw]'>
      {show === 'tasks' && <IntroducingTasks />}
      {show === 'stats' && <IntroducingStats />}
      <div className='flex justify-center gap-20 pb-40'>
        <>
          {HOME_SECTIONS.map((section) =>
            section.value !== show && (
              <button key={section.value} className='text-6xl leading-none font-bold font-primaryFont md:text-6xl xl:text-7xl 2xl:text-[5.5rem] dark:text-blue dark:hover:text-white transition-colors duration-400 ease-in-out' onClick={() => handleClick({ section: section.value })}>{section.name}</button>
            )
          )}
        </>
      </div>
    </div>
  )
}
