import { Request, Response } from 'express'
import columnService from '@/services/columnService'

async function createColumn(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    const createdColumn = await columnService.createColumn(
      { ...body, boardURL },
      userId,
    )

    return res.status(201).send(createdColumn)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function updateTitle(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL, columnId } = req.params

    await columnService.updateTitle({ ...body, columnId, boardURL }, userId)

    return res.sendStatus(200)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function updateOrder(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await columnService.updateOrder({ ...body, boardURL }, userId)

    return res.sendStatus(200)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function deleteColumn(req: Request, res: Response) {
  try {
    const { userId } = res.locals
    const { boardURL, columnId } = req.params

    await columnService.deleteColumn(boardURL, columnId, userId)

    return res.sendStatus(204)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

export default {
  createColumn,
  updateTitle,
  updateOrder,
  deleteColumn,
}
