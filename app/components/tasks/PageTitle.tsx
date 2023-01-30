'use client'

import { useContext, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import ProjectSelector from 'app/components/tasks/ProjectSelector'
import { getProjects } from 'services/projects/getProjects'

import { DataContext } from 'context/DataContext'

export default function PageTitle (): JSX.Element {
  const { selectedProjectToFetch } = useContext(DataContext)
  const { data: projects, isLoading } = useSWR('projects', getProjects)
  let sortedProjectNames: string[] = []

  if (projects !== undefined) sortedProjectNames = projects?.map((project) => project.name).sort()

  useEffect(() => {
    const mutateData = async (): Promise<void> => {
      await mutate('tasks')
      await mutate('taskStats')
    }
    mutateData().catch((error) => console.error(error))
  }, [selectedProjectToFetch])

  const shouldRenderSkeleton = isLoading || sortedProjectNames.length === 0

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
