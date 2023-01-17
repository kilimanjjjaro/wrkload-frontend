'use client'

import MasonryGrid from 'app/components/shared/MasonryGrid'
import { getCookie } from 'cookies-next'
import useSWR, { Fetcher } from 'swr'
import api from 'utils/api'
import Card from 'app/components/shared/Card'
import UpdateTask from 'app/(dashboard)/tasks/components/UpdateTask'
import DeleteTask from 'app/(dashboard)/tasks/components/DeleteTask'
import Skeleton from 'app/components/shared/Skeleton'
import { TaskInterface } from 'interfaces/tasks/Task'

const SKELETON = Array.from(Array(8).keys())

interface FetcherInterface {
  results: TaskInterface[]
}

export default function Tasks (): JSX.Element {
  const accessToken = getCookie('accessToken')

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const fetcher: Fetcher<FetcherInterface> = async (url: string) => await api.get(url, options).then(res => res.data)

  const { data, isLoading } = useSWR('https://wrkload-api-production.up.railway.app/api/v1/tasks?limit=8', fetcher)

  const tasks = data?.results

  return (
    <>
      <MasonryGrid>
        {isLoading && SKELETON.map((_, index) => (
          <Skeleton type='task' key={index} />
        ))}
        {tasks?.map((task: TaskInterface) => (
          <Card key={task._id} data={task} updateData={UpdateTask} deleteData={DeleteTask} />
        ))}
      </MasonryGrid>
    </>
  )
}
