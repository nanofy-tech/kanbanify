import { createMutation } from 'react-query-kit'

import { card } from '@/services/card'

export const useDeleteCard = () => {
  const mutation = createMutation({
    mutationFn: card.delete,
    mutationKey: ['delete-card'],
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation()
}
