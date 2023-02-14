'use client'

import useSWR from 'swr'
import Header from 'app/components/users/Header'
import Loading from 'app/components/users/Loading'
import UserList from 'app/components/users/UserList'
import NotFound from 'app/components/users/NotFound'
import Modals from 'app/components/users/Modals'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'

export default function Users (): JSX.Element {
  const { data, isLoading } = useSWR('users', getUsers, { onSuccess: data => sortUsers(data) })

  const shouldRenderUsers = data !== undefined && data.length >= 1 && !isLoading
  const shouldRenderSkeleton = isLoading
  const shouldRenderNotFoundSign = !isLoading && (data === undefined || data?.length === 0)

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderUsers && <UserList users={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
