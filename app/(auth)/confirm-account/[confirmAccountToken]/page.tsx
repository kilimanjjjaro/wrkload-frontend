'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'
import confirmAccount from 'services/auth/confirmAccount'

interface ParamsInterface {
  params: {
    confirmAccountToken: string
  }
}

export default function ConfirmAccount ({ params }: ParamsInterface): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleClick = (): void => {
    setError('')

    if (error === 'auth/account-already-confirmed') {
      router.push('/auth/login')
    }

    if (error === 'token/token-expired') {
      router.push('/resend-confirmation-account-link')
    }
  }

  useEffect(() => {
    setLoading(true)

    const sendConfirmAccount = async (): Promise<void> => {
      const { confirmAccountToken } = params

      try {
        await confirmAccount({ confirmAccountToken })
      } catch (error: any) {
        setError(error.response.data.code)
      } finally {
        setLoading(false)
      }
    }

    if (params.confirmAccountToken !== undefined) {
      sendConfirmAccount().catch((error: any) => console.error(error))
    }
  }, [params])

  if (error.length >= 1) {
    return (
      <div className='flex flex-col items-center gap-y-5'>
        <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto'>
          <h2 className='text-xl leading-tight mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl'><b>We have a problem!</b></h2>
          <p className='text-sm md:mb-5 font-secondaryFont'>
            <Balancer>
              {error === 'auth/account-already-confirmed' && 'This account has already been confirmed, please try log in.'}
              {error === 'token/token-expired' && 'Sorry, the confirmation link has expired. Please request one again.'}
            </Balancer>
          </p>
          <Button onClick={handleClick} variant='secondary'>
            <ArrowRightIcon className='w-4 stroke-3' />
          </Button>
        </div>
      </div>
    )
  }

  if (loading) return <div className='text-white'>Loading...</div>

  return (
    <div className='flex flex-col items-center gap-y-5'>
      <div className='p-10 text-center text-white bg-black dark:text-black dark:bg-white md:w-80 min-w-auto'>
        <h2 className='text-xl leading-tight mb-7 md:mb-10 font-primaryFont md:text-3xl 2xl:text-4xl'><b>Done!</b></h2>
        <p className='mb-5 text-sm font-secondaryFont'><Balancer>The account has been confirmed. <b>Please, log in.</b></Balancer></p>
        <Button onClick={() => router.push('/login')} variant='secondary'>
          <ArrowRightIcon className='w-4 stroke-3' />
        </Button>
      </div>
    </div>
  )
}
