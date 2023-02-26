'use client'

import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import ProjectSelector from 'components/tasks/ProjectSelector'
import { getProjects } from 'services/projects/getProjects'
import { DataContext } from 'contexts/DataContext'

export default function PageTitle (): JSX.Element {
  const { setSelectedProjectToFetch } = useContext(DataContext)
  let sortedProjectNames: string[] = []

  const { data, isLoading } = useSWR('projects', async () => await getProjects({ page: '1', noLimit: true }), { revalidateIfStale: false })

  if (data !== undefined) sortedProjectNames = data?.projects.map((project) => project.name).sort()

  const shouldRenderSkeleton = isLoading || sortedProjectNames.length === 0

  useEffect(() => {
    if (sortedProjectNames.length > 0) {
      setSelectedProjectToFetch(sortedProjectNames[0])
    }
  }, [data])

  return (
    <h2 className='flex text-6xl gap-x-5 font-primaryFont'>
      <span className='transition-colors ease-in-out duration-400'>Tasks of</span>
      {shouldRenderSkeleton && <div className='w-56 bg-gradient-to-r from-blue via-light-blue to-blue bg-[length:200%_100%] h-14 animate-skeleton' />}
      {!shouldRenderSkeleton && (
        <ProjectSelector projectNames={sortedProjectNames} />
      )}
    </h2>
  )
}
