'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Headline from 'components/shared/Headline'
import Button from 'components/shared/Button'
import PageTransition from 'components/shared/PageTransition'
import confirmAccount from 'services/auth/confirmAccount'

interface ParamsInterface {
  params: {
    confirmAccountToken: string
  }
}

export default function ConfirmAccount({ params }: ParamsInterface): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleClick = (): void => {
    setError('')

    if (error === 'auth/account-already-confirmed') {
      router.push('/login')
    }

    if (error === 'token/token-expired') {
      router.push('/resend-confirmation-account-link')
    }
  }

  useEffect(() => {
    setIsLoading(true)

    const sendConfirmAccount = async (): Promise<void> => {
      const { confirmAccountToken } = params

      try {
        await confirmAccount({ confirmAccountToken })
      } catch (error: any) {
        setError(error.response.data.code)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.confirmAccountToken !== undefined) {
      sendConfirmAccount().catch((error: any) => console.error(error))
    }
  }, [params])

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>We have a problem!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'>
            <Balancer>
              {error === 'auth/account-already-confirmed' && 'This account has already been confirmed, please try log in.'}
              {error === 'token/token-expired' && 'Sorry, the confirmation link has expired. Please request one again.'}
            </Balancer>
          </p>
          <Button ariaLabel='Next' onClick={handleClick} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <PageTransition>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl animate-pulse'>
          <p className='font-secondaryFont'><Balancer>Checking account status, please wait.</Balancer></p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-6 text-center text-black md:p-10 bg-blue md:w-80 min-w-auto rounded-3xl'>
          <Headline variant='md'><Balancer>Done!</Balancer></Headline>
          <p className='mb-5 text-sm font-secondaryFont'><Balancer>The account has been confirmed. <b>Please, log in.</b></Balancer></p>
          <Button ariaLabel='Login' onClick={() => router.push('/login')} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
