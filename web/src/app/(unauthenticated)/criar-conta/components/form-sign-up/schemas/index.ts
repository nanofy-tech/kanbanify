import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string(),
    username: z.string().min(1, { message: 'Insira o nome de usuário' }),
    password: z.string().min(1, { message: 'Insira sua senha' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type SignUpData = z.infer<typeof signUpSchema>
