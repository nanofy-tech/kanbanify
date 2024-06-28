'use client'

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import {
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

export const Item = forwardRef<
  ElementRef<typeof SelectItem>,
  ComponentPropsWithoutRef<typeof SelectItem>
>(({ className, children, ...props }, ref) => (
  <SelectItem
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText>{children}</SelectItemText>
  </SelectItem>
))

Item.displayName = SelectItem.displayName
