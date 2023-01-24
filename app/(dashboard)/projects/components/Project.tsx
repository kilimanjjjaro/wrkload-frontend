'use client'

import { SetStateAction, Dispatch } from 'react'
import { InboxStackIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ProjectInterface } from 'interfaces/projects/Project'

interface Props {
  project: ProjectInterface
  setUpdateModalStatus: Dispatch<SetStateAction<boolean>>
  setDeleteModalStatus: Dispatch<SetStateAction<boolean>>
  setSelectedProject: Dispatch<SetStateAction<ProjectInterface>>
}

export default function Project ({ project, setUpdateModalStatus, setDeleteModalStatus, setSelectedProject }: Props): JSX.Element {
  const handleUpdateProjectClick = (project: ProjectInterface): void => {
    setUpdateModalStatus(true)
    setSelectedProject(project)
  }

  const handleDeleteProjectClick = (project: ProjectInterface): void => {
    setDeleteModalStatus(true)
    setSelectedProject(project)
  }

  return (
    <div key={project._id} className='relative flex flex-col items-start transition ease-in-out bg-white hover:bg-white duration-400 text-dark-gray group p-7'>
      <h3 className='mb-5 text-4xl font-bold break-all font-primaryFont'>{project.name}</h3>

      <div className='flex items-center h-8 px-4 mt-4 text-xs text-white bg-light-gray gap-x-1 font-secondaryFont' title='Total tasks'><InboxStackIcon className='w-4 stroke-2' />{project.totalTasks}</div>

      <div className='absolute left-0 flex justify-center w-full text-xs font-semibold tracking-widest text-white uppercase transition ease-in-out opacity-100 font-secondaryFont duration-400 -top-[0.9rem] xl:opacity-0 gap-x-3 group-hover:opacity-100'>
        <div onClick={() => handleUpdateProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-yellow hover:bg-dark-gray'><PencilSquareIcon className='w-4 stroke-2' /></div>
        <div onClick={() => handleDeleteProjectClick(project)} className='flex items-center px-[0.82rem] transition ease-in-out cursor-pointer h-[1.8rem] duration-400 bg-custom-red hover:bg-dark-gray'><TrashIcon className='w-4 stroke-2' /></div>
      </div>
    </div>
  )
}
