import NumberFlow from '@number-flow/react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface Asset {
  symbol: string
  name: string
  price: number
  percent: number
  balance: number
  fiatBalance: number
  iconUrl: string
  isNative: boolean
}

interface AssetsListProps {
  assets: Asset[]
  balanceVisible: boolean
}

const AssetsList = ({ assets, balanceVisible }: AssetsListProps) => {
  const formatBalance = (balance: number) => {
    return balance.toFixed(2)
  }

  return (
    <div className='space-y-3'>
      {assets.map((asset) => (
        <div
          key={asset.symbol}
          data-testid='asset-row'
          className='flex items-center justify-between p-3 rounded-2xl bg-accent/80 hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-border'
        >
          <div className='flex items-center space-x-3'>
            {/* Asset Icon */}
            <img
              className='size-10 rounded-full'
              src={asset.iconUrl ?? '/assets/defaultcoin.svg'}
              alt='asset logo'
            />

            {/* Asset Info */}
            <div>
              <div className='flex items-center space-x-2'>
                <span data-testid='asset-symbol' className='font-medium text-foreground'>
                  {asset.symbol}
                </span>
                {asset.isNative && (
                  <span className='px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full'>
                    Native
                  </span>
                )}
              </div>
              <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
                <span>{asset.name}</span>
                {asset.price > 0 && (
                  <>
                    <span>•</span>
                    <span>${asset.price.toFixed(4)}</span>
                    <span
                      className={cn(
                        'text-xs',
                        asset.percent >= 0 ? 'text-green-600' : 'text-red-600',
                      )}
                    >
                      {asset.percent >= 0 ? '+' : ''}
                      {asset.percent.toFixed(2)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Asset Balance */}
          <div className='text-right'>
            <div className='font-medium text-foreground' data-testid='asset-balance'>
              {balanceVisible ? formatBalance(asset.balance) : '****'}
            </div>
            <div className='text-sm text-muted-foreground' data-testid='asset-fiat-balance'>
              {balanceVisible ? (
                <NumberFlow
                  value={asset.fiatBalance}
                  prefix='$'
                  format={{ notation: 'standard', minimumFractionDigits: 2 }}
                />
              ) : (
                '$****'
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add Token Button */}
      <div className='pt-4 border-t border-border'>
        <Button
          variant='ghost'
          className='w-full py-6 border-2 border-dashed border-muted hover:border-border hover:bg-accent/50 transition-colors'
          onClick={() => {}}
        >
          <div className='flex items-center space-x-2 text-muted-foreground'>
            <Plus className='h-4 w-4' />
            <span>Add Token</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default AssetsList
