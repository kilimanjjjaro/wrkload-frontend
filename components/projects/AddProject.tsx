'use client'

import { useContext, useState } from 'react'
import { mutate } from 'swr'
import { addProject } from 'services/projects/addProject'
import { addProjectOptions } from 'utils/swrProjectsOptions'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'

import { ModalsContext } from 'contexts/ModalsContext'
import { INITIAL_PROJECT_STATE } from 'constants/projects'

export default function AddProject (): JSX.Element {
  const { setAddDataModalStatus } = useContext(ModalsContext)

  const [project, setProject] = useState(INITIAL_PROJECT_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setProject({ ...project, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setAddDataModalStatus(false)

    try {
      await mutate('projects', addProject(project), addProjectOptions(project))
    } catch (error: any) {
      console.error(error.response)
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setAddDataModalStatus(false)
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-black bg-blue md:w-96 min-w-auto'>
        <Headline variant='md'><b>Add project</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={project.name} name='name' type='text' placeholder='Name' centerText required />
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
