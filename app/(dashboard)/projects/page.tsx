'use client'

import useSWR from 'swr'
import Header from 'app/components/projects/Header'
import Loading from 'app/components/projects/Loading'
import ProjectList from 'app/components/projects/ProjectList'
import NotFound from 'app/components/projects/NotFound'
import Modals from 'app/components/projects/Modals'
import { getProjects } from 'services/projects/getProjects'
import { sortProjects } from 'utils/sortData'

export default function Projects (): JSX.Element {
  const { data, isLoading, isValidating } = useSWR('projects', getProjects, { onSuccess: data => sortProjects(data.projects) })

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderProjects = data !== undefined && data?.projects.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderProjects && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderProjects && <ProjectList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
