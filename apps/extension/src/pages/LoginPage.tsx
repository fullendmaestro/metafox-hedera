import React, { useState, useEffect } from 'react'
import { WalletDashboard } from '@/components/WalletDashboard'
import { WalletOnboardingWizard } from '@/components/WalletOnboardingWizard'
import { walletManager } from '@/utils/wallet'
import { Button } from '@/components/ui/button'
import { Lock, Plus, Settings } from 'lucide-react'

const LoginPage: React.FC = () => {
  const [hasWallets, setHasWallets] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkWallets()
  }, [])

  const checkWallets = async () => {
    try {
      const walletsExist = walletManager.hasWallets()
      setHasWallets(walletsExist)
    } catch (error) {
      console.error('Failed to check wallets:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <div className='h-full flex items-center justify-center'>
          <div className='text-center space-y-4'>
            <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto'></div>
            <p className='text-white'>Loading MetaFox...</p>
          </div>
        </div>
      </>
    )
  }

  if (!hasWallets) {
    return (
      <>
        <div className='h-full flex flex-col'>
          {/* Header */}
          <header className='p-4 relative z-10'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 gradient-golden rounded-lg flex items-center justify-center shadow-lg'>
                  <Lock className='w-3 h-3 text-white' />
                </div>
                <h1 className='text-lg font-bold text-white'>MetaFox</h1>
              </div>
              <Button variant='ghost' size='icon' className='text-white w-8 h-8'>
                <Settings className='w-4 h-4' />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className='flex-1 flex items-center justify-center px-4'>
            <div className='text-center space-y-6 max-w-xs'>
              <div className='w-16 h-16 mx-auto gradient-golden rounded-full flex items-center justify-center shadow-2xl'>
                <Lock className='w-8 h-8 text-white' />
              </div>

              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-white'>Welcome to MetaFox</h2>
                <p className='text-white/80 text-sm'>
                  Create your first Hedera wallet to get started
                </p>
              </div>

              <Button
                onClick={() => setIsWizardOpen(true)}
                className='w-full gradient-golden border-none shadow-xl hover:shadow-2xl transition-all duration-300 text-white font-semibold rounded-lg'
              >
                <Plus className='w-4 h-4 mr-2' />
                Create Wallet
              </Button>
            </div>
          </main>

          <WalletOnboardingWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='h-full flex flex-col'>
        {/* Header */}
        <header className='p-4 border-b border-white/10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 gradient-golden rounded-lg flex items-center justify-center shadow-lg'>
                <Lock className='w-3 h-3 text-white' />
              </div>
              <h1 className='text-lg font-bold text-white'>MetaFox</h1>
            </div>
            <div className='flex items-center gap-1'>
              <Button
                variant='ghost'
                size='sm'
                className='text-white text-xs px-2'
                onClick={() => setIsWizardOpen(true)}
              >
                <Plus className='w-3 h-3 mr-1' />
                Add
              </Button>
              <Button variant='ghost' size='icon' className='text-white w-8 h-8'>
                <Settings className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='flex-1 p-4 overflow-y-auto'>
          <WalletDashboard />
        </main>

        <WalletOnboardingWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      </div>
    </>
  )
}

export default LoginPage
