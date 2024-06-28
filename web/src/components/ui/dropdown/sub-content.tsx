'use client'

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { SubContent as DropdownSubContent } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/utils/shadcn'

export const SubContent = forwardRef<
  ElementRef<typeof DropdownSubContent>,
  ComponentPropsWithoutRef<typeof DropdownSubContent>
>(({ className, ...props }, ref) => (
  <DropdownSubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
))
SubContent.displayName = DropdownSubContent.displayName
