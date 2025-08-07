import { Copy, ExternalLink, Send, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BottomModal from '@/components/ButtomDrawer'
import { useSelectedWallet, useSelectedAccount } from '@/store'

interface AddressDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const AddressDrawer = ({ isOpen, onClose }: AddressDrawerProps) => {
  const selectedWallet = useSelectedWallet()
  const selectedAccount = useSelectedAccount()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openInExplorer = (address: string, isHederaId = false) => {
    const explorerUrl = isHederaId
      ? `https://hashscan.io/testnet/account/${address}`
      : `https://hashscan.io/testnet/account/${address}`
    window.open(explorerUrl, '_blank')
  }

  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title='Account Details'>
      <div className='space-y-6'>
        {/* Account Info */}
        <div className='text-center space-y-2'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
            <span className='text-white font-bold text-lg'>
              {selectedAccount?.name.slice(0, 2).toUpperCase() || 'AC'}
            </span>
          </div>
          <h3 className='text-lg font-medium'>{selectedAccount?.name || 'Account'}</h3>
          <p className='text-sm text-muted-foreground'>
            {selectedWallet?.name} • Index {selectedAccount?.derivationIndex || 0}
          </p>
        </div>

        {/* Address Sections */}
        <div className='space-y-4'>
          {/* EVM Address */}
          <div className='p-4 border rounded-lg space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-sm'>EVM Address</h4>
              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                Ethereum Compatible
              </span>
            </div>
            <div className='bg-muted rounded-lg p-3'>
              <p className='text-xs font-mono text-muted-foreground break-all'>
                {selectedAccount?.publicKey || 'Not available'}
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={() =>
                  selectedAccount?.publicKey && copyToClipboard(selectedAccount.publicKey)
                }
              >
                <Copy className='w-4 h-4 mr-1' />
                Copy
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={() =>
                  selectedAccount?.publicKey && openInExplorer(selectedAccount.publicKey)
                }
              >
                <ExternalLink className='w-4 h-4 mr-1' />
                Explorer
              </Button>
            </div>
          </div>

          {/* Hedera Account ID */}
          <div className='p-4 border rounded-lg space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium text-sm'>Hedera Account ID</h4>
              <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full'>
                Native
              </span>
            </div>
            <div className='bg-muted rounded-lg p-3'>
              <p className='text-xs font-mono text-muted-foreground'>
                {/* TODO: Get actual Hedera Account ID from account creation */}
                0.0.{Math.floor(Math.random() * 1000000) + 100000}
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={() =>
                  copyToClipboard(`0.0.${Math.floor(Math.random() * 1000000) + 100000}`)
                }
              >
                <Copy className='w-4 h-4 mr-1' />
                Copy
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='flex-1'
                onClick={() =>
                  openInExplorer(`0.0.${Math.floor(Math.random() * 1000000) + 100000}`, true)
                }
              >
                <ExternalLink className='w-4 h-4 mr-1' />
                HashScan
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-2 gap-3 pt-4 border-t'>
          <Button variant='outline' className='flex items-center justify-center space-x-2'>
            <Send className='w-4 h-4' />
            <span>Send</span>
          </Button>
          <Button variant='outline' className='flex items-center justify-center space-x-2'>
            <Download className='w-4 h-4' />
            <span>Receive</span>
          </Button>
        </div>
      </div>
    </BottomModal>
  )
}

export default AddressDrawer
