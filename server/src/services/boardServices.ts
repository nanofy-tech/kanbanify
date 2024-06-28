import { randomUUID } from 'node:crypto'
import boardRepository, {
  CreateBoardParams,
} from '@/repositories/boardRepository'
import { ObjectId } from 'mongodb'

async function createBoard(body: CreateBoardParams) {
  const mongoId = new ObjectId()
  const boardURL = randomUUID()

  boardRepository.createBoard({ _id: mongoId, ...body, url: boardURL })

  return {
    ...body,
    _id: mongoId,
    url: boardURL,
    content: {
      columnMap: {},
      orderedColumnIds: [],
    },
  }
}

async function getBoardsByUserId(userId: string) {
  return boardRepository.findBoardByUserId(userId)
}

async function getBoardUsers(boardURL: string) {
  return boardRepository.findUsers(boardURL)
}

async function getBoardByURL(boardURL: string) {
  return await boardRepository.findBoardByURL(boardURL)
}

export default { getBoardsByUserId, getBoardByURL, getBoardUsers, createBoard }
