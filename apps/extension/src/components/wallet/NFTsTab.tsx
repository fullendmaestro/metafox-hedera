import { TrendingUp, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NFTsTab = () => {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-4'>
      <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center'>
        <TrendingUp className='w-8 h-8 text-muted-foreground' />
      </div>
      <div className='text-center space-y-2'>
        <h3 className='font-medium text-foreground'>No NFTs Found</h3>
        <p className='text-sm text-muted-foreground max-w-sm'>
          Your NFTs will appear here once you receive or purchase them on the Hedera network.
        </p>
      </div>
      <Button variant='outline' onClick={() => {}}>
        <Plus className='w-4 h-4 mr-2' />
        Browse NFT Marketplace
      </Button>
    </div>
  )
}

export default NFTsTab
