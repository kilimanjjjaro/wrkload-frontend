'use client'

import useSWR from 'swr'
import Header from 'app/components/tasks/Header'
import Loading from 'app/components/tasks/Loading'
import TaskList from 'app/components/tasks/TaskList'
import NotFound from 'app/components/tasks/NotFound'
import Modals from 'app/components/tasks/Modals'
import { getTasks } from 'services/tasks/getTasks'

import { TASKS_ENDPOINT as key } from 'constants/tasks'

export default function Tasks (): JSX.Element {
  const { data, isLoading } = useSWR(key, getTasks, { onSuccess: data => data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) })

  const shouldRenderTasks = data !== undefined && data.length >= 1 && !isLoading
  const shouldRenderSkeleton = isLoading
  const shouldRenderNotFoundSign = !isLoading && (data === undefined || data?.length === 0)

  return (
    <div className='px-[5vw] w-full py-40 pb-36 bg-light-gray'>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderTasks && <TaskList tasks={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </div>
  )
}
