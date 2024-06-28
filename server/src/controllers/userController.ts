import { Request, Response } from 'express'
import userServices from '@/services/userServices'

async function getUser(req: Request, res: Response) {
  try {
    const { userId } = res.locals

    const user = await userServices.getUser(userId)

    res.status(200).json(user)
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

async function validateUserExists(req: Request, res: Response) {
  try {
    const { email } = req.body

    const user = await userServices.validateUserExists(email)

    res.status(200).send(user)
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

async function sendEmailCode(req: Request, res: Response) {
  try {
    const { email } = req.body

    await userServices.sendEmailCode(email)

    res.sendStatus(200)
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

async function validateCode(req: Request, res: Response) {
  try {
    const { code } = req.body

    const data = await userServices.validateCode(code)

    res.status(200).send(data)
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const { body } = req
    console.log(body)

    await userServices.signUp(body)

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error.message)
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const { body } = req

    const { token, user } = await userServices.signIn(body)

    console.log(token, user)

    res.status(200).json({ token, ...user })
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

export default {
  signUp,
  signIn,
  getUser,
  validateCode,
  sendEmailCode,
  validateUserExists,
}
