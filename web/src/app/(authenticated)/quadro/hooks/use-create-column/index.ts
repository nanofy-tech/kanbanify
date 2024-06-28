import { createMutation } from 'react-query-kit'
import { QueryKey } from '@tanstack/react-query'

import { board } from '@/services/boards'

export const useCreateColumn = ({ queryKey }: { queryKey: QueryKey }) => {
  const mutation = createMutation({
    mutationFn: board.createColumn,
    mutationKey: ['create-column'],
    onMutate: (variables) => {
      console.log(queryKey)
      console.log(variables)
    },
    onError: () => {
      return 'Error'
    },
  })

  return mutation()
}
