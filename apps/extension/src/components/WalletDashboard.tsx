import React, { useEffect, useState } from 'react'
import { walletManager } from '@/utils/wallet'
import type { Wallet } from '@/types/wallet'
import AccountCard from './AccountCard'
import { Plus, Settings, Wallet as WalletIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const WalletDashboard: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadWallets()
  }, [])

  const loadWallets = async () => {
    try {
      const allWallets = walletManager.getWallets()
      setWallets(allWallets)

      if (allWallets.length > 0 && !selectedWallet) {
        setSelectedWallet(allWallets[0])
      }
    } catch (error) {
      console.error('Failed to load wallets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center space-y-4'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto'></div>
          <p className='text-muted-foreground'>Loading wallets...</p>
        </div>
      </div>
    )
  }

  if (wallets.length === 0) {
    return (
      <div className='text-center space-y-6 py-12'>
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-primary to-chart-1 rounded-2xl flex items-center justify-center'>
          <WalletIcon className='w-8 h-8 text-white' />
        </div>
        <div className='space-y-2'>
          <h3 className='text-xl font-semibold text-foreground'>No Wallets Found</h3>
          <p className='text-muted-foreground'>Create your first Hedera wallet to get started</p>
        </div>
        <Button className='mx-auto'>
          <Plus className='w-4 h-4 mr-2' />
          Create Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Wallet Selector */}
      {wallets.length > 1 && (
        <div className='space-y-2'>
          <label className='text-sm font-medium text-muted-foreground'>Select Wallet</label>
          <select
            value={selectedWallet?.id || ''}
            onChange={(e) => {
              const wallet = wallets.find((w) => w.id === e.target.value)
              setSelectedWallet(wallet || null)
            }}
            className='w-full p-2 border rounded-lg bg-background text-foreground'
          >
            {wallets.map((wallet) => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.name} ({wallet.accounts.length} account
                {wallet.accounts.length !== 1 ? 's' : ''})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Selected Wallet Display */}
      {selectedWallet && (
        <div className='space-y-4'>
          {/* Wallet Header */}
          <div className='flex items-center justify-between p-4 bg-card border rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-primary to-chart-1 rounded-full flex items-center justify-center'>
                <WalletIcon className='w-5 h-5 text-white' />
              </div>
              <div>
                <h2 className='font-semibold text-foreground'>{selectedWallet.name}</h2>
                <p className='text-sm text-muted-foreground'>
                  {selectedWallet.accounts.length} account
                  {selectedWallet.accounts.length !== 1 ? 's' : ''}
                  {selectedWallet.createdAt && (
                    <> • Created {new Date(selectedWallet.createdAt).toLocaleDateString()}</>
                  )}
                </p>
              </div>
            </div>
            <Button variant='ghost' size='icon'>
              <Settings className='w-4 h-4' />
            </Button>
          </div>

          {/* Accounts List */}
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium text-foreground'>Accounts</h3>
              <Button variant='outline' size='sm'>
                <Plus className='w-4 h-4 mr-2' />
                Add Account
              </Button>
            </div>

            <div className='space-y-3'>
              {selectedWallet.accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  wallet={selectedWallet}
                  account={account}
                  isTestnet={true} // For now, always use testnet
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wallet Actions */}
      <div className='flex gap-2'>
        <Button variant='outline' className='flex-1'>
          <Plus className='w-4 h-4 mr-2' />
          Import Wallet
        </Button>
        <Button variant='outline' className='flex-1'>
          <Plus className='w-4 h-4 mr-2' />
          Create Wallet
        </Button>
      </div>
    </div>
  )
}

export default WalletDashboard
