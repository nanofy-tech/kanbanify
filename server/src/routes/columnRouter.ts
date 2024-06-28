import { Router } from 'express'

import columnController from '@/controllers/columnController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const columnRouter = Router()

columnRouter
  .all('*', validateTokenMiddleware)
  .post('/:boardURL', columnController.createColumn)
  .put('/:boardURL/:columnId', columnController.updateTitle)
  .put('/order/:boardURL', columnController.updateOrder)
  .delete('/:boardURL/:columnId', columnController.deleteColumn)

export default columnRouter
