'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Header from 'app/components/projects/Header'
import Skeleton from 'app/components/projects/Skeleton'
import ProjectList from 'app/components/projects/ProjectList'
import NotFound from 'app/components/projects/NotFound'
import Modals from 'app/components/projects/Modals'
import { getProjects } from 'services/projects/getProjects'
import { sortProjects } from 'utils/sortData'
import { useSearchParams } from 'next/navigation'

export default function Projects (): JSX.Element {
  const params = useSearchParams()
  const page = params.get('page')
  const { data, isLoading, isValidating, mutate } = useSWR('projects', async () => await getProjects({ page }), { onSuccess: data => sortProjects(data.projects), revalidateIfStale: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderProjects = data !== undefined && data?.projects.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderProjects && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderProjects && <ProjectList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
