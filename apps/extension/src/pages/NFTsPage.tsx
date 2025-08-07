import { NFTsTab } from '@/components/wallet'
import { AppLayout } from '@/pages/Layout'

const NFTsPage = () => {
  return (
    <AppLayout>
      <div className='flex flex-col h-full p-4'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>NFTs</h1>
          <p className='text-sm text-muted-foreground'>Your Hedera NFT collection</p>
        </div>

        {/* NFTs Content */}
        <div className='flex-1'>
          <NFTsTab />
        </div>
      </div>
    </AppLayout>
  )
}

export default NFTsPage
