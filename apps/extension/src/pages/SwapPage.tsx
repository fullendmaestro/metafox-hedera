import { ArrowUpDown, Repeat, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/pages/Layout'

const SwapPage = () => {
  return (
    <AppLayout>
      <div className='flex flex-col h-full p-4'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>Swap</h1>
          <p className='text-sm text-muted-foreground'>Exchange tokens on the Hedera network</p>
        </div>

        {/* Swap Content */}
        <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <ArrowUpDown className='w-8 h-8 text-white' />
          </div>
          <div className='text-center space-y-2'>
            <h3 className='font-medium text-foreground'>Swap Coming Soon</h3>
            <p className='text-sm text-muted-foreground max-w-sm'>
              Token swapping functionality will be available soon through SaucerSwap integration.
            </p>
          </div>
          <Button variant='outline' className='flex items-center space-x-2'>
            <Repeat className='w-4 h-4' />
            <span>Visit SaucerSwap</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default SwapPage
