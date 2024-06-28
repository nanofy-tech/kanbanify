import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { board } from '@/services/boards'

export const useGetBoards = () => {
  const query = createQuery({
    queryKey: ['get-boards'],
    fetcher: board.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
