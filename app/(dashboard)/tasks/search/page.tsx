'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Loading from 'app/components/tasks/Loading'
import TaskList from 'app/components/tasks/TaskList'
import Button from 'app/components/shared/Button'
import Modals from 'app/components/tasks/Modals'
import notFoundImage from 'public/images/not-found.webp'
import searchTasks from 'services/tasks/searchTasks'
import { sortTasks } from 'utils/sortData'

export default function SearchTasks (): JSX.Element {
  const params = useSearchParams()
  const projectParam = params.get('project')
  const queryParam = params.get('query')
  const router = useRouter()

  const { data: tasks, isLoading, isValidating } = useSWR('tasks', async () => await searchTasks({ project: projectParam, query: queryParam }), { onSuccess: data => sortTasks(data), revalidate: false })

  const shouldRenderTasks = tasks !== undefined && tasks.length >= 1 && !isLoading && !isValidating
  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderNotFoundSign = !isLoading && !isValidating && (tasks === undefined || tasks.length === 0)

  return (
    <>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-white gap-x-5 font-primaryFont'>
          Search results for: {queryParam}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button onClick={() => router.push('/tasks')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /> Go to tasks</Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderTasks && <TaskList tasks={tasks} />}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-56'
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center font-secondaryFont text-dark-gray'>No search results found. <br className='hidden lg:block' />Please try again.</span>
            <Button onClick={() => router.push('/tasks')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
          </div>
        )}
      </main>
      <Modals />
    </>
  )
}
