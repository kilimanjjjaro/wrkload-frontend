import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { InboxStackIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Stats from 'components/projects/Stats'
import Pagination from 'components/shared/Pagination'
import MasonryGrid from 'components/shared/MasonryGrid'
import { DataContext } from 'contexts/DataContext'
import { ModalsContext } from 'contexts/ModalsContext'
import type { FullProjectInterface, ProjectInterface } from 'interfaces/projects/Project'

export default function ProjectList ({ data }: { data: FullProjectInterface }): JSX.Element {
  const { setSelectedProject, shouldRenderStats } = useContext(DataContext)
  const { setUpdateDataModalStatus, setDeleteDataModalStatus } = useContext(ModalsContext)
  const pathname = usePathname()

  const handleUpdateProjectClick = (project: ProjectInterface): void => {
    setSelectedProject(project)
    setUpdateDataModalStatus(true)
  }

  const handleDeleteProjectClick = (project: ProjectInterface): void => {
    setSelectedProject(project)
    setDeleteDataModalStatus(true)
  }

  const projects = data?.projects
  const stats = data?.stats
  const pagination = data?.pagination

  return (
    <>
      <MasonryGrid>
        {shouldRenderStats && (stats !== undefined || stats !== null) && pathname?.includes('search') === false && <Stats stats={stats} />}
        {projects.map((project) => (
          <div
            key={project._id} className='relative flex flex-col items-start text-black transition ease-in-out bg-white hover:bg-white duration-400 group p-7'
          >
            <h3 className='mb-5 text-4xl font-bold break-all font-primaryFont'>{project.name}</h3>

            <div className='flex items-center h-8 px-4 text-xs text-black bg-light-pink gap-x-1 font-secondaryFont' title='Total tasks'><InboxStackIcon className='w-4 stroke-2' />{project.totalTasks} tasks</div>

            <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-yellow hover:bg-pink'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => handleDeleteProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-red hover:bg-pink'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </div>
        ))}
      </MasonryGrid>
      <Pagination data={pagination} />
    </>
  )
}
