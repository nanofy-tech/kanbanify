import { Item } from '@/app/(authenticated)/quadro/[...slug]/data/task'
import { CreateBoardSchemaData } from '@/schemas/create-board-schema'

export type Board = {
  _id: string
  userId: 1
  name: string
  url: string
  background: string
  content: {
    columnMap: {
      [key: string]: {
        title: string
        columnId: string
        items: Item[]
      }
    }
    orderedColumnIds: string[]
  }
}

export type GetBoardResponse = Board
export type GetBoardsResponse = Board[]

export interface CreateBoardData extends CreateBoardSchemaData {
  background: string
}
