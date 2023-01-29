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

export default function Tasks (): JSX.Element {
  const { data: tasks, isLoading: isLoadingTasks } = useSWR('tasks', getTasks, { onSuccess: data => sortTasks(data) })
  const { data: stats, isLoading: isLoadingStats } = useSWR('taskStats', getTaskStats)

  const shouldRenderTasks = tasks !== undefined && tasks.length >= 1 && stats !== undefined && !isLoadingTasks && !isLoadingStats
  const shouldRenderSkeleton = isLoadingTasks || isLoadingStats
  const shouldRenderNotFoundSign = (!isLoadingTasks || !isLoadingStats) && (tasks === undefined || tasks?.length === 0) && stats === undefined

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
