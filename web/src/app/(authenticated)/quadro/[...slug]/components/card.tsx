'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import invariant from 'tiny-invariant'
import { MdAdd } from 'react-icons/md'
import { Ellipsis } from 'lucide-react'

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import { scrollJustEnoughIntoView } from '@atlaskit/pragmatic-drag-and-drop/element/scroll-just-enough-into-view'

import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { Item } from '../data/task'
import { useCtx } from '../page'
import { useUpdateCard } from '../../hooks/use-update-card'

type DraggableState = 'idle' | 'generate-preview' | 'dragging'

export const Card = memo(function Card({
  item,
  columnId,
}: {
  item: Item
  columnId: string
}) {
  const { title, description, itemId, priority } = item

  const { boardId, setData } = useCtx()

  const ref = useRef<HTMLDivElement | null>(null)

  const { mutate: handleUpdateCard } = useUpdateCard()

  const { handleSubmit, register, setValue, watch } = useForm<{
    description: string
  }>()

  const [showDialog, setShowDialog] = useState(false)
  const [state, setState] = useState<DraggableState>('idle')
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  const onUpdateDescription: SubmitHandler<{ description: string }> = (
    data,
  ) => {
    const newData = {
      ...item,
      ...data,
    }

    handleUpdateCard(
      {
        boardId,
        columnId,
        data: newData,
      },
      {
        onSuccess: async (_, variables) => {
          setData((prev) => {
            return {
              ...prev,
              columnMap: {
                ...prev.columnMap,
                [columnId]: {
                  ...prev.columnMap[columnId],
                  items: prev.columnMap[columnId].items.map((item) => {
                    if (itemId === variables.data.itemId) {
                      return {
                        ...item,
                        ...variables.data,
                      }
                    }

                    return item
                  }),
                },
              },
            }
          })

          setShowDialog(false)
        },
      },
    )
  }

  useEffect(() => {
    invariant(ref.current)
    return combine(
      draggable({
        element: ref.current,
        getInitialData: () => ({ type: 'card', itemId }),
        onGenerateDragPreview: ({ source }) => {
          scrollJustEnoughIntoView({ element: source.element })
          setState('generate-preview')
        },

        onDragStart: () => setState('dragging'),
        onDrop: () => setState('idle'),
      }),
      dropTargetForElements({
        element: ref.current,
        canDrop: (args) => args.source.data.type === 'card',
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = { type: 'card', itemId }

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          })
        },
        onDragEnter: (args) => {
          if (args.source.data.id !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data))
          }
        },
        onDrag: (args) => {
          if (args.source.data.id !== itemId) {
            setClosestEdge(extractClosestEdge(args.self.data))
          }
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      }),
    )
  }, [itemId])

  useEffect(() => {
    if (!item) return

    setValue('description', description)
  }, [item, setValue, description])

  const isDragging = state === 'dragging'

  const descChanged = watch('description') !== description

  return (
    <>
      {closestEdge === 'top' && (
        <div className={`block h-1 w-full rounded-full bg-indigo-500`} />
      )}

      <div
        onClick={() => setShowDialog(true)}
        className={`cursor-pointer rounded-md border p-2 hover:border-slate-700 ${priority ? 'border-l-4 border-l-red-500 hover:border-l-red-500' : ''} ${isDragging && 'opacity-40'}`}
        ref={ref}
      >
        <div className="mb-2">
          <h1 className="text-sm font-semibold">{title}</h1>
        </div>
        <div className="mb-2">
          <p className="text-xs text-neutral-400">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select.Root>
            <Select.Trigger
              disabledIcon
              className="flex size-8 justify-center p-0"
            >
              <MdAdd className="size-4" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="edit">Editar</Select.Item>
            </Select.Content>
          </Select.Root>

          <Badge variant="outline" className="text-xs font-normal">
            Front-end
          </Badge>
        </div>
      </div>

      <Dialog.Root
        open={showDialog}
        onOpenChange={(value) => setShowDialog(value)}
      >
        <Dialog.Content disabledClose className="max-w-2xl outline-none">
          <Dialog.Header className="flex-row items-center justify-between space-y-0">
            <Dialog.Title>{title}</Dialog.Title>

            <Button size="icon" variant="ghost">
              <Ellipsis />
            </Button>
          </Dialog.Header>

          <div className="relative text-sm text-neutral-400">
            <form onSubmit={handleSubmit(onUpdateDescription)}>
              <Textarea
                rows={4}
                className="resize-none"
                {...register('description')}
              />

              <div className="mt-2 space-x-2 text-end">
                {descChanged && (
                  <>
                    <Button
                      type="button"
                      onClick={() => setValue('description', description)}
                      size="sm"
                      variant="ghost"
                    >
                      Cancelar
                    </Button>

                    <Button type="submit" size="sm">
                      Salvar
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>

          {priority && (
            <div className="absolute -left-2 -top-3">
              <Badge variant="destructive" className="mr-2 text-xs font-normal">
                Cartão prioritário
              </Badge>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>

      {closestEdge === 'bottom' && (
        <div className={`block h-1 w-full rounded-full bg-indigo-500`} />
      )}
    </>
  )
})
