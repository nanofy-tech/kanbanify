'use client'

import {
  useContext,
  ElementRef,
  forwardRef,
  ComponentPropsWithoutRef,
} from 'react'

import { OTPInputContext } from 'input-otp'

import { cn } from '@/utils/shadcn'

export const Slot = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-12 w-12 items-center justify-center rounded-md border text-sm shadow-sm transition-all',
        isActive && 'z-10 ring-1 ring-ring',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
Slot.displayName = 'InputOTPSlot'
