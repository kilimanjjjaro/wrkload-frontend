import { Key } from 'react'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { TaskInterface } from 'interfaces/tasks/Task'
import api from 'utils/api'

export default async function deleteTask (_id: Key | undefined): Promise<AxiosResponse<TaskInterface>> {
  const accessToken = getCookie('accessToken')

  const config = {
    headers: { Authorization: `Bearer ${accessToken as string}` }
  }

  const response = await api.delete(`/tasks/${_id as string}`, config)

  return response
}
