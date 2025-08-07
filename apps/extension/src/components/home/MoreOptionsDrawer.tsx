import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import ToggleSwitch from '@/components/ui/ToggleSwitch'
import {
  BookOpen,
  Lock,
  ExternalLink,
  Palette,
  DollarSign,
  Globe,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'

interface MoreOptionsDrawerProps {
  isOpen: boolean
  onClose: () => void
  onAddressBookOpen: () => void
  onColorModeOpen: () => void
  onCurrencyOpen: () => void
  onNetworkOpen: () => void
}

const MoreOptionsDrawer = ({
  isOpen,
  onClose,
  onAddressBookOpen,
  onColorModeOpen,
  onCurrencyOpen,
  onNetworkOpen,
}: MoreOptionsDrawerProps) => {
  const [openInSidePanel, setOpenInSidePanel] = useState(false)

  const handleLockWallet = () => {
    // TODO: Implement wallet lock functionality
    console.log('Locking wallet...')
    onClose()
  }

  const handleSidePanelToggle = (enabled: boolean) => {
    setOpenInSidePanel(enabled)
    // TODO: Implement side panel preference save
    console.log('Side panel preference:', enabled)
  }

  // Single actions and toggles
  const singleOptions = [
    {
      id: 'lock-wallet',
      title: 'Lock Wallet',
      description: 'Secure your wallet immediately',
      icon: Lock,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      type: 'action' as const,
      onClick: handleLockWallet,
    },
    {
      id: 'side-panel',
      title: 'Open in Side Panel',
      description: 'Use side panel instead of popup',
      icon: ExternalLink,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      type: 'toggle' as const,
      value: openInSidePanel,
      onChange: handleSidePanelToggle,
    },
  ]

  // Multi-options that open other views
  const multiOptions = [
    {
      id: 'address-book',
      title: 'Address Book',
      description: 'Manage saved contacts and addresses',
      icon: BookOpen,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      onClick: () => {
        onClose()
        onAddressBookOpen()
      },
    },
    {
      id: 'color-mode',
      title: 'Color Mode',
      description: 'Choose light, dark, or system theme',
      icon: Palette,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      onClick: () => {
        onClose()
        onColorModeOpen()
      },
    },
    {
      id: 'currency',
      title: 'Display Currency',
      description: 'Set preferred currency for balance display',
      icon: DollarSign,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      onClick: () => {
        onClose()
        onCurrencyOpen()
      },
    },
    {
      id: 'network',
      title: 'Network Settings',
      description: 'Switch between Hedera networks',
      icon: Globe,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      onClick: () => {
        onClose()
        onNetworkOpen()
      },
    },
  ]

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title='More Options'
      footerComponent={
        <div className='flex gap-2 w-full'>
          <Button variant='secondary' className='flex-1 rounded-full' onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className='space-y-6'>
        {/* Quick Actions & Toggles */}
        <div className='space-y-3'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Quick Actions
          </h3>
          <div className='space-y-2'>
            {singleOptions.map(
              ({
                id,
                title,
                description,
                icon: Icon,
                bgColor,
                iconColor,
                type,
                onClick,
                value,
                onChange,
              }) => (
                <div
                  key={id}
                  className='p-4 border rounded-lg hover:bg-accent/50 transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-sm'>{title}</h4>
                      <p className='text-xs text-muted-foreground'>{description}</p>
                    </div>
                    {type === 'action' ? (
                      <Button variant='outline' size='sm' onClick={onClick}>
                        Execute
                      </Button>
                    ) : (
                      <ToggleSwitch enabled={value || false} onChange={onChange || (() => {})} />
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Settings & Configuration */}
        <div className='space-y-3'>
          <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Settings & Configuration
          </h3>
          <div className='space-y-2'>
            {multiOptions.map(
              ({ id, title, description, icon: Icon, bgColor, iconColor, onClick }) => (
                <div
                  key={id}
                  className='p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer'
                  onClick={onClick}
                >
                  <div className='flex items-center space-x-3'>
                    <div
                      className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-medium text-sm'>{title}</h4>
                      <p className='text-xs text-muted-foreground'>{description}</p>
                    </div>
                    <ChevronRight className='w-4 h-4 text-muted-foreground' />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className='bg-muted/50 rounded-lg p-4 text-center'>
          <p className='text-xs text-muted-foreground'>MetaFox v1.0.0 • Made with ❤️ for Hedera</p>
        </div>
      </div>
    </BottomModal>
  )
}

export default MoreOptionsDrawer
