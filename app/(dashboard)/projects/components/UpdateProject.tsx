'use client'

import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import { ProjectInterface } from 'interfaces/projects/Project'
import { useState } from 'react'
import updateProject from 'services/projects/updateProject'

interface Props {
  setModalStatus: (value: boolean) => void
  data: ProjectInterface
}

export default function UpdateProject ({ setModalStatus, data }: Props): JSX.Element {
  const [project, setProject] = useState(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProject({ ...project, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await updateProject(project)
      setModalStatus(false)
    } catch (error: any) {
      console.error(error.response.data)
    }
  }

  const handleCloseModal = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setModalStatus(false)
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
              <ArrowRightIcon className='w-4 stroke-width-3' />
            </Button>
            <Button onClick={handleCloseModal} variant='alternative'>
              <XMarkIcon className='w-4 stroke-width-3' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}