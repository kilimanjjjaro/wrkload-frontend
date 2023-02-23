'use client'

import { useEffect } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import Headline from 'components/shared/Headline'

interface Props {
  error: Error
  reset: () => void
}

export default function GlobalError ({ error, reset }: Props): JSX.Element {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <html>
      <head />
      <body>
        <main className='px-[5vw] flex items-center justify-center h-screen'>
          <div className='flex flex-col items-center gap-y-5'>
            <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto'>
              <Headline variant='md'><b>Something went wrong!</b></Headline>
              <Button onClick={() => reset()} variant='secondary'>
                <ArrowLeftIcon className='w-4 stroke-3' />
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
