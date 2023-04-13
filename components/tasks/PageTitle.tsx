'use client'

import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import ProjectSelector from 'components/tasks/ProjectSelector'
import { getProjects } from 'services/projects/getProjects'
import { AppContext } from 'contexts/AppContext'

export default function PageTitle (): JSX.Element {
  const { setSelectedProjectToFetch } = useContext(AppContext)
  let sortedProjectNames: string[] = []

  const { data, isLoading } = useSWR('projects', async () => await getProjects({ page: '1', noLimit: true }))

  if (data !== undefined) sortedProjectNames = data?.projects.map((project) => project.name).sort()

  const shouldRenderSkeleton = isLoading || sortedProjectNames.length === 0

  useEffect(() => {
    if (sortedProjectNames.length > 0) {
      setSelectedProjectToFetch(sortedProjectNames[0])
    }
  }, [data])

  return (
    <h2 className='flex flex-col text-6xl md:flex-row gap-x-5 font-primaryFont'>
      <span className='transition-colors ease-in-out duration-400'>Tasks of</span>
      {shouldRenderSkeleton && <div className='w-56 rounded-full bg-gradient-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-[length:200%_100%] h-14 animate-skeleton' />}
      {!shouldRenderSkeleton && (
        <ProjectSelector projectNames={sortedProjectNames} />
      )}
    </h2>
  )
}
