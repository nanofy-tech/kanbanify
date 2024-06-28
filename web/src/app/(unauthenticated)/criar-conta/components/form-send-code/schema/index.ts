import { z } from 'zod'

export const sendCodeSchema = z.object({
  code: z.string().min(6, { message: 'Insira o código de validação' }),
})

export type SendCodeData = z.infer<typeof sendCodeSchema>
