import { useState } from 'react'

import { auth } from '@/services/auth'

import { IData } from './types'

export default function useSendEmail() {
  const [data, setData] = useState<number | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handler = async (data: IData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await auth.signUp(data)
      setData(response.data)
      setLoading(false)
      return response
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error('An unknown error occurred'),
      )
      setLoading(false)
      throw error
    }
  }

  return {
    data,
    error,
    loading,
    asyncFn: handler,
  }
}
