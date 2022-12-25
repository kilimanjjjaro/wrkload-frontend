'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import getTasks from 'services/tasks/getTasks'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Paragraph from 'app/components/shared/Paragraph'
import ProjectStats from 'app/components/shared/ProjectStats'

const ListOfTasks = (): JSX.Element => {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    (async () => {
      const response = await getTasks()
      setTasks(response.data.results)
    })().catch((result) => console.log(result))
  }, [])

  return (
    <>
      <MasonryGrid>
        {stats.length >= 1 && <ProjectStats stats={stats} />}
        {tasks.map((task) => (
          <div key={task._id} className='relative flex flex-col items-start bg-gray-200 group p-7 dark:bg-white rounded-3xl'>
            <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{task.title}</h3>
            <Paragraph variant='sm'>{task.description}</Paragraph>
            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarIcon className='w-4 stroke-width-2' /> {task.deliveredAt}</div>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><ClockIcon className='w-4 stroke-width-2' /> {task.timing}</div>
            </div>
            <div className='absolute left-0 flex justify-center w-full transition ease-in-out opacity-100 duration-400 -top-4 xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-yellow hover:text-white hover:bg-black'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
              <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-red hover:text-white hover:bg-black'><TrashIcon className='w-4 stroke-width-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
    </>
  )
}

export default ListOfTasks
