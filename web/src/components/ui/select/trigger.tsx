'use client'

import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { SelectTrigger, SelectIcon } from '@radix-ui/react-select'

import { cn } from '@/utils/shadcn'

interface Props extends ComponentPropsWithoutRef<typeof SelectTrigger> {
  disabledIcon?: boolean
}

export const Trigger = forwardRef<ElementRef<typeof SelectTrigger>, Props>(
  ({ className, children, disabledIcon = false, ...props }, ref) => (
    <SelectTrigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}

      {!disabledIcon && (
        <SelectIcon asChild>
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </SelectIcon>
      )}
    </SelectTrigger>
  ),
)

Trigger.displayName = SelectTrigger.displayName
