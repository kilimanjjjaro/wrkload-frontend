'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Loading from 'app/components/projects/Loading'
import Modals from 'app/components/projects/Modals'
import Button from 'app/components/shared/Button'
import ProjectList from 'app/components/projects/ProjectList'
import notFoundImage from 'public/images/not-found.webp'
import searchProjects from 'services/projects/searchProjects'
import { sortProjects } from 'utils/sortData'

export default function SearchProjects (): JSX.Element {
  const params = useSearchParams()
  const queryParam = params.get('query')
  const router = useRouter()

  const { data: projects, isLoading, isValidating } = useSWR('projects', async () => await searchProjects({ query: queryParam }), { onSuccess: data => sortProjects(data), revalidate: false })

  const shouldRenderTasks = projects !== undefined && projects.length >= 1 && !isLoading && !isValidating
  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderNotFoundSign = !isLoading && !isValidating && (projects === undefined || projects.length === 0)

  return (
    <>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-white gap-x-5 font-primaryFont'>
          Search results for: {queryParam}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button onClick={() => router.push('/projects')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /> Go to projects</Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderTasks && <ProjectList projects={projects} />}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-56'
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center font-secondaryFont text-dark-gray'>No search results found. <br className='hidden lg:block' />Please try again.</span>
            <Button onClick={() => router.push('/projects')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
          </div>
        )}
      </main>
      <Modals />
    </>
  )
}
