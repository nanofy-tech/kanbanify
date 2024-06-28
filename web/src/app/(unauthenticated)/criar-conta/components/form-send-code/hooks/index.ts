import { useState } from 'react'

import { auth } from '@/services/auth'

import { IData } from './types'

export default function useSendCode() {
  const [data, setData] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handler = async (data: IData) => {
    setLoading(true)
    setError(null)

    try {
      const responseData = await auth.validateCode(data)
      setData(responseData.email)
      setLoading(false)
      return responseData
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
