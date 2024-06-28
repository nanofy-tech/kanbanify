import jwt from 'jsonwebtoken'
import { hashSync } from 'bcrypt'
import userRepository from '@/repositories/userRepository'
import { conflictError, unauthorizedError } from '@/errors/httpErrors'

type SignUpType = {
  email: string
  username: string
  password: string
}

const getUser = async (userId: string) => {}

const validateUserExists = async (email: string) => {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw unauthorizedError('Credenciais inválidas')
  }

  return user
}

async function sendEmailCode(email: string) {}

async function validateCode(code: string) {}

async function signUp({ email, password, username }: SignUpType) {
  const isAvailableEmail = await userRepository.findByEmail(email)

  if (isAvailableEmail) {
    throw conflictError('Email or username already in use')
  }

  const hashedPassword = hashSync(password, 10)

  await userRepository.createUser({
    email,
    username,
    password: hashedPassword,
  })
}

type SignInData = {
  email: string
  password: string
}

async function signIn({ email, password }: SignInData) {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw unauthorizedError('Invalid credentials')
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '14 days',
  })

  return { token, user }
}

export default {
  getUser,
  signUp,
  signIn,
  validateCode,
  sendEmailCode,
  validateUserExists,
}
