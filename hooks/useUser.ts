import { useState, useCallback, useContext } from 'react'
import { setCookie } from 'cookies-next'
import { UsersContext } from 'context/UsersProvider'
import api from 'utils/api'

export default function useUser (): void {
  const { setIsLogged } = useContext(UsersContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const login = useCallback(async (data) => {
    setLoading(true)

    try {
      const response = await api.post('/auth/login', data)
      const { accessToken, expiresIn } = response.data
      setCookie('accessToken', accessToken, { maxAge: expiresIn })
      setIsLogged(true)
      setLoading(false)
      return response.data
    } catch (error) {
      setError(true)
      setLoading(false)
      console.error(error)
    }
  }, [])

  return {
    login,
    loading,
    error
  }
}
