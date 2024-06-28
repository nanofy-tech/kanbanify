'use client'

import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'

import { cn } from '@/utils/shadcn'

export const Group = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full items-center justify-between', className)}
    {...props}
  />
))
Group.displayName = 'InputOTPGroup'
