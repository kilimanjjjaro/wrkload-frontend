'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Header from 'components/users/Header'
import Skeleton from 'components/users/Skeleton'
import UserList from 'components/users/UserList'
import NotFound from 'components/users/NotFound'
import Modals from 'components/users/Modals'
import PageTransition from 'components/shared/PageTransition'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'

export default function Users (): JSX.Element {
  const [isTrialAccount, setIsTrialAccount] = useState(false)
  const accessToken = getCookie('accessToken')
  const params = useSearchParams()
  const page = params.get('page')

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await getUsers({ page }), { onSuccess: data => sortUsers(data.users) })

  useEffect(() => {
    if (accessToken !== undefined) {
      const { uid }: { uid: string } = jwtDecode(accessToken as string)

      if (uid === '6439b01cf35b6e22570cd842') {
        setIsTrialAccount(true)
      }
    }
  }, [accessToken])

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page, mutate])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <PageTransition>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && <UserList data={data} isTrialAccount={isTrialAccount} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </PageTransition>
  )
}
