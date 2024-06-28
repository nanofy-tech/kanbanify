import axios from '@/libs/axios'

import type { UpdateCardData, DeleteCardData } from './types'

export const card = {
  async update({ boardId, columnId, data }: UpdateCardData) {
    const { data: updatedCard } = await axios.put(
      `/tasks/${boardId}/${columnId}`,
      data,
    )

    return updatedCard
  },

  async delete({ boardId, columnId, itemId }: DeleteCardData) {
    const { data: deletedCard } = await axios.delete(
      `/tasks/${boardId}/${columnId}/${itemId}`,
    )

    return deletedCard
  },
}
