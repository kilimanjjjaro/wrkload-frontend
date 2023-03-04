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
import PageTransition from 'components/shared/PageTransition'
import { getProjects } from 'services/projects/getProjects'

export default function Tasks (): JSX.Element {
  let sortedProjectNames: string[] = []
  const params = useSearchParams()
  const page = params.get('page')
  const { selectedProjectToFetch, setSelectedProjectToFetch } = useContext(DataContext)

  const { data: projects, isLoading: isLoadingProjects } = useSWR('projects', async () => await getProjects({ page: '1', noLimit: true }), { revalidateIfStale: false })

  if (projects !== undefined) {
    sortedProjectNames = projects.projects.map((project) => project.name).sort()
    setSelectedProjectToFetch(sortedProjectNames[0])
  }

  const { data: tasks, isLoading: isLoadingTasks, mutate } = useSWR(selectedProjectToFetch !== '' ? 'tasks' : null, async () => await getTasks({ page, project: selectedProjectToFetch }), { onSuccess: (data) => sortTasks(data.tasks), revalidateIfStale: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page, mutate])

  const noProjects = projects !== undefined && projects.projects.length === 0
  const shouldRenderSkeleton = isLoadingTasks || isLoadingProjects
  const shouldRenderTasks = tasks !== undefined && tasks.tasks.length > 0
  const shouldRenderNotFound = (tasks !== undefined && tasks.tasks.length === 0) || (projects !== undefined && projects.projects.length === 0)

  return (
    <PageTransition>
      <Header projectNames={sortedProjectNames} shouldRenderSkeleton={shouldRenderSkeleton} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderTasks && <TaskList data={tasks} />}
        {shouldRenderNotFound && <NotFound noProjects={noProjects} />}
      </main>
      <Modals />
    </PageTransition>
  )
}
