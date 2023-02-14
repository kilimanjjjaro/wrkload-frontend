import { useContext } from 'react'
import { InboxStackIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Stats from 'app/components/projects/Stats'
import Pagination from 'app/components/shared/Pagination'
import MasonryGrid from 'app/components/shared/MasonryGrid'

import { DataContext } from 'context/DataContext'
import { ModalsContext } from 'context/ModalsContext'
import type { ProjectInterface, ProjectStatsInterface } from 'interfaces/projects/Project'

interface Props {
  projects: ProjectInterface[]
  stats?: ProjectStatsInterface
}

export default function ProjectList ({ projects, stats }: Props): JSX.Element {
  const { setSelectedProject, shouldRenderStats } = useContext(DataContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } = useContext(ModalsContext)

  const handleUpdateProjectClick = (project: ProjectInterface): void => {
    setSelectedProject(project)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteProjectClick = (project: ProjectInterface): void => {
    setSelectedProject(project)
    setDeleteDataModalStatus(true)
  }

  return (
    <>
      <MasonryGrid>
        {shouldRenderStats && stats !== undefined && <Stats stats={stats} />}
        {projects.map((project) => (
          <div key={project._id} className='relative flex flex-col items-start transition ease-in-out bg-white hover:bg-white duration-400 text-dark-gray group p-7'>
            <h3 className='mb-5 text-4xl font-bold break-all font-primaryFont'>{project.name}</h3>

            <div className='flex items-center h-8 px-4 mt-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Total tasks'><InboxStackIcon className='w-4 stroke-2' />{project.totalTasks} tasks</div>

            <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-yellow hover:bg-dark-gray'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => handleDeleteProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-red hover:bg-dark-gray'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
      <Pagination />
    </>
  )
}
