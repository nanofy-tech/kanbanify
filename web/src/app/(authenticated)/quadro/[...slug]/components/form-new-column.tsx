'use client'

import { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TbTablePlus } from 'react-icons/tb'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

import { useCtx } from '../page'
import { useCreateColumn } from '../../hooks/use-create-column'

export default function FormNewColumn() {
  const [showForm, setShowForm] = useState(false)

  const { setData, queryKey, boardId } = useCtx()
  const { mutate: handleCreateColumn } = useCreateColumn({ queryKey })

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ title: string }>()

  const onSubmit: SubmitHandler<{ title: string }> = (data) => {
    handleCreateColumn(
      { id: boardId, title: data.title },
      {
        onSuccess: (data) => {
          reset()
          setShowForm(false)
          console.log(data)

          setData((prev) => {
            return {
              columnMap: {
                ...prev?.columnMap,
                [data.id]: {
                  columnId: data.id,
                  title: data.title,
                  items: [],
                },
              },
              orderedColumnIds: [...(prev?.orderedColumnIds ?? []), data.id],
            }
          })
        },
      },
    )
  }

  return (
    <>
      <Popover.Root
        open={showForm}
        onOpenChange={(value) => setShowForm(value)}
      >
        <Popover.Trigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="flex h-14 w-72 flex-col border-dashed"
          >
            <div>
              <TbTablePlus className="size-5" />
            </div>
            Adicionar nova coluna
          </Button>
        </Popover.Trigger>
        <Popover.Content className="max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4 text-end"
          >
            <Input
              {...register('title')}
              placeholder="Nova coluna"
              className="h-9 px-2 py-1"
              disabled={isSubmitting}
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Oval
                    width={20}
                    height={20}
                    strokeWidth={4}
                    color="#ffffff"
                    secondaryColor="#ffffff"
                  />
                )}

                <span className="ml-1">Adicionar</span>
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Root>
    </>
  )
}
