'use client'

import invariant from 'tiny-invariant'
import { memo, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TbDragDrop2 } from 'react-icons/tb'
import { Ellipsis, SquarePlus, Trash } from 'lucide-react'
import { toast } from 'sonner'

import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'

import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'

import { Card } from './card'
import FormNewCard from './form-new-card'

import { useCtx } from '../page'
import { ColumnType } from '../data/task'
import { useDeleteColumn } from '../../hooks/use-delete-column'
import { useUpdateColumnTitle } from '../../hooks/use-update-column-title'

export const Column = memo(function Column({ column }: { column: ColumnType }) {
  const columnId = column.columnId

  const { boardId, setData } = useCtx()

  const columnRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const cardListRef = useRef<HTMLDivElement | null>(null)

  const [showDialog, setShowDialog] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const [closestEdge, setClosestEdge] = useState<Edge | null>(null)

  const { mutate: handleDeleteColumn } = useDeleteColumn()
  const { mutate: handleUpdateColumn } = useUpdateColumnTitle()

  const { handleSubmit, register } = useForm({
    defaultValues: { title: column.title, oldTitle: column.title },
  })

  const onDeleteColumn = () => {
    handleDeleteColumn(
      { boardId, columnId },
      {
        onSuccess: async (data, variables) => {
          console.log(variables)
          setData((prev) => {
            delete prev.columnMap[variables.columnId]

            const newOrderedColumns = prev.orderedColumnIds.filter(
              (columnId) => columnId !== variables.columnId,
            )

            return {
              ...prev,
              orderedColumnIds: newOrderedColumns,
            }
          })
        },
      },
    )
  }

  const onChangeTitle: SubmitHandler<{ title: string }> = (data) => {
    if (data.title === column.title) {
      return
    }

    handleUpdateColumn(
      {
        boardId,
        columnId,
        title: data.title,
      },
      {
        onSuccess: (data, variables) => {
          setData((prev) => {
            prev.columnMap[variables.columnId].title = variables.title
            return prev
          })

          toast('Sucesso!', {
            description: 'O nome da coluna foi alterado com sucesso!',
            action: {
              label: 'Fechar',
              onClick: () => {},
            },
          })
        },
      },
    )
  }

  useEffect(() => {
    invariant(columnRef.current)
    invariant(headerRef.current)
    invariant(cardListRef.current)

    return combine(
      draggable({
        element: columnRef.current,
        dragHandle: headerRef.current,
        getInitialData: () => ({ columnId, type: 'column' }),
      }),
      dropTargetForElements({
        element: cardListRef.current,
        getData: () => ({ columnId }),
        canDrop: (args) => args.source.data.type === 'card',
        getIsSticky: () => true,
        onDragEnter: () => setIsDraggingOver(true),
        onDragLeave: () => setIsDraggingOver(false),
        onDragStart: () => setIsDraggingOver(true),
        onDrop: () => setIsDraggingOver(false),
      }),
      dropTargetForElements({
        element: columnRef.current,
        canDrop: (args) => args.source.data.type === 'column',
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            columnId,
          }
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ['left', 'right'],
          })
        },
        onDragEnter: (args) => {
          console.log(args)
          setClosestEdge(extractClosestEdge(args.self.data))
        },
        onDrag: (args) => {
          setClosestEdge(extractClosestEdge(args.self.data))
        },
        onDragLeave: () => {
          setClosestEdge(null)
        },
        onDrop: () => {
          setClosestEdge(null)
        },
      }),
    )
  }, [columnId])

  const hasItems = !!column.items.length

  return (
    <>
      {closestEdge === 'left' && (
        <div className="block h-full w-1 rounded-full bg-indigo-500" />
      )}

      <div className="flex h-full flex-col items-start">
        <div
          className={`flex w-72 flex-col overflow-y-auto rounded-md border transition-all ${isDraggingOver && 'border-muted-foreground'}`}
          ref={columnRef}
        >
          <div
            className="flex items-center justify-between border-b p-4"
            ref={headerRef}
          >
            <form onSubmit={handleSubmit(onChangeTitle)}>
              <input
                type="text"
                className="rounded-md border border-transparent bg-transparent p-1 outline-none focus:border-primary"
                {...register('title')}
                onBlur={handleSubmit(onChangeTitle)}
              />
              <input type="submit" hidden />
            </form>

            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Ellipsis />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content className="w-72" side="right">
                <Dropdown.Label className="text-center">
                  Opções da coluna
                </Dropdown.Label>
                <Dropdown.Separator />
                <Dropdown.Group>
                  <Dropdown.Item onClick={() => setShowDialog(true)}>
                    <SquarePlus className="mr-1 size-4" /> Adicionar Tarefa
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item onClick={() => setShowDeleteDialog(true)}>
                    <Trash className="mr-1 size-4" /> Excluir coluna
                  </Dropdown.Item>
                </Dropdown.Group>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>

          <div
            className="flex-grow space-y-2 overflow-auto p-2"
            ref={cardListRef}
          >
            {column.items.map((item) => (
              <Card item={item} columnId={columnId} key={item.itemId} />
            ))}

            {column.items.length === 0 && (
              <div className="flex flex-col items-center rounded-md border border-dashed p-2 text-neutral-400">
                <TbDragDrop2 className="size-6" />
                <span className="text-xs">Drope os cartões aqui</span>
              </div>
            )}

            <div className="mt-2 text-center">
              <button
                className="text-xs hover:text-primary hover:underline"
                onClick={() => setShowDialog(true)}
              >
                Adicionar novo cartão
              </button>
            </div>
          </div>
        </div>
      </div>

      {closestEdge === 'right' && (
        <div className="block h-full w-1 rounded-full bg-indigo-500" />
      )}

      <Dialog.Root
        open={showDialog}
        onOpenChange={(value) => setShowDialog(value)}
      >
        <Dialog.Content className="max-w-md">
          <Dialog.Header>
            <Dialog.Title className="text-base font-normal">
              Adicionar novo cartão na coluna{' '}
              <span className="rounded-md border bg-muted px-1 text-sm">
                {column.title}
              </span>
            </Dialog.Title>
          </Dialog.Header>

          <FormNewCard onClose={setShowDialog} columnId={columnId} />
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root
        open={showDeleteDialog}
        onOpenChange={(value) => setShowDeleteDialog(value)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title className="text-base font-normal">
              Excluir coluna{' '}
              <span className="rounded-md border bg-muted px-1 text-sm">
                {column.title}
              </span>
            </Dialog.Title>
            <Dialog.Description className="py-6">
              {hasItems && (
                <>
                  A coluna{' '}
                  <span className="rounded-md border bg-muted px-1 text-sm">
                    {column.title}
                  </span>{' '}
                  possui {column.items.length}{' '}
                  {column.items.length === 1 ? 'tarefa' : 'tarefas'}! Você
                  precisa excluir ou mover todas as tarefas antes de excluir a
                  coluna.
                </>
              )}

              {!hasItems && (
                <>
                  Tem certeza que deseja excluir a coluna{' '}
                  <span className="rounded-md border bg-muted px-1 text-sm">
                    {column.title}
                  </span>{' '}
                  ? Essa ação não pode ser desfeita.
                </>
              )}
            </Dialog.Description>

            <Dialog.Footer>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancelar
              </Button>

              <Button
                autoFocus={false}
                variant="destructive"
                disabled={hasItems}
                onClick={() => onDeleteColumn()}
              >
                <Trash className="mr-1 size-4" /> Excluir
              </Button>
            </Dialog.Footer>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
})
