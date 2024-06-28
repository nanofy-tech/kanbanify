'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Separator as DropdownSeparator } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/shadcn'

export const Separator = forwardRef<
  ElementRef<typeof DropdownSeparator>,
  ComponentPropsWithoutRef<typeof DropdownSeparator>
>(({ className, ...props }, ref) => (
  <DropdownSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
Separator.displayName = DropdownSeparator.displayName
