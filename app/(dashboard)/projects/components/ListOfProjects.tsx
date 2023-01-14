import { CalendarIcon, InboxStackIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import MasonryGrid from 'app/components/shared/MasonryGrid'
import ProjectInterface from 'interfaces/projects/Project'

const fetchProjects = (): ProjectInterface[] => {
  const data = [
    { id: 1, name: 'Vercel', createdAt: '05/09/2022', totalTasks: '5 tasks' },
    { id: 2, name: 'Apple', createdAt: '05/09/2022', totalTasks: '15 tasks' },
    { id: 3, name: 'MSI', createdAt: '05/09/2022', totalTasks: '2 tasks' },
    { id: 4, name: 'Figma', createdAt: '05/09/2022', totalTasks: '4 tasks' },
    { id: 5, name: 'Vercel', createdAt: '05/09/2022', totalTasks: '5 tasks' },
    { id: 6, name: 'Apple', createdAt: '05/09/2022', totalTasks: '3 tasks' },
    { id: 7, name: 'MSI', createdAt: '05/09/2022', totalTasks: '2 tasks' },
    { id: 8, name: 'Figma', createdAt: '05/09/2022', totalTasks: '23 tasks' }
  ]
  return data
}

export default async function ListOfProjects (): Promise<JSX.Element> {
  const projects = await fetchProjects()

  return (
    <MasonryGrid>
      {projects.map((project, index) => (
        <div key={index} className='relative flex flex-col items-start bg-white group p-7 dark:bg-white'>
          <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{project.name}</h3>
          <h3 className='mb-5 text-3xl font-bold font-primaryFont'>{project.id}</h3>
          <div className='flex flex-wrap gap-3 mt-4'>
            <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><CalendarIcon className='w-4 stroke-width-2' /> {project.createdAt}</div>
            <div className='flex items-center h-8 px-4 text-xs text-white bg-black rounded-full gap-x-1 font-secondaryFont'><InboxStackIcon className='w-4 stroke-width-2' /> {project.totalTasks}</div>
          </div>
          <div className='absolute left-0 flex justify-center w-full transition ease-in-out opacity-100 duration-400 -top-4 xl:opacity-0 gap-x-3 group-hover:opacity-100'>
            <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-yellow hover:text-white hover:bg-black'><PencilSquareIcon className='w-4 stroke-width-2' /></div>
            <div className='flex items-center h-8 px-4 text-black transition ease-in-out rounded-full cursor-pointer duration-400 bg-custom-red hover:text-white hover:bg-black'><TrashIcon className='w-4 stroke-width-2' /></div>
          </div>
        </div>
      ))}
    </MasonryGrid>
  )
}
