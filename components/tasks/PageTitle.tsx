'use client'

import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import ProjectSelector from 'components/tasks/ProjectSelector'
import { getProjects } from 'services/projects/getProjects'
import { AppContext } from 'contexts/AppContext'
import { EMPTY_LENGTH, FIRST_INDEX } from 'constants/math'

export default function PageTitle (): React.JSX.Element {
  const { setSelectedProjectToFetch } = useContext(AppContext)
  let sortedProjectNames: string[] = []

  const { data, isLoading } = useSWR('projects', async () => await getProjects({ page: '1', noLimit: true }))

  if (data !== undefined) sortedProjectNames = data.projects.map((project) => project.name).sort()

  const shouldRenderSkeleton = isLoading || sortedProjectNames.length === EMPTY_LENGTH

  useEffect(() => {
    if (sortedProjectNames.length > EMPTY_LENGTH) {
      setSelectedProjectToFetch(sortedProjectNames[FIRST_INDEX])
    }
  }, [data])

  return (
    <h2 className='flex flex-col text-6xl md:flex-row gap-x-5 font-primaryFont'>
      <span className='transition-colors ease-in-out duration-400'>Tasks of</span>
      {shouldRenderSkeleton && <div className='w-56 rounded-full bg-linear-to-r from-white dark:from-light-blue via-blue dark:via-blue to-white dark:to-light-blue bg-size-[200%_100%] h-14 animate-skeleton' />}
      {!shouldRenderSkeleton && (
        <ProjectSelector projectNames={sortedProjectNames} />
      )}
    </h2>
  )
}
