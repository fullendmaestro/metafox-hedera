import React from 'react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

type BottomModalProps = React.PropsWithChildren<{
  isOpen: boolean
  title?: string | React.ReactNode
  onClose?: () => void
  disableClose?: boolean
  className?: string
  containerClassName?: string
  contentClassName?: string
  headerClassName?: string
  onActionButtonClick?: () => void
  hideActionButton?: boolean
  actionButton?: React.ReactNode
  secondaryActionButton?: React.ReactNode
  footerComponent?: React.ReactNode
  fullScreen?: boolean
}>

const BottomModal: React.FC<BottomModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  className,
  actionButton,
  onActionButtonClick,
  containerClassName,
  headerClassName,
  contentClassName,
  hideActionButton,
  secondaryActionButton,
  footerComponent,
  fullScreen,
}) => {
  const container = document.getElementById('drawer-boundry')?.parentNode as HTMLElement

  const handleCloseAction = () => {
    onClose?.()
  }

  if (!container) {
    return null
  }

  return (
    <Drawer
      container={container}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onActionButtonClick?.()
          handleCloseAction()
        }
      }}
    >
      <DrawerContent
        className={cn(
          'gradient-cosmic max-h-[600px]',
          fullScreen && 'h-screen rounded-none',
          containerClassName,
          contentClassName,
        )}
      >
        <DrawerHeader
          className={cn(
            'flex items-center justify-between border-b border-border-bottom/50',
            !title && !secondaryActionButton && 'border-none',
            headerClassName,
          )}
        >
          <div className='flex items-center justify-center size-12'>
            {secondaryActionButton ? secondaryActionButton : null}
          </div>

          <h3 className='text-mdl font-bold'>{title}</h3>

          {hideActionButton ? (
            <div className='flex items-center size-12' />
          ) : (
            <DrawerClose asChild>
              {actionButton ?? (
                <Button variant={'ghost'} size={'icon'} className='size-12'>
                  <X size={20} />
                </Button>
              )}
            </DrawerClose>
          )}
        </DrawerHeader>

        <div
          className={cn(
            'p-4 overflow-auto',
            fullScreen ? 'max-h-full' : 'max-h-[calc(100%-112px)]',
            className,
          )}
        >
          {children}
        </div>
        {footerComponent ? (
          <div className='flex gap-x-2 p-4 border-t border-border-bottom/50 mt-auto'>
            {footerComponent}
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

export default BottomModal
