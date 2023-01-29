'use client'

import useSWR from 'swr'
import Header from 'app/components/projects/Header'
import Loading from 'app/components/projects/Loading'
import ProjectList from 'app/components/projects/ProjectList'
import NotFound from 'app/components/projects/NotFound'
import Modals from 'app/components/projects/Modals'
import { getProjects } from 'services/projects/getProjects'
import { sortProjects } from 'utils/sortData'

import { getProjectStats } from 'services/stats/getProjectStats'

export default function Projects (): JSX.Element {
  const { data: projects, isLoading: isLoadingProjects } = useSWR('projects', getProjects, { onSuccess: data => sortProjects(data) })
  const { data: stats, isLoading: isLoadingStats } = useSWR('projectStats', getProjectStats)

  const shouldRenderProjects = projects !== undefined && projects.length >= 1 && stats !== undefined && !isLoadingProjects && !isLoadingStats
  const shouldRenderSkeleton = isLoadingProjects || isLoadingStats
  const shouldRenderNotFoundSign = (!isLoadingProjects || !isLoadingStats) && (projects === undefined || projects?.length === 0) && stats === undefined

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderProjects && <ProjectList projects={projects} stats={stats} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
