'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
  CheckboxItem as DropdownCheckboxItem,
  ItemIndicator as DropdownItemIndicator,
} from '@radix-ui/react-dropdown-menu'
import { CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/utils/shadcn'

export const CheckboxItem = forwardRef<
  ElementRef<typeof DropdownCheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownCheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownItemIndicator>
    </span>
    {children}
  </DropdownCheckboxItem>
))
CheckboxItem.displayName = DropdownCheckboxItem.displayName
