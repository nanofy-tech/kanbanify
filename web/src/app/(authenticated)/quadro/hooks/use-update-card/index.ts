import { createMutation } from 'react-query-kit'

import { card } from '@/services/card'

export const useUpdateCard = () => {
  const mutation = createMutation({
    mutationFn: card.update,
    mutationKey: ['update-card'],
    onError: async (error) => {
      return error
    },
  })

  return mutation()
}
