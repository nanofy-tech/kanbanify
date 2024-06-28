import { boardCollection } from '@/config/mongo'

export type Item = {
  title: string
  itemId: string
  description: string
  user?: {
    id: string
    name: string
    photo: string
  }
}

export type CreateTaskParams = {
  title: string
  itemId: string
  columnId: string
  boardURL: string
  description: string
}

export type UpdateTaskOrderParams = {
  items: any[]
  columnId: string
  boardURL: string
}

export type UpsertDescriptionParams = {
  taskId: string
  boardURL: string
  description: string
}

export type UpdateTaskColumnParams = {
  sourceId: string
  destinationId: string
  updatedSourceItems: Item[]
  updatedDestinationItems: Item[]
  boardURL: string
}

export type UpdateTaskImageParams = {
  taskId: string
  boardURL: string
  coverURL: string
}

function createTask({ columnId, boardURL, ...taskData }: CreateTaskParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $push: {
        [`content.columnMap.${columnId}.items`]: {
          ...taskData,
        },
      },
    },
  )
}

function update(data, columnId: string, boardId: string) {
  return boardCollection.updateOne(
    {
      url: boardId,
      [`content.columnMap.${columnId}.items.itemId`]: data.itemId,
    },
    {
      $set: {
        [`content.columnMap.${columnId}.items.$`]: data,
      },
    },
  )
}

function updateTitle({ title, itemId, boardURL }: CreateTaskParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${itemId}.title`]: title,
      },
    },
  )
}

function updateOrder({ columnId, items, boardURL }: UpdateTaskOrderParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columnMap.${columnId}.items`]: items,
      },
    },
  )
}

function updateTaskColumn({
  sourceId,
  destinationId,
  updatedSourceItems,
  updatedDestinationItems,
  boardURL,
}: UpdateTaskColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columnMap.${sourceId}.items`]: updatedSourceItems,
        [`content.columnMap.${destinationId}.items`]: updatedDestinationItems,
      },
    },
  )
}

function upsertImage({ coverURL, taskId, boardURL }: UpdateTaskImageParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}.coverURL`]: coverURL,
      },
    },
    { upsert: true },
  )
}

function upsertDescription({
  description,
  taskId,
  boardURL,
}: UpsertDescriptionParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}.description`]: description,
      },
    },
    { upsert: true },
  )
}

export default {
  update,

  createTask,
  updateTitle,
  updateOrder,
  updateTaskColumn,
  upsertImage,
  upsertDescription,
}
