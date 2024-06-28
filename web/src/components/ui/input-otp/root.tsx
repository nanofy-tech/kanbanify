'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { OTPInput } from 'input-otp'

import { cn } from '@/utils/shadcn'

export const Root = forwardRef<
  ElementRef<typeof OTPInput>,
  ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
))
Root.displayName = 'InputOTP'
