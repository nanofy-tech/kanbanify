'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Item as DropdownItem } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/shadcn'

export const Item = forwardRef<
  ElementRef<typeof DropdownItem>,
  ComponentPropsWithoutRef<typeof DropdownItem> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
Item.displayName = DropdownItem.displayName
