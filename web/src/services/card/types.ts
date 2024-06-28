type Card = {
  title: string
  itemId: string
  description: string
  priority: boolean
  user?: {
    id: string
    name: string
    photo: string
  }
}

export type UpdateCardData = {
  boardId: string
  columnId: string
  data: Partial<Card>
}

export type DeleteCardData = {
  itemId: string
  boardId: string
  columnId: string
}
