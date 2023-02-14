'use client'

import { useContext } from 'react'
import useSWR from 'swr'
import Header from 'app/components/tasks/Header'
import Loading from 'app/components/tasks/Loading'
import TaskList from 'app/components/tasks/TaskList'
import NotFound from 'app/components/tasks/NotFound'
import Modals from 'app/components/tasks/Modals'
import { getTasks } from 'services/tasks/getTasks'
import { sortTasks } from 'utils/sortData'

import { DataContext } from 'context/DataContext'

export default function Tasks (): JSX.Element {
  const { selectedProjectToFetch } = useContext(DataContext)

  const { data, isLoading, isValidating } = useSWR(selectedProjectToFetch !== '' ? 'tasks' : null, async () => await getTasks({ project: selectedProjectToFetch }), { onSuccess: data => sortTasks(data.tasks) })

  const shouldRenderSkeleton = isLoading || isValidating || selectedProjectToFetch === ''
  const shouldRenderTasks = data !== undefined && data?.tasks.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderTasks && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderTasks && <TaskList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
