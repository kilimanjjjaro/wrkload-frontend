'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Balancer from 'react-wrap-balancer'
import { toast } from 'sonner'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
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
  const params = useSearchParams()
  const page = params.get('page')
  const accessToken = getCookie('accessToken')

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await getUsers({ page }), { onSuccess: data => sortUsers(data.users) })

  useEffect(() => {
    if (accessToken !== undefined) {
      const { uid }: { uid: string } = jwtDecode(accessToken as string)

      if (uid === '6439b01cf35b6e22570cd842') {
        setIsTrialAccount(true)

        toast(
          <>
            <ShieldCheckIcon className='w-4 stroke-blue stroke-3' />
            <h3 className='font-bold'>How data do we store?</h3>
            <p><Balancer>These are all the data we store of you. Only admins and trial accounts can view this page.</Balancer></p>
          </>
        )
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
        {shouldRenderUsers && <UserList data={data} isTrialAccount={isTrialAccount} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </PageTransition>
  )
}
