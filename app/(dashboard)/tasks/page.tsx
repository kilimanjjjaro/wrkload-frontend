'use client'

import useSWR from 'swr'
import Header from 'app/components/tasks/Header'
import Loading from 'app/components/tasks/Loading'
import TaskList from 'app/components/tasks/TaskList'
import NotFound from 'app/components/tasks/NotFound'
import Modals from 'app/components/tasks/Modals'
import { getTasks } from 'services/tasks/getTasks'
import { getTaskStats } from 'services/stats/getTaskStats'
import { sortTasks } from 'utils/sortData'
import { useContext } from 'react'
import { DataContext } from 'context/DataContext'

export default function Tasks (): JSX.Element {
  const { selectedProjectToFetch } = useContext(DataContext)

  const { data: tasks, isLoading: isLoadingTasks, isValidating } = useSWR(selectedProjectToFetch !== '' ? 'tasks' : null, async () => await getTasks({ selectedProjectToFetch }), { onSuccess: data => sortTasks(data) })
  const { data: stats, isLoading: isLoadingStats } = useSWR(selectedProjectToFetch !== '' ? 'taskStats' : null, async () => await getTaskStats({ selectedProjectToFetch }))

  const shouldRenderSkeleton = isLoadingTasks || isLoadingStats || selectedProjectToFetch === '' || isValidating
  const shouldRenderTasks = tasks !== undefined && tasks.length >= 1 && stats !== undefined && !isLoadingTasks && !isLoadingStats && !isValidating
  const shouldRenderNotFoundSign = (!isLoadingTasks || !isLoadingStats || !isValidating) && (tasks === undefined || tasks?.length === 0) && stats === undefined && selectedProjectToFetch !== ''

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderTasks && <TaskList tasks={tasks} stats={stats} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
