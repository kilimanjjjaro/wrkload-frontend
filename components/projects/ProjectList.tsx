import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { RectangleStackIcon, PencilSquareIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline'
import Stats from 'components/projects/Stats'
import Pagination from 'components/shared/Pagination'
import MasonryGrid from 'components/shared/MasonryGrid'
import { DataContext } from 'contexts/DataContext'
import { ModalsContext } from 'contexts/ModalsContext'
import type { FullProjectInterface, ProjectInterface } from 'interfaces/projects/Project'
import dayjs from 'dayjs'

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
        {shouldRenderStats && (stats !== undefined || stats !== null) && !pathname?.includes('search') && <Stats stats={stats} />}
        {projects.map((project) => (
          <article
            key={project._id} className='relative flex flex-col items-start p-6 text-black transition ease-in-out bg-white rounded-3xl duration-400 group md:p-7'
          >
            <h3 className='block mb-5 text-4xl font-bold pr-7 xl:pr-0 font-primaryFont'>{project.name}</h3>

            <div className='flex flex-wrap gap-3 mt-4'>
              <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-1 bg-blue gap-x-1 font-secondaryFont'>
                <CalendarIcon className='w-4 stroke-2' />
                {dayjs(project.createdAt).format('DD-MM-YYYY')}
                <div className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-light-blue duration-400 group-hover/tooltip-1:opacity-100 group-hover/tooltip-1:visible rounded-full'>
                  Creation date
                </div>
              </div>
              <div className='relative flex items-center justify-center h-8 px-4 text-xs text-black rounded-full group/tooltip-2 bg-blue gap-x-1 font-secondaryFont'>
                <RectangleStackIcon className='w-4 stroke-2' />
                {project.totalTasks} tasks
                <div className='absolute invisible tracking-widest uppercase leading-none py-[7px] px-[10px] font-bold text-[8px] text-center transition-all ease-in-out opacity-0 top-7 bg-light-blue duration-400 group-hover/tooltip-2:opacity-100 group-hover/tooltip-2:visible rounded-full'>
                  Total tasks
                </div>
              </div>
            </div>

            <div className='absolute right-6 md:right-0 flex flex-col md:flex-row items-end justify-end md:justify-center md:w-full text-xs font-semibold tracking-widest text-black uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 md:-top-[0.9rem] xl:opacity-0 gap-2 md:gap-3 group-hover:opacity-100'>
              <div onClick={() => handleUpdateProjectClick(project)} className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-yellow hover:bg-blue'><PencilSquareIcon className='w-4 stroke-2' /></div>
              <div onClick={() => handleDeleteProjectClick(project)} className='flex items-center justify-center w-8 h-8 transition ease-in-out rounded-full cursor-pointer duration-400 bg-red hover:bg-blue'><TrashIcon className='w-4 stroke-2' /></div>
            </div>
          </article>
        ))}
      </MasonryGrid>
      <Pagination data={pagination} />
    </>
  )
}
