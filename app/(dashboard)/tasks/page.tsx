'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Header from 'components/tasks/Header'
import Skeleton from 'components/tasks/Skeleton'
import TaskList from 'components/tasks/TaskList'
import NotFound from 'components/tasks/NotFound'
import Modals from 'components/tasks/Modals'
import { getTasks } from 'services/tasks/getTasks'
import { sortTasks } from 'utils/sortData'
import { DataContext } from 'contexts/DataContext'

export default function Tasks (): JSX.Element {
  const params = useSearchParams()
  const page = params.get('page')
  const { selectedProjectToFetch } = useContext(DataContext)

  const { data, isLoading, isValidating, mutate } = useSWR(selectedProjectToFetch !== '' ? 'tasks' : null, async () => await getTasks({ page, project: selectedProjectToFetch }), { onSuccess: (data) => sortTasks(data.tasks), revalidateIfStale: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating || selectedProjectToFetch === ''
  const shouldRenderTasks = data !== undefined && data?.tasks.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderTasks && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderTasks && <TaskList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
