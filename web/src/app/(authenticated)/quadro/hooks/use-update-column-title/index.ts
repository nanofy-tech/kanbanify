import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useUpdateColumnTitle = () => {
  const mutation = createMutation({
    mutationFn: board.updateColumnTitle,
    mutationKey: ['update-column-title'],
    onError: async (error) => {
      return error
    },
  })

  return mutation()
}
