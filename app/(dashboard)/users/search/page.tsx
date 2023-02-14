'use client'

import useSWR from 'swr'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Loading from 'app/components/users/Loading'
import Modals from 'app/components/users/Modals'
import Button from 'app/components/shared/Button'
import UserList from 'app/components/users/UserList'
import notFoundImage from 'public/images/not-found.webp'
import searchUsers from 'services/users/searchUsers'
import { sortUsers } from 'utils/sortData'

export default function SearchUsers (): JSX.Element {
  const params = useSearchParams()
  const query = params.get('query')
  const router = useRouter()

  const { data, isLoading, isValidating } = useSWR('users', async () => await searchUsers({ query }), { onSuccess: data => sortUsers(data.users), revalidate: false })

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <>
      <header className='flex justify-between mb-10 text-white'>
        <h2 className='flex text-6xl font-bold text-white gap-x-5 font-primaryFont'>
          Search results for: {query}
        </h2>
        {!shouldRenderNotFoundSign && (
          <div className='flex items-start gap-x-5'>
            <Button onClick={() => router.push('/users')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /> Go to users</Button>
          </div>
        )}
      </header>
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && (
          <div className='flex flex-col items-center h-full mt-28 gap-y-5'>
            <Image
              className='w-56'
              src={notFoundImage}
              alt='Not found image'
            />
            <span className='text-xl text-center font-secondaryFont text-dark-gray'>No search results found. <br className='hidden lg:block' />Please try again.</span>
            <Button onClick={() => router.push('/users')} variant='primary'><ArrowLeftIcon className='w-4 stroke-3' /></Button>
          </div>
        )}
      </main>
      <Modals />
    </>
  )
}
