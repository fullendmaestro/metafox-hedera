import { Send, Download, Repeat, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ActionButtons = () => {
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-4 gap-6 max-w-xs' data-testid='dashboard-wallet-board'>
        <div className='flex flex-col items-center space-y-2'>
          <Button
            size='sm'
            className='size-[3.5rem] rounded-full bg-secondary/16 hover:bg-primary/16'
            data-testid='wallet-board-send-button'
            aria-label='Send'
          >
            <Send className='h-4 w-4' />
          </Button>
          <span className='text-xs font-medium text-foreground'>Send</span>
        </div>

        <div className='flex flex-col items-center space-y-2'>
          <Button
            size='sm'
            className='size-[3.5rem] rounded-full bg-secondary/16 hover:bg-primary/16'
            data-testid='wallet-board-receive-button'
            aria-label='Receive'
          >
            <Download className='h-4 w-4' />
          </Button>
          <span className='text-xs font-medium text-foreground'>Receive</span>
        </div>

        <div className='flex flex-col items-center space-y-2'>
          <Button
            size='sm'
            className='size-[3.5rem] rounded-full bg-secondary/16 hover:bg-primary/16'
            data-testid='wallet-board-swap-button'
            aria-label='Swap'
          >
            <Repeat className='h-4 w-4' />
          </Button>
          <span className='text-xs font-medium text-foreground'>Swap</span>
        </div>

        <div className='flex flex-col items-center space-y-2'>
          <Button
            size='sm'
            className='size-[3.5rem] rounded-full bg-secondary/16 hover:bg-primary/16'
            data-testid='wallet-board-buy-sell-button'
            aria-label='Buy'
          >
            <ShoppingCart className='h-4 w-4' />
          </Button>
          <span className='text-xs font-medium text-foreground'>Buy</span>
        </div>
      </div>
    </div>
  )
}

export default ActionButtons
