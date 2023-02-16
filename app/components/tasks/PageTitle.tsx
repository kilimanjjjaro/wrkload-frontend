'use client'

import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import ProjectSelector from 'app/components/tasks/ProjectSelector'
import { getProjects } from 'services/projects/getProjects'

import { DataContext } from 'context/DataContext'

export default function PageTitle (): JSX.Element {
  const { setSelectedProjectToFetch } = useContext(DataContext)
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
    <h2 className='flex text-6xl text-white gap-x-5 font-primaryFont'>
      Tasks of
      {shouldRenderSkeleton && <div className='w-56 bg-white h-14 animate-pulse' />}
      {!shouldRenderSkeleton && (
        <ProjectSelector projectNames={sortedProjectNames} />
      )}
    </h2>
  )
}
