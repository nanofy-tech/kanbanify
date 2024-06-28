import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useUpdateCardColumn = () => {
  const mutation = createMutation({
    mutationFn: board.updateCardColumn,
    mutationKey: ['update-card-column'],
    onError: () => {
      return 'Error'
    },
  })

  return mutation()
}
