import taskRepository, {
  CreateTaskParams,
  UpdateTaskImageParams,
  UpdateTaskOrderParams,
  UpdateTaskColumnParams,
  UpsertDescriptionParams,
  DeleteCardData,
} from '@/repositories/taskRepository'
import columnService from './columnService'

async function updateCard(
  data,
  columnId: string,
  boardId: string,
  userId: string,
) {
  await columnService.validateBoardExistsOrFail(boardId)

  await columnService.validateUserHasPermissionOrFail(userId, boardId)

  await taskRepository.update(data, columnId, boardId)
}

async function deleteCard(
  userId: string,
  { itemId, boardId, columnId }: DeleteCardData,
) {
  await columnService.validateBoardExistsOrFail(boardId)

  await columnService.validateUserHasPermissionOrFail(userId, boardId)

  await taskRepository.destroy({ itemId, boardId, columnId })
}

async function createTask(body: CreateTaskParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.createTask({ ...body })

  return { ...body }
}

async function updateTitle(body: CreateTaskParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateTitle(body)
}

async function updateOrder(body: UpdateTaskOrderParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateOrder(body)
}

async function updateTaskColumn(body: UpdateTaskColumnParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateTaskColumn(body)
}

async function upsertImage(body: UpdateTaskImageParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.upsertImage(body)
}

async function upsertDescription(
  body: UpsertDescriptionParams,
  userId: string,
) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.upsertDescription(body)
}

export default {
  updateCard,
  deleteCard,

  createTask,
  updateTitle,
  updateOrder,
  updateTaskColumn,
  upsertImage,
  upsertDescription,
}
