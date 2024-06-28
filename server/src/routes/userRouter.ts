import { Router } from 'express'
import userController from '@/controllers/userController'
import { signInSchema, signUpSchema } from '@/schema/userSchema'
import validateSchemaMiddleware from '@/middlewares/validateSchemaMiddleware'

const userRouter = Router()

userRouter
  .post(
    '/sign-up',
    validateSchemaMiddleware(signUpSchema),
    userController.signUp,
  )
  .post(
    '/sign-in',
    validateSchemaMiddleware(signInSchema),
    userController.signIn,
  )
  .get('/generate-access-token')
  .post('/validate-user-exists', userController.validateUserExists)
  .post('/send-email-code', userController.sendEmailCode)
  .post('/validate-code', userController.validateCode)

export default userRouter
