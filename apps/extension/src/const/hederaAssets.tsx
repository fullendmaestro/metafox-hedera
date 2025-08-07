import type { Asset } from '@/components/wallet/AssetsList'

// Hedera-specific assets
export const hederaAssets: Asset[] = [
  {
    symbol: 'HBAR',
    name: 'Hedera Hashgraph',
    price: 0.0,
    percent: 0.0,
    balance: 0,
    fiatBalance: 0,
    icon: (
      <div className='w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold'>
        ℏ
      </div>
    ),
    isNative: true,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    price: 1.0,
    percent: 0.01,
    balance: 0,
    fiatBalance: 0,
    icon: (
      <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
        $
      </div>
    ),
    isNative: false,
  },
  {
    symbol: 'SAUCE',
    name: 'SaucerSwap',
    price: 0.0,
    percent: 0.0,
    balance: 0,
    fiatBalance: 0,
    icon: (
      <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold'>
        S
      </div>
    ),
    isNative: false,
  },
]
