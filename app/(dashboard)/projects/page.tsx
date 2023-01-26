'use client'

import useSWR from 'swr'
import Header from 'app/components/projects/Header'
import Loading from 'app/components/projects/Loading'
import ProjectList from 'app/components/projects/ProjectList'
import NotFound from 'app/components/projects/NotFound'
import Modals from 'app/components/projects/Modals'
import { getProjects } from 'services/projects/getProjects'

import { PROJECTS_ENDPOINT as key } from 'constants/projects'

export default function Projects (): JSX.Element {
  const { data, isLoading } = useSWR(key, getProjects, { onSuccess: data => data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) })

  const shouldRenderProjects = data !== undefined && data.length >= 1 && !isLoading
  const shouldRenderSkeleton = isLoading
  const shouldRenderNotFoundSign = !isLoading && (data === undefined || data?.length === 0)

  return (
    <div className='px-[5vw] w-full py-40 pb-36 bg-light-gray'>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderProjects && <ProjectList projects={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </div>
  )
}
