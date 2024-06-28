import { createMutation } from 'react-query-kit'

import { board } from '@/services/boards'

export const useCreateBoard = () => {
  const mutation = createMutation({
    mutationFn: board.create,
    mutationKey: ['create-board'],
    onError: () => {
      console.log('Ops! Algo deu errado. Tente novamente!')
    },
  })

  return mutation()
}
