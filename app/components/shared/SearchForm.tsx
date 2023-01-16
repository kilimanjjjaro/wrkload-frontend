'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'
import search from 'services/search'

interface Props {
  setModalStatus: (value: boolean) => void
  type: string
}

export default function SearchForm ({ setModalStatus, type }: Props): JSX.Element {
  const [query, setQuery] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const response = await search(type, query)
      setModalStatus(false)
      console.log(response)
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
        <Headline variant='md'><b>Search {type}</b></Headline>
        <form onSubmit={(event) => { void handleSubmit(event) }}>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={query} name='query' type='text' placeholder='Type and press enter' centerText required />
          </div>
          <Button onClick={handleCloseModal} variant='secondary'>
            <XMarkIcon className='w-4 stroke-width-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
