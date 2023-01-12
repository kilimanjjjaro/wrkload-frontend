'use client'

import { useState } from 'react'
import { CalendarIcon, ClockIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Moment from 'moment'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import Paragraph from 'app/components/shared/Paragraph'
import Modal from 'app/components/shared/Modal'
import UpdateTask from 'app/(dashboard)/tasks/components/UpdateTask'
import { TaskInterface } from 'interfaces/tasks/Task'
import { getCookie } from 'cookies-next'
import useSWR, { Fetcher } from 'swr'
import api from 'utils/api'

interface FetcherInterface {
  results: TaskInterface[]
}

export default function Tasks (): JSX.Element {
  const accessToken = getCookie('accessToken')
  const [taskModalStatus, setTaskModalStatus] = useState(false)

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const fetcher: Fetcher<FetcherInterface> = async (url: string) => await api.get(url, options).then(res => res.data)

  const { data, isLoading } = useSWR('https://wrkload-api-production.up.railway.app/api/v1/tasks', fetcher)

  const tasks = data?.results

  if (isLoading) return <div className='text-white'>Loading...</div>

  return (
    <>
      <MasonryGrid>
        {tasks?.map((task: TaskInterface) => (
          <div key={task._id} className='relative flex flex-col items-start bg-gray-200 group p-7 dark:bg-white rounded-3xl'>
            <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{task.title}</h3>
            <Paragraph variant='sm'>{task.description}</Paragraph>
            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarIcon className='w-4 stroke-width-2' /> {Moment(task.deliveredAt).format('DD-MM-YYYY')}</div>
              <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><ClockIcon className='w-4 stroke-width-2' /> {task.timing}</div>
            </div>
            <div className='absolute left-0 flex justify-center w-full transition ease-in-out opacity-100 duration-400 -top-4 xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => setTaskModalStatus(!(taskModalStatus))} className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-yellow hover:text-white hover:bg-black'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
              <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-red hover:text-white hover:bg-black'><TrashIcon className='w-4 stroke-width-2' /></div>
            </div>
            <Modal dependency={taskModalStatus} close={() => setTaskModalStatus(!(taskModalStatus))}>
              <UpdateTask taskModalStatus={taskModalStatus} setTaskModalStatus={setTaskModalStatus} task={task} />
            </Modal>
          </div>
        ))}
      </MasonryGrid>
    </>
  )
}
