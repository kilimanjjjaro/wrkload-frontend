import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Button from 'components/shared/Button'

import type { PaginationInterface } from 'interfaces/components'

export default function Pagination ({ data }: { data: PaginationInterface }): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const query = params.get('query')
  const totalPages = Math.ceil(data.totalResults / data.resultsPerPage)

  const handlePrevPage = (): void => {
    if (pathname === '/tasks/search') {
      const project = params.get('project')
      router.push(`/tasks/search?project=${project as string}&query=${query as string}&page=${data.prevPage}`)
      return
    }

    if (query !== null && pathname !== '/tasks/search') return router.push(`${pathname}?query=${query}&page=${data.prevPage}`)

    router.push(`${pathname}?page=${data.prevPage}`)
  }

  const handleNextPage = (): void => {
    if (pathname === '/tasks/search') {
      const project = params.get('project')
      router.push(`/tasks/search?project=${project as string}&query=${query as string}&page=${data.nextPage}`)
      return
    }

    if (query !== null && pathname !== '/tasks/search') return router.push(`${pathname}?query=${query}&page=${data.nextPage}`)

    router.push(`${pathname}?page=${data.nextPage}`)
  }

  const disablePrevPageButton = data.prevPage === null
  const disableNextPageButton = data.nextPage === null

  return (
    <div className='flex justify-center mt-10 gap-x-5'>
      <Button variant='primary' disablePagination={disablePrevPageButton} onClick={handlePrevPage} autoWidth><ArrowLeftIcon className='w-4 stroke-3' /></Button>
      <div className='self-center text-sm text-black transition-colors ease-in-out dark:text-white duration-400 font-secondaryFont'>Page {data.page} of {totalPages}</div>
      <Button variant='primary' disablePagination={disableNextPageButton} onClick={handleNextPage} autoWidth><ArrowRightIcon className='w-4 stroke-3' /></Button>
    </div>
  )
}
