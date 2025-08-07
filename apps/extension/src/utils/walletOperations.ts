import type { AppDispatch, Wallet, WalletAccount } from '@/store'
import {
  addWallet,
  updateWallet,
  removeWallet,
  selectWallet,
  addAccount,
  updateAccount,
  selectAccount,
  setRefreshing,
  setSwitching,
} from '@/store'
import { v4 as uuidv4 } from 'uuid'

/**
 * Wallet operations that integrate with Redux store
 * These utilities handle both Redux state updates and Chrome storage persistence
 */
export class WalletOperations {
  private dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  /**
   * Create a new wallet and add it to the store
   */
  async createWallet(name: string, type: 'mnemonic' | 'private key' = 'mnemonic'): Promise<string> {
    const walletId = uuidv4()

    const newWallet: Wallet = {
      id: walletId,
      name,
      type,
      balance: '0',
      isImported: type === 'private key',
      registered: false,
      cypherSroteId: uuidv4(), // This would be from the cipher store
    }

    try {
      // Add to Redux store (will auto-sync to Chrome storage)
      this.dispatch(addWallet({ wallet: newWallet }))

      // Persist to Chrome storage manually for backup
      const result = await chrome.storage.local.get('wallets')
      const wallets = result.wallets || {}
      wallets[walletId] = newWallet
      await chrome.storage.local.set({ wallets })

      console.log(`Created wallet: ${name} (${walletId})`)
      return walletId
    } catch (error) {
      console.error('Failed to create wallet:', error)
      throw error
    }
  }

  /**
   * Import an existing wallet
   */
  async importWallet(name: string, privateKeyOrMnemonic: string): Promise<string> {
    const walletId = uuidv4()

    // Determine type based on input format
    const isPrivateKey = privateKeyOrMnemonic.length < 100 // Simple heuristic

    const importedWallet: Wallet = {
      id: walletId,
      name,
      type: isPrivateKey ? 'private key' : 'mnemonic',
      balance: '0',
      isImported: true,
      registered: false,
      cypherSroteId: uuidv4(),
    }

    try {
      // TODO: Validate the private key or mnemonic
      // TODO: Store encrypted version in cipher store

      this.dispatch(addWallet({ wallet: importedWallet }))

      // Persist to Chrome storage
      const result = await chrome.storage.local.get('wallets')
      const wallets = result.wallets || {}
      wallets[walletId] = importedWallet
      await chrome.storage.local.set({ wallets })

      console.log(`Imported wallet: ${name} (${walletId})`)
      return walletId
    } catch (error) {
      console.error('Failed to import wallet:', error)
      throw error
    }
  }

  /**
   * Switch to a different wallet
   */
  async switchWallet(walletId: string): Promise<void> {
    try {
      this.dispatch(setSwitching(true))

      // Update selected wallet
      this.dispatch(selectWallet({ walletId }))

      // Persist selection to Chrome storage
      await chrome.storage.local.set({ selectedWalletId: walletId })

      // TODO: Load wallet accounts and balances
      await this.loadWalletData(walletId)

      console.log(`Switched to wallet: ${walletId}`)
    } catch (error) {
      console.error('Failed to switch wallet:', error)
      throw error
    } finally {
      this.dispatch(setSwitching(false))
    }
  }

  /**
   * Remove a wallet from the store
   */
  async deleteWallet(walletId: string): Promise<void> {
    try {
      // Remove from Redux store
      this.dispatch(removeWallet({ walletId }))

      // Remove from Chrome storage
      const result = await chrome.storage.local.get('wallets')
      const wallets = result.wallets || {}
      delete wallets[walletId]
      await chrome.storage.local.set({ wallets })

      console.log(`Deleted wallet: ${walletId}`)
    } catch (error) {
      console.error('Failed to delete wallet:', error)
      throw error
    }
  }

  /**
   * Update wallet name or other properties
   */
  async updateWalletInfo(walletId: string, updates: Partial<Wallet>): Promise<void> {
    try {
      // Update Redux store
      this.dispatch(updateWallet({ walletId, wallet: updates }))

      // Update Chrome storage
      const result = await chrome.storage.local.get('wallets')
      const wallets = result.wallets || {}
      if (wallets[walletId]) {
        wallets[walletId] = { ...wallets[walletId], ...updates }
        await chrome.storage.local.set({ wallets })
      }

      console.log(`Updated wallet ${walletId}:`, updates)
    } catch (error) {
      console.error('Failed to update wallet:', error)
      throw error
    }
  }

  /**
   * Load wallet data (accounts, balances, etc.)
   */
  async loadWalletData(walletId: string): Promise<void> {
    try {
      this.dispatch(setRefreshing(true))

      // TODO: Load accounts from Hedera network
      // TODO: Load balances and transaction history

      // For now, create a mock account
      const mockAccount: WalletAccount = {
        id: uuidv4(),
        name: 'Account 1',
        registered: true,
        // Add other account properties based on your types
      }

      this.dispatch(addAccount({ walletId, account: mockAccount }))

      console.log(`Loaded data for wallet: ${walletId}`)
    } catch (error) {
      console.error('Failed to load wallet data:', error)
      throw error
    } finally {
      this.dispatch(setRefreshing(false))
    }
  }

  /**
   * Refresh all wallet balances
   */
  async refreshBalances(): Promise<void> {
    try {
      this.dispatch(setRefreshing(true))

      // TODO: Implement actual balance refresh from Hedera network
      // This would query the network for current balances

      console.log('Refreshed wallet balances')
    } catch (error) {
      console.error('Failed to refresh balances:', error)
      throw error
    } finally {
      this.dispatch(setRefreshing(false))
    }
  }
}

/**
 * Hook to get wallet operations with dispatch already bound
 */
export const useWalletOperations = (dispatch: AppDispatch): WalletOperations => {
  return new WalletOperations(dispatch)
}
