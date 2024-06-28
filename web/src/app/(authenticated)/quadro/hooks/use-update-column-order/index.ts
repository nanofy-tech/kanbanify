import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useUpdateColumnOrder = () => {
  const mutation = createMutation({
    mutationFn: board.updateColumnOrder,
    mutationKey: ['update-column-order'],
    onError: () => {
      return 'Error'
    },
  })

  return mutation()
}
