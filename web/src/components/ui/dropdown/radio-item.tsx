'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
  RadioItem as DropdownRadioItem,
  ItemIndicator as DropdownItemIndicator,
} from '@radix-ui/react-dropdown-menu'
import { DotFilledIcon } from '@radix-ui/react-icons'

import { cn } from '@/utils/shadcn'

export const RadioItem = forwardRef<
  ElementRef<typeof DropdownRadioItem>,
  ComponentPropsWithoutRef<typeof DropdownRadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownRadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownItemIndicator>
    </span>
    {children}
  </DropdownRadioItem>
))
RadioItem.displayName = DropdownRadioItem.displayName
