'use client'

import { useContext, useState } from 'react'
import { mutate } from 'swr'
import { updateProject } from 'services/projects/updateProject'
import { updateProjectOptions } from 'utils/swrProjectsOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'

import { DataContext } from 'context/DataContext'
import { ModalsContext } from 'context/ModalsContext'

export default function UpdateProject (): JSX.Element {
  const { selectedProject } = useContext(DataContext)
  const { setUpdateDataModalStatus } = useContext(ModalsContext)

  const [project, setProject] = useState(selectedProject)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProject({ ...project, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setUpdateDataModalStatus(false)

    try {
      await mutate('projects', updateProject(project), updateProjectOptions(project))
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setUpdateDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Update project</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={project.name} name='name' type='text' placeholder='Name' centerText required />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
            <Button onClick={(event) => handleCloseModal(event)} variant='light-alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
