import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email().min(1, { message: 'Insira seu e-mail' }),
  // password: z.string().min(1, { message: 'Insira sua senha' }),
})

export type SignInData = z.infer<typeof signInSchema>
