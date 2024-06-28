import { Router } from 'express'

import userRouter from './userRouter'
import boardRouter from './boardRouter'
import uploadRouter from './uploadRouter'
import columnRouter from './columnRouter'
import taskRouter from './taskRouter'
import feedbackRouter from './feedbackRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/upload', uploadRouter)
router.use('/columns', columnRouter)
router.use('/tasks', taskRouter)
router.use('/feedback', feedbackRouter)

router.use('/test', (req, res) => {
  res.status(201).json({ test: 'Hello World!' })
})

export default router
