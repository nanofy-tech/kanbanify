import { createQuery } from 'react-query-kit'

import { board } from '@/services/boards'

import { IProps } from './types'

export const useGetColumn = (props: IProps) => {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-columns'],
    fetcher: board.getColumns,
    enabled: !!id,
  })

  const queryResponse = query({ variables: id })

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
