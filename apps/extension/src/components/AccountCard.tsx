import React, { useEffect, useState } from 'react'
import type { Wallet, Account } from '@/types/wallet'
import { hederaTestnetService } from '@/utils/hederaService'
import { formatHbarAmount } from '@/utils/hedera'
import { Loader2, Eye, Copy, ExternalLink, Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateHederaAccount from './CreateHederaAccount'
import TransferHbar from './TransferHbar'

interface AccountCardProps {
  wallet: Wallet
  account: Account
  isTestnet?: boolean
}

export const AccountCard: React.FC<AccountCardProps> = ({ wallet, account, isTestnet = true }) => {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFullAddress, setShowFullAddress] = useState(false)
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [hederaAccountId, setHederaAccountId] = useState<string | null>(null)

  const loadBalance = async () => {
    if (!account.address) return

    setIsLoading(true)
    setError(null)

    try {
      // Note: This will only work if the account has been created on Hedera
      // For new accounts, this will fail until they're actually created
      const accountBalance = await hederaTestnetService.getAccountBalance(account.address)
      setBalance(accountBalance)
    } catch (err) {
      console.error('Failed to load balance:', err)
      setError('Account not found on Hedera network')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBalance()
  }, [account.address])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const openInExplorer = () => {
    const explorerUrl = isTestnet
      ? `https://hashscan.io/testnet/account/${account.address}`
      : `https://hashscan.io/mainnet/account/${account.address}`
    window.open(explorerUrl, '_blank')
  }

  return (
    <div className='bg-card border rounded-lg p-4 space-y-4'>
      {/* Account Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='font-medium text-foreground'>{account.name}</h3>
          <p className='text-sm text-muted-foreground'>
            {wallet.name} • Account {(account.source.seedIndex || 0) + 1}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {isTestnet && (
            <span className='px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full'>
              Testnet
            </span>
          )}
        </div>
      </div>

      {/* Balance Display */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Balance</span>
          <Button variant='ghost' size='sm' onClick={loadBalance} disabled={isLoading}>
            {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Refresh'}
          </Button>
        </div>
        <div className='text-2xl font-bold text-foreground'>
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <Loader2 className='w-5 h-5 animate-spin' />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <span className='text-sm text-destructive'>{error}</span>
          ) : balance !== null ? (
            formatHbarAmount(balance)
          ) : (
            'Not created'
          )}
        </div>
      </div>

      {/* Address Display */}
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>Public Key</span>
          <Button variant='ghost' size='sm' onClick={() => setShowFullAddress(!showFullAddress)}>
            <Eye className='w-4 h-4' />
          </Button>
        </div>
        <div className='flex items-center gap-2 p-2 bg-muted rounded text-sm font-mono'>
          <span className='flex-1'>
            {showFullAddress ? account.address : truncateAddress(account.address)}
          </span>
          <Button variant='ghost' size='sm' onClick={() => copyToClipboard(account.address)}>
            <Copy className='w-4 h-4' />
          </Button>
          {balance !== null && (
            <Button variant='ghost' size='sm' onClick={openInExplorer}>
              <ExternalLink className='w-4 h-4' />
            </Button>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className='flex gap-2 pt-2'>
        {balance !== null ? (
          <>
            <Button
              variant='outline'
              size='sm'
              className='flex-1'
              onClick={() => setShowTransfer(!showTransfer)}
            >
              <Send className='w-4 h-4 mr-1' />
              Send
            </Button>
            <Button variant='outline' size='sm' className='flex-1'>
              Receive
            </Button>
          </>
        ) : (
          <Button
            variant='outline'
            size='sm'
            className='flex-1'
            onClick={() => setShowCreateAccount(!showCreateAccount)}
          >
            <Plus className='w-4 h-4 mr-1' />
            Create Account
          </Button>
        )}
      </div>

      {/* Conditional Components */}
      {showCreateAccount && balance === null && (
        <div className='pt-4 border-t'>
          <CreateHederaAccount
            publicKey={account.address}
            onAccountCreated={(accountId) => {
              setHederaAccountId(accountId)
              setShowCreateAccount(false)
              loadBalance() // Refresh balance after account creation
            }}
          />
        </div>
      )}

      {showTransfer && balance !== null && hederaAccountId && (
        <div className='pt-4 border-t'>
          <TransferHbar
            fromAccountId={hederaAccountId}
            fromPrivateKey={undefined} // TODO: Get private key from encrypted storage
            onTransactionComplete={(txId) => {
              console.log('Transaction completed:', txId)
              setShowTransfer(false)
              loadBalance() // Refresh balance after transfer
            }}
          />
        </div>
      )}
    </div>
  )
}

export default AccountCard
