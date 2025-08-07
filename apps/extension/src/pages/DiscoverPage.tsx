import { Compass, ExternalLink, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLayout } from '@/pages/Layout'

const discoverItems = [
  {
    title: 'Hedera Explorer',
    description: 'Explore the Hedera network',
    url: 'https://hashscan.io',
    icon: Globe,
  },
  {
    title: 'SaucerSwap',
    description: 'Decentralized exchange on Hedera',
    url: 'https://saucerswap.finance',
    icon: ExternalLink,
  },
  {
    title: 'Hedera Portal',
    description: 'Official Hedera developer portal',
    url: 'https://portal.hedera.com',
    icon: ExternalLink,
  },
]

const DiscoverPage = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <AppLayout>
      <div className='flex flex-col h-full p-4'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-foreground'>Discover</h1>
          <p className='text-sm text-muted-foreground'>Explore the Hedera ecosystem</p>
        </div>

        {/* Discover Content */}
        <div className='flex-1 space-y-4'>
          {discoverItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className='p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer'
                onClick={() => openLink(item.url)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <Icon className='w-5 h-5 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-medium text-foreground'>{item.title}</h3>
                      <p className='text-sm text-muted-foreground'>{item.description}</p>
                    </div>
                  </div>
                  <ExternalLink className='w-4 h-4 text-muted-foreground' />
                </div>
              </div>
            )
          })}

          {/* Additional Section */}
          <div className='pt-8'>
            <div className='flex flex-col items-center justify-center space-y-4 py-8'>
              <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center'>
                <Compass className='w-8 h-8 text-white' />
              </div>
              <div className='text-center space-y-2'>
                <h3 className='font-medium text-foreground'>More Coming Soon</h3>
                <p className='text-sm text-muted-foreground max-w-sm'>
                  We're continuously adding new dApps and services to the Hedera ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DiscoverPage
