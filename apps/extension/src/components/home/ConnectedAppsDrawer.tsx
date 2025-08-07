import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { Globe2, Settings, Shield } from 'lucide-react'

interface ConnectedAppsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const ConnectedAppsDrawer = ({ isOpen, onClose }: ConnectedAppsDrawerProps) => {
  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Connected Applications'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button
            variant='secondary'
            className='flex-1 px-6 py-2 w-full rounded-full'
            onClick={onClose}
          >
            Close
          </Button>
          <Button className='flex-1 px-6 py-2 w-full rounded-full' onClick={() => {}}>
            <Settings className='w-4 h-4 mr-1' />
            Manage All
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='text-center py-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Globe2 className='w-8 h-8 text-white' />
          </div>
          <h3 className='text-lg font-medium mb-2'>No Connected Apps</h3>
          <p className='text-muted-foreground text-sm mb-6'>
            Connect with dApps to start using your Hedera wallet across the ecosystem.
          </p>
        </div>

        <div className='space-y-3'>
          <div className='p-4 border-2 border-dashed border-muted rounded-lg text-center'>
            <Globe2 className='w-8 h-8 text-muted-foreground mx-auto mb-2' />
            <p className='text-sm text-muted-foreground mb-3'>
              When you connect to dApps, they'll appear here
            </p>
            <Button variant='outline' size='sm'>
              Browse dApps
            </Button>
          </div>
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-start space-x-3'>
            <Shield className='w-5 h-5 text-blue-600 mt-0.5' />
            <div>
              <h4 className='font-medium text-sm text-blue-900 mb-1'>Security First</h4>
              <p className='text-xs text-blue-700'>
                MetaFox only connects to verified dApps. Always review permissions before
                connecting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BottomModal>
  )
}

export default ConnectedAppsDrawer
