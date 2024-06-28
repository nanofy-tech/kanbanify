'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Content as DialogContent } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { cn } from '@/utils/shadcn'

import { Close } from './close'
import { Portal } from './portal'
import { Overlay } from './overlay'

interface Props extends ComponentPropsWithoutRef<typeof DialogContent> {
  disabledClose?: boolean
}

export const Content = forwardRef<ElementRef<typeof DialogContent>, Props>(
  ({ className, children, disabledClose = false, ...props }, ref) => (
    <Portal>
      <Overlay />
      <DialogContent
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          className,
        )}
        {...props}
      >
        {children}

        {!disabledClose && (
          <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Close>
        )}
      </DialogContent>
    </Portal>
  ),
)

Content.displayName = DialogContent.displayName
