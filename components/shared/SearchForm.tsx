'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'
import Input from 'components/shared/Input'

import { DataContext } from 'contexts/DataContext'

interface Props {
  type: string
  setModalStatus: (value: boolean) => void
}

export default function SearchForm ({ type, setModalStatus }: Props): JSX.Element {
  const { selectedProjectToFetch } = useContext(DataContext)
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value)
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setModalStatus(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    try {
      if (type === 'task') router.push(`/tasks/search?project=${selectedProjectToFetch}&query=${query}`)
      if (type === 'project') router.push(`/projects/search?query=${query}`)
      if (type === 'user') router.push(`/users/search?query=${query}`)
      setModalStatus(false)
    } catch (error: any) {
      console.error(error.response)
    }
  }

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='w-full p-6 text-center text-black md:p-10 bg-blue md:w-96 min-w-auto rounded-t-3xl md:rounded-3xl'>
        <Headline variant='md'><b>Search {type}s</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={query} name='query' type='text' placeholder='What are you looking for?' centerText required />
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
