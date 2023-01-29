import { useContext } from 'react'
import dayjs from 'dayjs'
import { CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Stats from 'app/components/tasks/Stats'
import Pagination from 'app/components/shared/Pagination'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Paragraph from 'app/components/shared/Paragraph'

import { DataContext } from 'context/DataContext'
import { ModalsContext } from 'context/ModalsContext'
import type { TaskInterface, TaskStatsInterface } from 'interfaces/tasks/Task'

interface Props {
  tasks: TaskInterface[]
  stats: TaskStatsInterface
}

export default function TaskList ({ tasks, stats }: Props): JSX.Element {
  const { setSelectedTask, shouldRenderStats } = useContext(DataContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } = useContext(ModalsContext)

  const handleUpdateTaskClick = (task: TaskInterface): void => {
    setSelectedTask(task)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteTaskClick = (task: TaskInterface): void => {
    setSelectedTask(task)
    setDeleteDataModalStatus(true)
  }

  return (
    <>
      <MasonryGrid>
        {shouldRenderStats && <Stats stats={stats} />}
        {tasks.map((task) => (
          <div key={task._id} className='relative flex flex-col items-start transition ease-in-out bg-white hover:bg-white duration-400 text-dark-gray group p-7'>
            <h3 className='mb-5 text-4xl font-bold break-word font-primaryFont'>{task.title}</h3>
            <Paragraph variant='sm'>{task.description}</Paragraph>
            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Delivery date'><CalendarIcon className='w-4 stroke-2' /> {dayjs(task.deliveredAt).format('DD-MM-YYYY')}</div>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Timing'><ClockIcon className='w-4 stroke-2' /> {task.timing}</div>
            </div>

            <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateTaskClick(task)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-yellow hover:bg-dark-gray'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => handleDeleteTaskClick(task)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-red hover:bg-dark-gray'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
      <Pagination />
    </>
  )
}
