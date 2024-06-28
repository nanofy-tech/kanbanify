'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

import { Button } from './ui/button'
import { Dropdown } from './ui/dropdown'

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        <Dropdown.Item onClick={() => setTheme('light')}>Claro</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('dark')}>Escuro</Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme('system')}>
          Sistema
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
