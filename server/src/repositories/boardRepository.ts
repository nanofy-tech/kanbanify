import { boardCollection } from '@/config/mongo'
import { ObjectId } from 'mongodb'

export type CreateBoardParams = {
  url: string
  name: string
  userId: string
  background: string
}

function createBoard({
  name,
  url,
  userId,
  background,
}: CreateBoardParams & { _id: ObjectId }) {
  boardCollection.insertOne({
    url,
    name,
    userId,
    background,
    content: {
      columnMap: {},
      orderedColumnIds: [],
    },
    members: {
      [userId]: {
        id: userId,
        hasPermission: true,
      },
    },
  })
}

function findBoardByUserId(userId: string) {
  return boardCollection.find({ userId }).toArray()
}

async function findBoardByURL(boardURL: string) {
  return boardCollection.findOne({
    url: boardURL,
  })
}

async function findUsers(boardURL: string) {
  return boardCollection
    .findOne({
      url: boardURL,
    })
    .then((board) => board.members)
}

export default {
  createBoard,
  findBoardByUserId,
  findBoardByURL,
  findUsers,
}
