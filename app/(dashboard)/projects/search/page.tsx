'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Toaster } from 'sonner'
import Skeleton from 'components/projects/Skeleton'
import Modals from 'components/projects/Modals'
import Button from 'components/shared/Button'
import PageTransition from 'components/shared/PageTransition'
import ProjectList from 'components/projects/ProjectList'
import notFoundImage from 'public/images/not-found.webp'
import searchProjects from 'services/projects/searchProjects'
import { sortProjects } from 'utils/sortData'

export default function SearchProjects (): JSX.Element {
  const params = useSearchParams()
  const query = params.get('query')
  const page = params.get('page')
  const router = useRouter()

  const { data, isLoading, isValidating, mutate } = useSWR('projects', async () => await searchProjects({ query, page }), { onSuccess: data => sortProjects(data.projects), revalidateIfStale: false, revalidateOnFocus: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderProjects = data !== undefined && data?.projects.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderProjects && !shouldRenderSkeleton

  return (
    <PageTransition>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-black dark:text-blue gap-x-5 font-primaryFont'>
          Search results for: {query}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button onClick={() => router.push('/projects')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /> Go to projects</Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderProjects && <ProjectList data={data} />}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-72'
              priority
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center text-black dark:text-white font-secondaryFont'>No search results found. <br className='hidden lg:block' />Please try again.</span>
            <Button className='!w-auto' onClick={() => router.push('/projects')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
          </div>
        )}
      </main>
      <Modals />
      <Toaster position='top-center' />
    </PageTransition>
  )
}
