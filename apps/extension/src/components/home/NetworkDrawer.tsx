import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { Globe, Zap, Shield, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface NetworkDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const NetworkDrawer = ({ isOpen, onClose }: NetworkDrawerProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet') // Could be from a network context

  const networks = [
    {
      id: 'mainnet',
      title: 'Hedera Mainnet',
      description: 'Main Hedera network',
      status: 'connected',
      icon: Globe,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      statusColor: 'text-green-600',
    },
    {
      id: 'testnet',
      title: 'Hedera Testnet',
      description: 'Test network for development',
      status: 'available',
      icon: Zap,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      statusColor: 'text-blue-600',
    },
    {
      id: 'previewnet',
      title: 'Hedera Previewnet',
      description: 'Preview upcoming features',
      status: 'available',
      icon: Shield,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      statusColor: 'text-purple-600',
    },
    {
      id: 'custom',
      title: 'Custom Network',
      description: 'Add your own network endpoint',
      status: 'not-configured',
      icon: AlertTriangle,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      statusColor: 'text-orange-600',
    },
  ]

  const handleNetworkSelect = (networkId: string) => {
    if (networkId === 'custom') {
      // TODO: Open custom network configuration
      console.log('Open custom network configuration')
      return
    }

    setSelectedNetwork(networkId)
    // TODO: Implement network switching logic
    console.log('Network changed to:', networkId)
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected'
      case 'available':
        return 'Available'
      case 'not-configured':
        return 'Not Configured'
      default:
        return 'Unknown'
    }
  }

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Network Settings'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='outline' className='flex-1' onClick={onClose}>
            Cancel
          </Button>
          <Button className='flex-1' onClick={onClose}>
            Switch Network
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='space-y-3'>
          {networks.map(
            ({ id, title, description, status, icon: Icon, bgColor, iconColor, statusColor }) => (
              <div
                key={id}
                className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer ${
                  selectedNetwork === id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleNetworkSelect(id)}
              >
                <div className='flex items-center space-x-3'>
                  <div
                    className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <h4 className='font-medium text-sm'>{title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${statusColor} bg-current/10`}>
                        {getStatusText(status)}
                      </span>
                    </div>
                    <p className='text-xs text-muted-foreground'>{description}</p>
                  </div>
                  {selectedNetwork === id && (
                    <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
                      <div className='w-2 h-2 bg-primary-foreground rounded-full' />
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        <div className='bg-amber-50 border border-amber-200 rounded-lg p-4'>
          <div className='flex items-start space-x-3'>
            <AlertTriangle className='w-5 h-5 text-amber-600 mt-0.5' />
            <div>
              <h4 className='font-medium text-sm text-amber-900 mb-1'>Network Warning</h4>
              <p className='text-xs text-amber-700'>
                Switching networks will disconnect all dApps. Make sure to complete any pending
                transactions first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BottomModal>
  )
}

export default NetworkDrawer
