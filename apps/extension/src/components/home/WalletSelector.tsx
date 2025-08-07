import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useSelectedWallet, useSelectedAccount } from '@/store'

interface WalletSelectorProps {
  onWalletSelect: () => void
}

const WalletSelector = ({ onWalletSelect }: WalletSelectorProps) => {
  const selectedWallet = useSelectedWallet()
  const selectedAccount = useSelectedAccount()

  return (
    <div className='p-2'>
      <Button
        variant='ghost'
        className='flex items-center space-x-2 cursor-pointer outline-none p-2 hover:bg-accent rounded-lg w-full justify-start'
        data-testid='wallet-select-button'
        onClick={onWalletSelect}
      >
        <div className='flex items-center space-x-3 flex-1'>
          {/* Wallet Avatar */}
          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
            {selectedWallet?.name.slice(0, 2).toUpperCase() || 'W'}
          </div>

          {/* Wallet Info */}
          <div className='flex flex-col text-left flex-1 min-w-0'>
            <p
              data-testid='selected-wallet-name'
              className='text-sm font-medium text-foreground truncate max-w-[6rem]'
            >
              {selectedWallet?.name || 'No Wallet Selected'}
            </p>
            <div className='flex items-center space-x-2'>
              <p
                data-testid='selected-account-name'
                className='text-xs text-muted-foreground truncate max-w-[6rem]'
              >
                {selectedAccount?.name || 'No Account Selected'}
              </p>
            </div>
          </div>

          <ChevronDown className='text-muted-foreground h-4 w-4 flex-shrink-0' />
        </div>
      </Button>
    </div>
  )
}

export default WalletSelector
