'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { Plus, Image as ImageIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import {
  createBoardSchema,
  type CreateBoardSchemaData,
} from '@/schemas/create-board-schema'
import useUploadFile from '@/hooks/use-upload-file'
import useFilePreview from '@/hooks/use-file-preview'

import { useGetBoards } from './hooks/use-get-boards'
import { useCreateBoard } from './hooks/use-create-board'

export default function Content() {
  const queryClient = useQueryClient()
  const { uploadFile } = useUploadFile()

  const { data: boards, queryKey } = useGetBoards()
  const { mutate: handleCreateBoard } = useCreateBoard()

  const { watch, register, handleSubmit } = useForm<CreateBoardSchemaData>({
    resolver: zodResolver(createBoardSchema),
  })

  const { file } = watch()
  const [filePreview] = useFilePreview(file)

  const onSubmit: SubmitHandler<CreateBoardSchemaData> = async (data) => {
    const background = await uploadFile(data.file)

    const { name } = data

    handleCreateBoard(
      { name, background },
      {
        onSuccess: async (data) => {
          queryClient.setQueryData(queryKey, [...(boards ?? []), data])
        },
      },
    )
  }

  return (
    <>
      <main className="p-4">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button size="default" className="flex items-center justify-center">
              <Plus className="mr-1 size-5" /> Novo quadro
            </Button>
          </Popover.Trigger>
          <Popover.Content side="left" align="start">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                variantSize="sm"
                placeholder="Nome do quadro"
                {...register('name')}
              />

              <label
                htmlFor="file"
                className="group flex h-40 cursor-pointer items-center justify-center rounded-md border border-dashed transition-colors hover:bg-slate-800/40"
              >
                {filePreview ? (
                  <Image
                    width={200}
                    height={200}
                    src={filePreview}
                    className="h-full w-full object-cover transition-opacity group-hover:opacity-60"
                    alt=""
                  />
                ) : (
                  <span>
                    <ImageIcon className="text-slate-300" />
                  </span>
                )}
              </label>

              <input id="file" type="file" {...register('file')} hidden />

              <div className="flex justify-end">
                <Button type="submit" size="default">
                  Criar
                </Button>
              </div>
            </form>
          </Popover.Content>
        </Popover.Root>

        <div className="mt-6 grid grid-cols-6 gap-4">
          {boards?.map((board) => (
            <Fragment key={board._id}>
              <Link
                href={`/quadro/${board.url}`}
                className="group group relative flex h-40 overflow-hidden rounded-md"
              >
                <Image
                  width={500}
                  height={500}
                  src={board.background}
                  className="transition-transform group-hover:scale-110"
                  alt=""
                />
                <div className="absolute inset-0 flex items-end bg-black/60 bg-gradient-to-t p-4">
                  <h2 className="font-semibold text-white">{board.name}</h2>
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </main>
    </>
  )
}
