'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { getCookie } from 'cookies-next/client'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import Balancer from 'react-wrap-balancer'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import PageTransition from 'components/shared/PageTransition'
import Skeleton from 'components/users/Skeleton'
import Modals from 'components/users/Modals'
import Button from 'components/shared/Button'
import UserList from 'components/users/UserList'
import notFoundImage from 'public/images/not-found.webp'
import searchUsers from 'services/users/searchUsers'
import { sortUsers } from 'utils/sortData'
import { MIN_LENGTH } from 'constants/math'
import { logError } from 'utils/logError'

export default function SearchUsers(): React.JSX.Element {
  const params = useSearchParams()
  const query = params.get('query')
  const page = params.get('page')
  const router = useRouter()
  const accessToken = getCookie('accessToken')
  const isTrialAccount =
    accessToken !== undefined &&
    jwtDecode<{ uid: string }>(accessToken).uid === '6439b01cf35b6e22570cd842'

  const { data, isLoading, isValidating, mutate } = useSWR(
    'users',
    async () => await searchUsers({ query, page }),
    { onSuccess: (data) => sortUsers(data.users) }
  )

  useEffect(() => {
    if (isTrialAccount) {
      toast(
        <>
          <ShieldCheckIcon className='w-4 stroke-blue stroke-3' />
          <h3 className='font-bold'>How data do we store?</h3>
          <p>
            <Balancer>
              These are all the data we store of you. Only admins and trial
              accounts can view this page.
            </Balancer>
          </p>
        </>
      )
    }
  }, [isTrialAccount])

  useEffect(() => {
    mutate().catch(logError)
  }, [page, mutate])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers =
    data !== undefined &&
    data.users.length >= MIN_LENGTH &&
    !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <PageTransition>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-black dark:text-blue gap-x-5 font-primaryFont'>
          Search results for: {query}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button
              onClick={() => {
                router.push('/users')
              }}
              variant='primary'
            >
              <ArrowLeftIcon className='w-4 stroke-3' /> Go to users
            </Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && (
          <UserList data={data} isTrialAccount={isTrialAccount} />
        )}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-72'
              preload
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center text-black dark:text-white font-secondaryFont'>
              No search results found. <br className='hidden lg:block' />
              Please try again.
            </span>
            <Button
              ariaLabel='Go to users'
              className='w-auto!'
              onClick={() => {
                router.push('/users')
              }}
              variant='primary'
            >
              <ArrowLeftIcon className='w-4 stroke-3' />
            </Button>
          </div>
        )}
      </main>
      <Modals />
    </PageTransition>
  )
}
