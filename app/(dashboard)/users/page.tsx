'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { Toaster } from 'sonner'
import jwtDecode from 'jwt-decode'
import Header from 'components/users/Header'
import Skeleton from 'components/users/Skeleton'
import UserList from 'components/users/UserList'
import NotFound from 'components/users/NotFound'
import Modals from 'components/users/Modals'
import PageTransition from 'components/shared/PageTransition'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'
import { getCookie } from 'cookies-next'

export default function Users (): JSX.Element {
  const router = useRouter()
  const params = useSearchParams()
  const page = params.get('page')
  const accessToken = getCookie('accessToken')

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await getUsers({ page }), { onSuccess: data => sortUsers(data.users) })

  useEffect(() => {
    if (accessToken !== undefined) {
      const { role }: { role: number } = jwtDecode(accessToken as string)

      if (role !== 1) {
        router.push('/tasks')
      }
    }
  }, [accessToken])

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <PageTransition>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
      <Toaster position='top-center' toastOptions={{ className: 'optimistic-ui-notifications' }} duration={4000} />
    </PageTransition>
  )
}
