'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { Toaster } from 'sonner'
import Header from 'components/tasks/Header'
import Skeleton from 'components/tasks/Skeleton'
import TaskList from 'components/tasks/TaskList'
import NotFound from 'components/tasks/NotFound'
import Modals from 'components/tasks/Modals'
import { getTasks } from 'services/tasks/getTasks'
import { sortTasks } from 'utils/sortData'
import { AppContext } from 'contexts/AppContext'
import PageTransition from 'components/shared/PageTransition'
import { getProjects } from 'services/projects/getProjects'

export default function Tasks (): JSX.Element {
  const { selectedProjectToFetch, setSelectedProjectToFetch } = useContext(AppContext)
  let sortedProjectNames: string[] = []
  const params = useSearchParams()
  const page = params.get('page')

  const { data: projects, isLoading: isLoadingProjects, isValidating: isValidatingProjects } = useSWR('projects', async () => await getProjects({ page: '1', noLimit: true }), { revalidateIfStale: false })

  if (projects !== undefined && projects.projects.length > 0) {
    sortedProjectNames = projects.projects.map((project) => project.name).sort()
  }

  useEffect(() => {
    if (sortedProjectNames.length > 0) {
      setSelectedProjectToFetch(sortedProjectNames[0])
    }
  }, [projects])

  const { data: tasks, isLoading: isLoadingTasks, isValidating: isValidatingTasks, mutate } = useSWR(selectedProjectToFetch !== '' ? 'tasks' : null, async () => await getTasks({ page, project: selectedProjectToFetch }), { onSuccess: (data) => sortTasks(data.tasks), revalidateIfStale: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page, mutate])

  const noProjects = projects !== undefined && projects.projects.length === 0
  const shouldRenderSkeleton = isLoadingTasks || isLoadingProjects || isValidatingTasks || isValidatingProjects
  const shouldRenderTasks = tasks !== undefined && tasks.tasks.length > 0 && !shouldRenderSkeleton
  const shouldRenderNotFound = ((tasks !== undefined && tasks.tasks.length === 0) || (projects !== undefined && projects.projects.length === 0)) && !shouldRenderSkeleton

  return (
    <PageTransition>
      <Header projectNames={sortedProjectNames} shouldRenderNotFound={shouldRenderNotFound} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderTasks && <TaskList data={tasks} />}
        {shouldRenderNotFound && <NotFound noProjects={noProjects} />}
      </main>
      <Modals />
      <Toaster position='top-center' />
    </PageTransition>
  )
}
