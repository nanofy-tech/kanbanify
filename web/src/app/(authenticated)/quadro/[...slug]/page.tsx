'use client'

import {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { useParams } from 'next/navigation'
import invariant from 'tiny-invariant'
import type { DataTag, QueryKey } from '@tanstack/react-query'

import {
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge'
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'

import Board from './components/board'
import { Column } from './components/column'
import FormNewColumn from './components/form-new-column'
import { ColumnMap, ColumnType, Item } from './data/task'

import { useGetColumn } from '../hooks/use-get-columns'
import { useUpdateCardOrder } from '../hooks/use-update-card-order'
import { useUpdateCardColumn } from '../hooks/use-update-card-column'
import { useUpdateColumnOrder } from '../hooks/use-update-column-order'

const ctx = createContext<{
  boardId: string
  setData: Dispatch<
    SetStateAction<{
      columnMap: ColumnMap
      orderedColumnIds: string[]
    }>
  >
  queryKey: DataTag<QueryKey, string>
} | null>(null)

export const useCtx = () => {
  const context = useContext(ctx)

  if (!context) {
    throw new Error('useCtx must be used within a Provider')
  }

  return context
}

export default function Page() {
  const params = useParams()
  const boardId = params.slug[0]

  const { data: boardData, queryKey } = useGetColumn({
    id: boardId,
  })

  const { mutate: handleUpdateCardOrder } = useUpdateCardOrder()
  const { mutate: handleUpdateCardColumn } = useUpdateCardColumn()
  const { mutate: handleUpdateColumnOrder } = useUpdateColumnOrder()

  const [data, setData] = useState<{
    columnMap: ColumnMap
    orderedColumnIds: string[]
  }>({
    columnMap: {},
    orderedColumnIds: [],
  })

  const ref = useRef<HTMLDivElement | null>(null)

  const [isCustomAutoScrollEnabled, setIsCustomAutoScrollEnabled] =
    useState(false)

  useEffect(() => {
    if (!boardData) return

    setData(boardData?.content)
  }, [boardData])

  useEffect(() => {
    invariant(ref.current)

    if (!data) return

    return combine(
      monitorForElements({
        onDragStart({ location }) {
          // if (isCustomAutoScrollEnabled) {
          //   autoScrollForElements.start({ input: location.current.input })
          // }
        },
        onDrag({ location }) {
          // if (isCustomAutoScrollEnabled) {
          //   autoScroller.updateInput({ input: location.current.input })
          // }
        },
        onDrop(args) {
          // if (isCustomAutoScrollEnabled) {
          //   autoScroller.stop()
          // }

          const { location, source } = args
          // didn't drop on anything
          if (!location.current.dropTargets.length) {
            return
          }
          // need to handle drop

          // 1. remove element from original position
          // 2. move to new position

          if (source.data.type === 'column') {
            const startIndex: number = data.orderedColumnIds.findIndex(
              (columnId) => columnId === source.data.columnId,
            )

            const target = location.current.dropTargets[0]
            const indexOfTarget: number = data.orderedColumnIds.findIndex(
              (id) => id === target.data.columnId,
            )
            const closestEdgeOfTarget: Edge | null = extractClosestEdge(
              target.data,
            )

            const updated = reorderWithEdge({
              list: data.orderedColumnIds,
              startIndex,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'horizontal',
            })

            console.log('reordering column', {
              startIndex,
              destinationIndex: updated.findIndex(
                (columnId) => columnId === target.data.columnId,
              ),
              closestEdgeOfTarget,
            })

            console.log('Coluna atualizada', updated)

            handleUpdateColumnOrder({ id: boardId, orderedColumnIds: updated })
            setData({ ...data, orderedColumnIds: updated })
          }
          // Dragging a card
          if (source.data.type === 'card') {
            const itemId = source.data.itemId
            invariant(typeof itemId === 'string')
            // TODO: these lines not needed if item has columnId on it
            const [, startColumnRecord] = location.initial.dropTargets
            const sourceId = startColumnRecord.data.columnId
            invariant(typeof sourceId === 'string')
            const sourceColumn = data.columnMap[sourceId]
            const itemIndex = sourceColumn.items.findIndex(
              (item) => item.itemId === itemId,
            )
            const item: Item = sourceColumn.items[itemIndex]

            if (location.current.dropTargets.length === 1) {
              const [destinationColumnRecord] = location.current.dropTargets
              const destinationId = destinationColumnRecord.data.columnId
              invariant(typeof destinationId === 'string')
              const destinationColumn = data.columnMap[destinationId]
              invariant(destinationColumn)

              // reordering in same column
              if (sourceColumn === destinationColumn) {
                const updated = reorderWithEdge({
                  list: sourceColumn.items,
                  startIndex: itemIndex,
                  indexOfTarget: sourceColumn.items.length - 1,
                  closestEdgeOfTarget: null,
                  axis: 'vertical',
                })
                const updatedMap = {
                  ...data.columnMap,
                  [sourceColumn.columnId]: {
                    ...sourceColumn,
                    items: updated,
                  },
                }

                console.log({ columnMap: updatedMap })

                setData({ ...data, columnMap: updatedMap })
                console.log('moving card to end position in same column', {
                  startIndex: itemIndex,
                  destinationIndex: updated.findIndex(
                    (i) => i.itemId === itemId,
                  ),
                  edge: null,
                })
                return
              }

              // moving to a new column
              const updatedMap = {
                ...data.columnMap,
                [sourceColumn.columnId]: {
                  ...sourceColumn,
                  items: sourceColumn.items.filter((i) => i.itemId !== itemId),
                },
                [destinationColumn.columnId]: {
                  ...destinationColumn,
                  items: [...destinationColumn.items, item],
                },
              }

              handleUpdateCardColumn({
                id: boardId,
                updatedSourceItems: sourceColumn.items.filter(
                  (i) => i.itemId !== itemId,
                ),
                updatedDestinationItems: [...destinationColumn.items, item],
                sourceId: sourceColumn.columnId,
                destinationId: destinationColumn.columnId,
              })

              setData({ ...data, columnMap: updatedMap })
              console.log('moving card to end position of another column', {
                startIndex: itemIndex,
                destinationIndex: updatedMap[
                  destinationColumn.columnId
                ].items.findIndex((i) => i.itemId === itemId),
                edge: null,
              })
              return
            }

            // dropping in a column (relative to a card)
            if (location.current.dropTargets.length === 2) {
              const [destinationCardRecord, destinationColumnRecord] =
                location.current.dropTargets
              const destinationColumnId = destinationColumnRecord.data.columnId
              invariant(typeof destinationColumnId === 'string')
              const destinationColumn = data.columnMap[destinationColumnId]

              const indexOfTarget = destinationColumn.items.findIndex(
                (item) => item.itemId === destinationCardRecord.data.itemId,
              )
              const closestEdgeOfTarget: Edge | null = extractClosestEdge(
                destinationCardRecord.data,
              )

              // case 1: ordering in the same column
              if (sourceColumn === destinationColumn) {
                const updated = reorderWithEdge({
                  list: sourceColumn.items,
                  startIndex: itemIndex,
                  indexOfTarget,
                  closestEdgeOfTarget,
                  axis: 'vertical',
                })
                const updatedSourceColumn: ColumnType = {
                  ...sourceColumn,
                  items: updated,
                }
                const updatedMap: ColumnMap = {
                  ...data.columnMap,
                  [sourceColumn.columnId]: updatedSourceColumn,
                }
                console.log('dropping relative to card in the same column', {
                  startIndex: itemIndex,
                  destinationIndex: updated.findIndex(
                    (i) => i.itemId === itemId,
                  ),
                  closestEdgeOfTarget,
                })

                console.log()

                handleUpdateCardOrder({
                  id: boardId,
                  items: updatedSourceColumn.items,
                  columnId: sourceColumn.columnId,
                })
                setData({ ...data, columnMap: updatedMap })
                return
              }

              // case 2: moving into a new column relative to a card

              const updatedSourceColumn: ColumnType = {
                ...sourceColumn,
                items: sourceColumn.items.filter((i) => i !== item),
              }
              const updated: Item[] = Array.from(destinationColumn.items)
              const destinationIndex =
                closestEdgeOfTarget === 'bottom'
                  ? indexOfTarget + 1
                  : indexOfTarget
              updated.splice(destinationIndex, 0, item)

              const updatedDestinationColumn: ColumnType = {
                ...destinationColumn,
                items: updated,
              }

              // TODO: Atualização das tabelas no Mongo ---------------------------------------------------------------------
              /* 
                Usar updatedSourceColumn e updatedDestinationColumn para atualizar os dados no backend

                OBS: Usar requisição otimista para atualizar a UI antes de receber a resposta do backend
              */

              const updatedMap: ColumnMap = {
                ...data.columnMap,
                [sourceColumn.columnId]: updatedSourceColumn,
                [destinationColumn.columnId]: updatedDestinationColumn,
              }

              console.log(updatedMap)

              console.log('dropping on a card in different column', {
                sourceColumn: sourceColumn.columnId,
                destinationColumn: destinationColumn.columnId,
                startIndex: itemIndex,
                destinationIndex,
                closestEdgeOfTarget,
              })

              handleUpdateCardColumn({
                id: boardId,
                updatedSourceItems: updatedSourceColumn.items,
                updatedDestinationItems: updatedDestinationColumn.items,
                sourceId: sourceColumn.columnId,
                destinationId: destinationColumn.columnId,
              })

              setData({ ...data, columnMap: updatedMap })
            }
          }
        },
      }),
    )
  }, [data, isCustomAutoScrollEnabled])

  const ctxValues = {
    setData,
    boardId,
    queryKey,
  }

  return (
    <ctx.Provider value={ctxValues}>
      <Board ref={ref}>
        {!data && <div>Carregando...</div>}

        {data &&
          data.orderedColumnIds.map((columnId) => {
            return <Column column={data.columnMap[columnId]} key={columnId} />
          })}

        <FormNewColumn />
      </Board>
    </ctx.Provider>
  )
}
