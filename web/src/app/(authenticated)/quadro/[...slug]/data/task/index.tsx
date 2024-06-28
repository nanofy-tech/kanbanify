export type Item = {
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

export type ColumnType = {
  title: string
  columnId: string
  items: Item[]
}

export type ColumnMap = { [columnId: string]: ColumnType }

export function getInitialData() {
  const columnMap: ColumnMap = {
    confluence: {
      title: 'Backlog',
      columnId: 'confluence',
      items: [],
    },
    jira: {
      title: 'Jira',
      columnId: 'jira',
      items: [],
    },
    trello: {
      title: 'Trello',
      columnId: 'trello',
      items: [],
    },
  }

  const orderedColumnIds = ['confluence', 'jira', 'trello']

  return {
    columnMap,
    orderedColumnIds,
  }
}
