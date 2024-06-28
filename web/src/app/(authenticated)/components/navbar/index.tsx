'use client'

import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Bell, Bug, Settings, SquareKanban, User } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/mode-toggle'
import { Dropdown } from '@/components/ui/dropdown'

import Link from './link'

export default function Navbar() {
  const { data } = useSession()

  return (
    <div className="w-full border-b p-4">
      <nav className="flex items-center">
        <h1 className="text-xl font-semibold uppercase">Kanbanfy</h1>

        <ul className="ml-4 flex items-center gap-4">
          <li>
            <Link href="/quadros">
              <SquareKanban className="size-4" /> Seus quadros
            </Link>
          </li>
          <li>
            <Link href="/configuracoes">
              <Settings className="size-4" />
              Configurações
            </Link>
          </li>
          <li>
            <Link href="/reportar-bug">
              <Bug className="size-4" />
              Reportar bug
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          <Button variant="outline" size="icon" className="relative">
            <Bell className="size-5" />

            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-indigo-600"></span>
          </Button>

          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <Button
                size="default"
                variant="ghost"
                className="flex items-center px-0 hover:bg-transparent"
              >
                {data?.user.image && (
                  <Image
                    width={36}
                    height={36}
                    className="rounded border"
                    src="https://avatars.githubusercontent.com/u/78610762?v=4"
                    alt=""
                  />
                )}

                {!data?.user.image && (
                  <span className="flex h-9 w-9 items-center justify-center rounded bg-slate-800 text-white">
                    <User />
                  </span>
                )}

                <FaCaretDown className="ml-1" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>Minha conta</Dropdown.Label>
              <Dropdown.Separator />
              <Dropdown.Item>
                Perfil
                <Dropdown.Shortcut>⇧⌘P</Dropdown.Shortcut>
              </Dropdown.Item>
              <Dropdown.Item>
                Configurações{' '}
                <Dropdown.Shortcut className="ml-4">⇧⌘S</Dropdown.Shortcut>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item disabled>Acessos</Dropdown.Item>
              <Dropdown.Item disabled>Integrações</Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item asChild>
                <button
                  onClick={() =>
                    signOut({
                      redirect: true,
                    })
                  }
                  className="w-full"
                >
                  Sair
                  <Dropdown.Shortcut>⇧⌘Q</Dropdown.Shortcut>
                </button>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </nav>
    </div>
  )
}
