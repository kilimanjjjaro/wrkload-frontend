'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Skeleton from 'components/users/Skeleton'
import Modals from 'components/users/Modals'
import Button from 'components/shared/Button'
import UserList from 'components/users/UserList'
import notFoundImage from 'public/images/not-found.webp'
import searchUsers from 'services/users/searchUsers'
import { sortUsers } from 'utils/sortData'

export default function SearchUsers (): JSX.Element {
  const params = useSearchParams()
  const query = params.get('query')
  const page = params.get('page')
  const router = useRouter()

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await searchUsers({ query, page }), { onSuccess: data => sortUsers(data.users), revalidateIfStale: false, revalidateOnFocus: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-blue gap-x-5 font-primaryFont'>
          Search results for: {query}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button onClick={() => router.push('/users')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /> Go to users</Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-56'
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center text-black font-secondaryFont'>No search results found. <br className='hidden lg:block' />Please try again.</span>
            <Button onClick={() => router.push('/users')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
          </div>
        )}
      </main>
      <Modals />
    </>
  )
}
