'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getCookie } from 'cookies-next/client'
import { jwtDecode } from 'jwt-decode'
import Header from 'components/users/Header'
import Skeleton from 'components/users/Skeleton'
import UserList from 'components/users/UserList'
import NotFound from 'components/users/NotFound'
import Modals from 'components/users/Modals'
import PageTransition from 'components/shared/PageTransition'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'
import { MIN_LENGTH } from 'constants/math'
import { logError } from 'utils/logError'

export default function Users(): React.JSX.Element {
  const accessToken = getCookie('accessToken')
  const isTrialAccount =
    accessToken !== undefined &&
    jwtDecode<{ uid: string }>(accessToken).uid === '6439b01cf35b6e22570cd842'
  const params = useSearchParams()
  const page = params.get('page')

  const { data, isLoading, isValidating, mutate } = useSWR(
    'users',
    async () => await getUsers({ page }),
    { onSuccess: (data) => sortUsers(data.users) }
  )

  useEffect(() => {
    mutate().catch(logError)
  }, [page, mutate])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers =
    data !== undefined && data.users.length >= MIN_LENGTH && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <PageTransition>
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && (
          <UserList data={data} isTrialAccount={isTrialAccount} />
        )}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </PageTransition>
  )
}
