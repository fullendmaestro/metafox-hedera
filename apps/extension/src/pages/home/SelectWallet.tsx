import BottomModal from '@/components/ButtomDrawer'
import { Button } from '@/components/ui/button'
import { useWallet, useWalletList, useAppDispatch, selectWallet, selectAccount } from '@/store'
import { Plus, Check, Copy, MoreVertical, Wallet, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type SelectWalletProps = {
  readonly isVisible: boolean
  readonly onClose: VoidFunction
  readonly title?: string
}

const SelectWallet = ({ isVisible, onClose, title = 'Select Wallet' }: SelectWalletProps) => {
  const { selectedWalletId, selectedAccountId, walletsAccounts } = useWallet()
  const walletList = useWalletList()
  const dispatch = useAppDispatch()
  const [expandedWallets, setExpandedWallets] = useState<Set<string>>(new Set([selectedWalletId]))

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const truncateAddress = (address: string) => {
    if (!address || address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const handleWalletSelect = (walletId: string) => {
    dispatch(selectWallet({ walletId }))
    // Toggle expansion
    const newExpanded = new Set(expandedWallets)
    if (newExpanded.has(walletId)) {
      newExpanded.delete(walletId)
    } else {
      newExpanded.add(walletId)
    }
    setExpandedWallets(newExpanded)
  }

  const handleAccountSelect = (accountId: string, walletId: string) => {
    dispatch(selectWallet({ walletId }))
    dispatch(selectAccount({ accountId }))
    onClose()
  }

  const getAccountsForWallet = (walletId: string) => {
    const accounts = walletsAccounts[walletId]
    return accounts ? Object.values(accounts) : []
  }

  const sortedWallets = useMemo(() => {
    return [...walletList].sort((a, b) => {
      // Put selected wallet first
      if (a.id === selectedWalletId) return -1
      if (b.id === selectedWalletId) return 1
      return a.name.localeCompare(b.name)
    })
  }, [walletList, selectedWalletId])

  return (
    <>
      <BottomModal
        isOpen={isVisible}
        onClose={onClose}
        title={title}
        fullScreen
        footerComponent={
          <div className='flex gap-2 w-full'>
            <Button variant='outline' className='flex-1' onClick={() => {}}>
              <Plus size={16} className='mr-1' /> Import Wallet
            </Button>
            <Button className='flex-1' onClick={() => {}}>
              <Plus size={16} className='mr-1' /> Create Wallet
            </Button>
          </div>
        }
      >
        <div className='space-y-3'>
          {sortedWallets.length === 0 ? (
            <div className='text-center py-8'>
              <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
                <Wallet className='w-8 h-8 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-medium mb-2'>No Wallets Found</h3>
              <p className='text-muted-foreground text-sm mb-4'>
                Create or import a wallet to get started.
              </p>
            </div>
          ) : (
            sortedWallets.map((wallet) => {
              const accounts = getAccountsForWallet(wallet.id)
              const isExpanded = expandedWallets.has(wallet.id)
              const isSelected = wallet.id === selectedWalletId

              return (
                <div
                  key={wallet.id}
                  className={cn(
                    'border rounded-lg overflow-hidden transition-all',
                    isSelected ? 'border-primary bg-primary/5' : 'border-border',
                  )}
                >
                  {/* Wallet Header */}
                  <div
                    className='p-4 cursor-pointer hover:bg-accent/50 transition-colors'
                    onClick={() => handleWalletSelect(wallet.id)}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                          {wallet.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className='flex items-center space-x-2'>
                            <h3 className='font-medium text-foreground'>{wallet.name}</h3>
                            {isSelected && <Check className='w-4 h-4 text-primary' />}
                          </div>
                          <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                            <span className='capitalize'>{wallet.type}</span>
                            <span>•</span>
                            <span>
                              {accounts.length} account{accounts.length !== 1 ? 's' : ''}
                            </span>
                            <span>•</span>
                            <span>{wallet.balance || '0'} HBAR</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0'
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle wallet options
                          }}
                        >
                          <MoreVertical className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Accounts List */}
                  {isExpanded && accounts.length > 0 && (
                    <div className='border-t border-border/50'>
                      {accounts.map((account) => {
                        const isAccountSelected = account.id === selectedAccountId && isSelected

                        return (
                          <div
                            key={account.id}
                            className={cn(
                              'p-3 ml-4 cursor-pointer hover:bg-accent/30 transition-colors border-l-2 border-l-transparent',
                              isAccountSelected && 'border-l-primary bg-primary/5',
                            )}
                            onClick={() => handleAccountSelect(account.id, wallet.id)}
                          >
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-3'>
                                <div className='w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs'>
                                  <User className='w-4 h-4' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='flex items-center space-x-2'>
                                    <span className='text-sm font-medium text-foreground'>
                                      {account.name}
                                    </span>
                                    {isAccountSelected && (
                                      <Check className='w-3 h-3 text-primary' />
                                    )}
                                  </div>
                                  <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                                    <span className='font-mono'>
                                      {truncateAddress(account.publicKey)}
                                    </span>
                                    <Button
                                      variant='ghost'
                                      size='sm'
                                      className='h-4 w-4 p-0 hover:bg-accent/50'
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        copyToClipboard(account.publicKey)
                                      }}
                                    >
                                      <Copy className='h-3 w-3' />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className='text-xs text-muted-foreground text-right'>
                                <div>0 HBAR</div>
                                <div>Index: {account.derivationIndex || 0}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}

                      {/* Add Account Button */}
                      <div className='p-3 ml-4 border-t border-border/30'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='w-full justify-start text-muted-foreground hover:text-foreground'
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle add account
                          }}
                        >
                          <Plus className='w-4 h-4 mr-2' />
                          Add Account
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </BottomModal>
    </>
  )
}

export default SelectWallet
