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
  const { data, isLoading, isValidating } = useSWR('users', getUsers, { onSuccess: data => sortUsers(data.users) })

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Loading />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
