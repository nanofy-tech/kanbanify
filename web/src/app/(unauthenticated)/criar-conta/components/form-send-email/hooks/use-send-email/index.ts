import { useState } from 'react'
import { IHandlerData } from './types'
import { auth } from '@/services/auth'

export default function useSendEmail() {
  const [data, setData] = useState<number | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handler = async (data: IHandlerData) => {
    setLoading(true)
    setError(null)

    try {
      const status = await auth.sendEmail(data)
      setData(status)
      setLoading(false)
      return status
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
