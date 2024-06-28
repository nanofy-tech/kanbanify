import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useUpdateCardOrder = () => {
  const mutation = createMutation({
    mutationFn: board.updateCardOrder,
    mutationKey: ['update-card-order'],
    onError: () => {
      return 'Error'
    },
  })

  return mutation()
}
