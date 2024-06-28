import { Router } from 'express'

import boardController from '@/controllers/boardController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const boardRouter = Router()

boardRouter
  .all('/*', validateTokenMiddleware)
  .get('/', boardController.getBoards)
  .post('/', boardController.createBoard)
  .get('/:boardURL', boardController.getBoardContent)
  .get('/:boardURL/users')

export default boardRouter
