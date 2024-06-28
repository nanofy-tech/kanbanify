import { boardCollection } from '@/config/mongo'

export type CreateColumnParams = {
  title: string
  columnId: string
  boardURL: string
}

export type UpdateColumnOrderParams = {
  boardURL: string
  orderedColumnIds: string[]
}

function createColumn({ title, columnId, boardURL }: CreateColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columnMap.${columnId}`]: {
          title,
          columnId,
          items: [],
        },
      },
      $push: {
        [`content.orderedColumnIds`]: columnId,
      },
    },
  )
}

function updateTitle({ title, columnId, boardURL }: CreateColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columnMap.${columnId}.title`]: title,
      },
    },
  )
}

function updateOrder({ orderedColumnIds, boardURL }: UpdateColumnOrderParams) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        [`content.orderedColumnIds`]: orderedColumnIds,
      },
    },
  )
}

function destroy({
  boardURL,
  columnId,
}: {
  boardURL: string
  columnId: string
}) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $unset: {
        [`content.columnMap.${columnId}`]: {},
      },
      $pull: {
        [`content.orderedColumnIds`]: columnId,
      },
    },
  )
}

export default { createColumn, updateTitle, updateOrder, destroy }
