import { z } from 'zod'

export const createBoardSchema = z.object({
  name: z.string().min(1, { message: 'Insira nome do quadro' }),
  file: z.any(),
})

export type CreateBoardSchemaData = z.infer<typeof createBoardSchema>
