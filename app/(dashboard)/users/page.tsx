'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Header from 'app/components/users/Header'
import Skeleton from 'app/components/users/Skeleton'
import UserList from 'app/components/users/UserList'
import NotFound from 'app/components/users/NotFound'
import Modals from 'app/components/users/Modals'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'

export default function Users (): JSX.Element {
  const params = useSearchParams()
  const page = params.get('page')

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await getUsers({ page }), { onSuccess: data => sortUsers(data.users) })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </>
  )
}
