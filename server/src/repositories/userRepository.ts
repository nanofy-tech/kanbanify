import { prisma } from '@/config/database'

type UserDataType = {
  email: string
  password: string
  username: string
}

function findById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

function createUser(userData: UserDataType) {
  return prisma.user.create({
    data: userData,
  })
}

export default {
  findById,
  findByEmail,
  createUser,
}
