import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useDeleteColumn = () => {
  const mutation = createMutation({
    mutationFn: board.deleteColumn,
    mutationKey: ['delete-column'],

    onError: (error) => {
      console.log(error)
    },
  })

  return mutation()
}
