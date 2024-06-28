import axios from '@/libs/axios'

import type { UpdateCardData } from './types'

export const card = {
  async update({ boardId, columnId, data }: UpdateCardData) {
    const { data: updatedCard } = await axios.put(
      `/tasks/${boardId}/${columnId}`,
      data,
    )

    return updatedCard
  },
}
