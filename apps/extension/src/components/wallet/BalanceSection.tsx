import NumberFlow from '@number-flow/react'
import { RefreshCw, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  useSelectedWallet,
  useSelectedAccount,
  useWallet,
  useAppDispatch,
  setRefreshing,
} from '@/store'
import { cn } from '@/lib/utils'

interface BalanceSectionProps {
  onAddressClick: () => void
  balanceVisible: boolean
  onBalanceToggle: () => void
}

const BalanceSection = ({
  onAddressClick,
  balanceVisible,
  onBalanceToggle,
}: BalanceSectionProps) => {
  const selectedWallet = useSelectedWallet()
  const selectedAccount = useSelectedAccount()
  const { refreshing } = useWallet()
  const dispatch = useAppDispatch()

  // Calculate total balance from wallet
  const totalBalance = parseFloat(selectedWallet?.balance || '0')

  const handleRefresh = async () => {
    dispatch(setRefreshing(true))
    // TODO: Implement actual refresh logic here
    setTimeout(() => {
      dispatch(setRefreshing(false))
    }, 2000)
  }

  const truncateAddress = (address: string) => {
    if (!address || address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  return (
    <div className='flex flex-col items-center text-center space-y-3'>
      {/* Main Balance with Refresh Button - Side by Side */}
      <div className='flex items-center justify-center space-x-2'>
        <h2
          data-testid='total-asset-balance'
          className='text-5xl font-bold text-foreground transition-all ease-in-out duration-300 cursor-pointer hover:opacity-80 font-mono tabular-nums'
          onClick={onBalanceToggle}
        >
          {balanceVisible ? (
            <NumberFlow
              value={totalBalance}
              prefix='$'
              format={{ notation: 'standard', minimumFractionDigits: 2 }}
            />
          ) : (
            <span>••••••</span>
          )}
        </h2>

        {/* Refresh Button - Side by Side with smaller size */}
        <Button
          variant='ghost'
          size='sm'
          className='h-8 w-8 p-0 pt-6'
          onClick={handleRefresh}
          disabled={refreshing}
          data-testid='refresh-wallet-button'
          aria-label='Refresh'
        >
          <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
        </Button>
      </div>

      {/* Address Display */}
      {selectedAccount?.publicKey && (
        <Button
          variant='ghost'
          className='rounded-full bg-accent/50 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono'
          onClick={onAddressClick}
        >
          {truncateAddress(selectedAccount.publicKey)}
          <CopyIcon />
        </Button>
      )}
    </div>
  )
}

export default BalanceSection
