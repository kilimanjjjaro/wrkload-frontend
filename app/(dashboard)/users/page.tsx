'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import Header from 'components/users/Header'
import Skeleton from 'components/users/Skeleton'
import UserList from 'components/users/UserList'
import NotFound from 'components/users/NotFound'
import Modals from 'components/users/Modals'
import { getUsers } from 'services/users/getUsers'
import { sortUsers } from 'utils/sortData'
import { PAGE_VARIANTS } from 'constants/framerMotion'

export const metadata = {
  title: 'Users'
}

export default function Users (): JSX.Element {
  const params = useSearchParams()
  const page = params.get('page')

  const { data, isLoading, isValidating, mutate } = useSWR('users', async () => await getUsers({ page }), { onSuccess: data => sortUsers(data.users), revalidateIfStale: false })

  useEffect(() => {
    mutate().catch((error) => console.error(error))
  }, [page])

  const shouldRenderSkeleton = isLoading || isValidating
  const shouldRenderUsers = data !== undefined && data?.users.length >= 1 && !shouldRenderSkeleton
  const shouldRenderNotFoundSign = !shouldRenderUsers && !shouldRenderSkeleton

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={PAGE_VARIANTS}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Header shouldRenderOptions={shouldRenderNotFoundSign} />
      <main>
        {shouldRenderSkeleton && <Skeleton />}
        {shouldRenderUsers && <UserList data={data} />}
        {shouldRenderNotFoundSign && <NotFound />}
      </main>
      <Modals />
    </motion.div>
  )
}
