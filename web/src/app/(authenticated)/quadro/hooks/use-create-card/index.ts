import { createMutation } from 'react-query-kit'
import { QueryKey } from '@tanstack/react-query'

import { board } from '@/services/boards'

export const useCreateCard = ({ queryKey }: { queryKey: QueryKey }) => {
  const mutation = createMutation({
    mutationFn: board.createCard,
    mutationKey: ['create-card'],
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
