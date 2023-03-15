import privateApi from 'utils/privateApi'
import type { FullTaskInterface } from 'interfaces/tasks/Task'

interface Props {
  page: string | null
  project: string
}

export const getTasks = async ({ page, project }: Props): Promise<FullTaskInterface> => {
  let currentPage: string

  if (page === null) {
    currentPage = '1'
  } else {
    currentPage = page
  }

  const response = await privateApi.get(`/tasks?project=${project}&limit=8&page=${currentPage}`)

  return response.data
}
