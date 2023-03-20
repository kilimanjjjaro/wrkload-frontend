'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import { Toaster } from 'sonner'
import Header from 'components/projects/Header'
import Skeleton from 'components/projects/Skeleton'
import ProjectList from 'components/projects/ProjectList'
import NotFound from 'components/projects/NotFound'
import Modals from 'components/projects/Modals'
import { getProjects } from 'services/projects/getProjects'
import { sortProjects } from 'utils/sortData'
import { useSearchParams } from 'next/navigation'
import PageTransition from 'components/shared/PageTransition'

export default function Projects (): JSX.Element {
  const params = useSearchParams()
  const page = params.get('page')
  const { data, isLoading, isValidating, mutate } = useSWR('projects', async () => await getProjects({ page }), { onSuccess: data => sortProjects(data.projects), revalidateIfStale: false })

  // TODO: improve this
  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderProjects = data !== undefined && data?.projects.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderProjects && !shouldRenderSkeleton

  return (
    <PageTransition>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderProjects && <ProjectList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
      <Toaster position='top-center' />
    </PageTransition>
  )
}
