import axios from '@/libs/axios'
import {
  type CreateBoardData,
  type GetBoardResponse,
  type GetBoardsResponse,
} from './types'
import { Item } from '@/app/(authenticated)/quadro/[...slug]/data/task'

export const board = {
  async get() {
    const { data: boards } = await axios.get<GetBoardsResponse>('/boards')

    return boards
  },

  async create(data: CreateBoardData) {
    const { data: createdBoard } = await axios.post('/boards', data)

    return createdBoard
  },

  async getColumns(id: string) {
    const { data: columns } = await axios.get<GetBoardResponse>('/boards/' + id)

    return columns
  },

  async createColumn(data: { id: string; title: string }) {
    const { id, ...body } = data

    const { data: createdColumn } = await axios.post('/columns/' + id, body)

    return createdColumn
  },

  async deleteColumn({
    boardId,
    columnId,
  }: {
    boardId: string
    columnId: string
  }) {
    const { data: deletedColumn } = await axios.delete(
      `/columns/${boardId}/${columnId}`,
    )

    return deletedColumn
  },

  async createCard(data: {
    id: string
    title: string
    itemId: string
    columnId: string
    description: string
  }) {
    const { id, ...body } = data

    const { data: createdCard } = await axios.post('/tasks/' + id, body)

    return createdCard
  },

  async updateColumnTitle({
    boardId,
    columnId,
    title,
  }: {
    boardId: string
    columnId: string
    title: string
  }) {
    const { data: updatedColumn } = await axios.put(
      `/columns/${boardId}/${columnId}`,
      { title },
    )

    return updatedColumn
  },

  async updateColumnOrder({
    id,
    orderedColumnIds,
  }: {
    id: string
    orderedColumnIds: string[]
  }) {
    const { data: updatedColumnOrder } = await axios.put(
      '/columns/order/' + id,
      { orderedColumnIds },
    )

    return updatedColumnOrder
  },

  async updateCardOrder({
    id,
    items,
    columnId,
  }: {
    id: string
    columnId: string
    items: Item[]
  }) {
    const { data: updatedCardOrder } = await axios.put('/tasks/order/' + id, {
      items,
      columnId,
    })

    return updatedCardOrder
  },

  async updateCardColumn({
    id,
    sourceId,
    destinationId,
    updatedSourceItems,
    updatedDestinationItems,
  }: {
    id: string
    sourceId: string
    destinationId: string
    updatedSourceItems: Item[]
    updatedDestinationItems: Item[]
  }) {
    const { data: updatedCardColumn } = await axios.put('/tasks/column/' + id, {
      sourceId,
      destinationId,
      updatedSourceItems,
      updatedDestinationItems,
    })

    return updatedCardColumn
  },
}
