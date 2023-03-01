'use client'

import { useContext, useState } from 'react'
import { mutate } from 'swr'
import Balancer from 'react-wrap-balancer'
import { deleteProject } from 'services/projects/deleteProject'
import { deleteProjectOptions } from 'utils/swrProjectsOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'

import { DataContext } from 'contexts/DataContext'
import { ModalsContext } from 'contexts/ModalsContext'

export default function DeleteProject (): JSX.Element {
  const { selectedProject } = useContext(DataContext)
  const { setDeleteDataModalStatus } = useContext(ModalsContext)

  const [project, setProject] = useState(selectedProject)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProject({ ...project, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setDeleteDataModalStatus(false)

    try {
      await mutate('projects', deleteProject(project._id), deleteProjectOptions(project._id))
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setDeleteDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='w-full p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-t-3xl md:rounded-3xl'>
        <Headline variant='md'><Balancer>Sure to delete this project?</Balancer></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-3 gap-y-3'>
            <Input onChange={handleChange} value={project.name} name='name' type='text' placeholder='Name' centerText required disabled />
          </div>
          <div className='flex justify-center gap-x-3'>
            <Button type='submit' variant='secondary'>
              <ArrowRightIcon className='w-4 stroke-3' />
            </Button>
            <Button onClick={(event) => handleCloseModal(event)} variant='dark-alternative'>
              <XMarkIcon className='w-4 stroke-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
