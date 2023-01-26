'use client'

import useSWR from 'swr'
import Header from 'app/components/users/Header'
import Loading from 'app/components/users/Loading'
import UserList from 'app/components/users/UserList'
import NotFound from 'app/components/users/NotFound'
import Modals from 'app/components/users/Modals'
import { getUsers } from 'services/users/getUsers'

import { USERS_ENDPOINT as key } from 'constants/users'

export default function Users (): JSX.Element {
  const { data, isLoading } = useSWR(key, getUsers, { onSuccess: data => data.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()) })

  const shouldRenderUsers = data !== undefined && data.length >= 1 && !isLoading
  const shouldRenderSkeleton = isLoading
  const shouldRenderNotFoundSign = !isLoading && (data === undefined || data?.length === 0)

  return (
    <div className='px-[5vw] w-full py-40 pb-36 bg-light-gray'>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderUsers && <UserList users={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </div>
  )
}
