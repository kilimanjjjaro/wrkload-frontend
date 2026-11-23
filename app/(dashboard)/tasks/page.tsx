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
import { AppContext } from 'contexts/AppContext'
import PageTransition from 'components/shared/PageTransition'
import { getProjects } from 'services/projects/getProjects'
import { EMPTY_LENGTH, FIRST_INDEX } from 'constants/math'
import { logError } from 'utils/logError'
import type { FullTaskInterface } from 'interfaces/tasks/Task'
import type { FullProjectInterface } from 'interfaces/projects/Project'

interface RenderFlagsInput {
  tasks: FullTaskInterface | undefined
  projects: FullProjectInterface | undefined
  shouldRenderSkeleton: boolean
}

const renderFlags = ({
  tasks,
  projects,
  shouldRenderSkeleton
}: RenderFlagsInput) => {
  const noProjects = projects?.projects.length === EMPTY_LENGTH
  const tasksToRender =
    tasks !== undefined &&
    tasks.tasks.length > EMPTY_LENGTH &&
    !shouldRenderSkeleton
      ? tasks
      : undefined
  const shouldRenderNotFound =
    (tasks?.tasks.length === EMPTY_LENGTH || noProjects) &&
    !shouldRenderSkeleton
  return { noProjects, tasksToRender, shouldRenderNotFound }
}

export default function Tasks(): React.JSX.Element {
  const { selectedProjectToFetch, setSelectedProjectToFetch } =
    useContext(AppContext)
  let sortedProjectNames: string[] = []
  const params = useSearchParams()
  const page = params.get('page')

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isValidating: isValidatingProjects
  } = useSWR(
    'projects',
    async () => await getProjects({ page: '1', noLimit: true })
  )

  if (projects !== undefined && projects.projects.length > EMPTY_LENGTH) {
    sortedProjectNames = projects.projects.map((project) => project.name).sort()
  }

  useEffect(() => {
    if (sortedProjectNames.length > EMPTY_LENGTH) {
      setSelectedProjectToFetch(sortedProjectNames[FIRST_INDEX])
    }
  }, [projects])

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    isValidating: isValidatingTasks,
    mutate
  } = useSWR(
    selectedProjectToFetch === '' ? null : 'tasks',
    async () => await getTasks({ page, project: selectedProjectToFetch }),
    { onSuccess: (data) => sortTasks(data.tasks) }
  )

  useEffect(() => {
    mutate().catch(logError)
  }, [page, mutate])

  const shouldRenderSkeleton =
    isLoadingTasks ||
    isLoadingProjects ||
    isValidatingTasks ||
    isValidatingProjects
  const { noProjects, tasksToRender, shouldRenderNotFound } = renderFlags({
    tasks,
    projects,
    shouldRenderSkeleton
  })

  return (
    <PageTransition>
      <Header
        projectNames={sortedProjectNames}
        shouldRenderNotFound={shouldRenderNotFound}
      />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {tasksToRender !== undefined && <TaskList data={tasksToRender} />}
        {shouldRenderNotFound && <NotFound noProjects={noProjects} />}
      </main>
      <Modals />
    </PageTransition>
  )
}
