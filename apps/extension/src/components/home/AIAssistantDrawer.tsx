import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { Brain, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AIAssistantDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
  const navigate = useNavigate()

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      fullScreen
      title='AI Assistant'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Close
          </Button>
          <Button className='flex-1' onClick={() => {}}>
            <Zap className='w-4 h-4 mr-1' />
            Get Started
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='text-center py-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Brain className='w-8 h-8 text-white' />
          </div>
          <h3 className='text-lg font-medium mb-2'>AI-Powered Assistance</h3>
          <p className='text-muted-foreground text-sm mb-6'>
            Get intelligent help with transactions, account management, and blockchain operations.
          </p>
          <Button
            variant='link'
            className='text-primary text-sm'
            onClick={() => {
              navigate('/about')
            }}
          >
            Learn More
          </Button>
        </div>

        <div className='bg-muted/50 rounded-lg p-4 text-center'>
          <p className='text-xs text-muted-foreground'>
            🚀 Coming soon! More AI features are currently in development.
          </p>
        </div>
      </div>
    </BottomModal>
  )
}

export default AIAssistantDrawer
