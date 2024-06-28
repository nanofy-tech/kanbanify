import { z } from 'zod'

export const sendEmailSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'E-mail é obrigatório' }),
})

export type SendEmailData = z.infer<typeof sendEmailSchema>
