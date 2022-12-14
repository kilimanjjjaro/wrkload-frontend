'use client'

import { useEffect, useState } from 'react'
import Feedback from 'app/components/shared/Feedback'

interface Props {
  error: Error
}

export default function Error ({ error }: Props): JSX.Element {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setTitle('We have a problem!')
    setDescription('The email or password is not valid. Please, try again.')
    console.error(error)
  }, [error])

  return (
    <Feedback title={title} description={description} />
  )
}
