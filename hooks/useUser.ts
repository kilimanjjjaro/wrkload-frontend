import useSWR, { Fetcher } from 'swr'
import { getCookie } from 'cookies-next'
import api from 'utils/api'
import { DataContext } from 'context/DataContext'
import { useContext } from 'react'

export default function useUser (uid: string): any {
  const accessToken = getCookie('accessToken')
  const { isLogged } = useContext(DataContext)

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken as string}`
    }
  }

  const fetcher: Fetcher = async (url: string) => await api.get(url, options).then(res => res.data)

  const { data, isLoading, error, mutate } = useSWR(isLogged !== undefined ? `http://localhost:5000/api/v1/users/${uid}` : null, fetcher)

  return {
    user: data?.result,
    isLoading,
    error,
    mutate
  }
}
