'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Button from 'app/components/shared/Button'
import Headline from 'app/components/shared/Headline'
import Input from 'app/components/shared/Input'

import { DataContext } from 'context/DataContext'

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

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        event.preventDefault()

        try {
          router.push(`/${type}s/search?project=${selectedProjectToFetch}&search=${query}`)
          setModalStatus(false)
        } catch (error: any) {
          console.error(error.response)
        }
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [query, selectedProjectToFetch])

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center bg-white text-dark-gray md:w-96 min-w-auto'>
        <Headline variant='md'><b>Search {type}</b></Headline>
        <form>
          <div className='flex flex-col mb-5 gap-y-3'>
            <Input variant='primary' onChange={handleChange} value={query} name='query' type='text' placeholder='Type and press enter' centerText required />
          </div>
          <Button onClick={(event) => handleCloseModal(event)} variant='light-alternative'>
            <XMarkIcon className='w-4 stroke-3' />
          </Button>
        </form>
      </div>
    </div>
  )
}
