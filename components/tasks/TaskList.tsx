import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import dayjs from 'dayjs'
import Balancer from 'react-wrap-balancer'
import { CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Stats from 'components/tasks/Stats'
import Pagination from 'components/shared/Pagination'
import MasonryGrid from 'components/shared/MasonryGrid'
import Paragraph from 'components/shared/Paragraph'
import { DataContext } from 'contexts/DataContext'
import { ModalsContext } from 'contexts/ModalsContext'
import type { FullTaskInterface, TaskInterface } from 'interfaces/tasks/Task'

export default function TaskList ({ data }: { data: FullTaskInterface }): JSX.Element {
  const { setSelectedTask, shouldRenderStats } = useContext(DataContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } =
    useContext(ModalsContext)
  const pathname = usePathname()

  const handleUpdateTaskClick = (task: TaskInterface): void => {
    setSelectedTask(task)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteTaskClick = (task: TaskInterface): void => {
    setSelectedTask(task)
    setDeleteDataModalStatus(true)
  }

  const tasks = data?.tasks
  const stats = data?.stats
  const pagination = data?.pagination

  return (
    <>
      <MasonryGrid>
        {shouldRenderStats && (stats !== undefined || stats !== null) && pathname?.includes('search') === false && <Stats stats={stats} />}
        {tasks.map((task) => (
          <article
            key={task._id} className='relative flex flex-col items-start text-black transition ease-in-out bg-white hover:bg-white duration-400 group p-7'
          >
            <h3 className='mb-5 text-4xl font-bold break-word font-primaryFont'>
              <Balancer>{task.title}</Balancer>
            </h3>
            <Paragraph variant='sm'><Balancer>{task.description}</Balancer></Paragraph>
            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-black bg-light-pink gap-x-1 font-secondaryFont' title='Delivery date'>
                <CalendarIcon className='w-4 stroke-2' />{' '}
                {dayjs(task.deliveredAt).format('DD-MM-YYYY')}
              </div>
              <div className='flex items-center h-8 px-4 text-xs text-black bg-light-pink gap-x-1 font-secondaryFont' title='Timing'>
                <ClockIcon className='w-4 stroke-2' /> {task.timing}
              </div>
            </div>

            <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateTaskClick(task)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-yellow hover:bg-pink'>
                <PencilSquareIcon className='w-4 stroke-2' />
              </div>
              <div onClick={() => handleDeleteTaskClick(task)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-red hover:bg-pink'>
                <TrashIcon className='w-4 stroke-2' />
              </div>
            </div>
          </article>
        ))}
      </MasonryGrid>
      <Pagination data={pagination} />
    </>
  )
}
