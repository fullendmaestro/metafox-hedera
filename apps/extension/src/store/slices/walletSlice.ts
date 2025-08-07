import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  WalletState,
  UpdateWalletPayload,
  AddWalletPayload,
  RemoveWalletPayload,
  UpdateAccountPayload,
  AddAccountPayload,
  UpdateBalancePayload,
  SelectWalletPayload,
  SelectAccountPayload,
  WalletAccount,
} from '../types'

const initialState: WalletState = {
  selectedWalletId: '',
  selectedAccountId: '',
  lastRefresh: 0,
  refreshing: false,
  switching: false,
  wallets: {},
  walletsAccounts: {},
  walletsAccountsAssets: {},
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Wallet management
    addWallet: (state, action: PayloadAction<AddWalletPayload>) => {
      const { wallet } = action.payload
      state.wallets[wallet.id] = wallet
      // Initialize accounts object for this wallet
      if (!state.walletsAccounts[wallet.id]) {
        state.walletsAccounts[wallet.id] = {}
      }
      // If wallet has accounts, add them to walletsAccounts
      if (wallet.accounts) {
        wallet.accounts.forEach((account) => {
          state.walletsAccounts[wallet.id][account.id] = account
        })
      }
    },
    updateWallet: (state, action: PayloadAction<UpdateWalletPayload>) => {
      const { walletId, wallet } = action.payload
      if (state.wallets[walletId]) {
        state.wallets[walletId] = { ...state.wallets[walletId], ...wallet }
      }
    },
    removeWallet: (state, action: PayloadAction<RemoveWalletPayload>) => {
      const { walletId } = action.payload
      delete state.wallets[walletId]
      delete state.walletsAccounts[walletId]
      delete state.walletsAccountsAssets[walletId]
      // If this was the selected wallet, clear selection
      if (state.selectedWalletId === walletId) {
        state.selectedWalletId = ''
        state.selectedAccountId = ''
      }
    },
    selectWallet: (state, action: PayloadAction<SelectWalletPayload>) => {
      state.selectedWalletId = action.payload.walletId
      // Clear account selection when switching wallets
      state.selectedAccountId = ''
    },

    // Account management
    addAccount: (state, action: PayloadAction<AddAccountPayload>) => {
      const { walletId, account } = action.payload
      if (!state.walletsAccounts[walletId]) {
        state.walletsAccounts[walletId] = {}
      }
      state.walletsAccounts[walletId][account.id] = account

      // Also add to wallet's accounts array if wallet exists
      if (state.wallets[walletId]) {
        if (!state.wallets[walletId].accounts) {
          state.wallets[walletId].accounts = []
        }
        // Check if account already exists in wallet's accounts array
        const existingIndex = state.wallets[walletId].accounts.findIndex(
          (acc) => acc.id === account.id,
        )
        if (existingIndex === -1) {
          state.wallets[walletId].accounts.push(account)
        } else {
          state.wallets[walletId].accounts[existingIndex] = account
        }
      }
    },
    updateAccount: (state, action: PayloadAction<UpdateAccountPayload>) => {
      const { walletId, accountId, account } = action.payload
      if (state.walletsAccounts[walletId]?.[accountId]) {
        state.walletsAccounts[walletId][accountId] = {
          ...state.walletsAccounts[walletId][accountId],
          ...account,
        }
      }

      // Also update in wallet's accounts array
      if (state.wallets[walletId]?.accounts) {
        const accountIndex = state.wallets[walletId].accounts.findIndex(
          (acc) => acc.id === accountId,
        )
        if (accountIndex !== -1) {
          state.wallets[walletId].accounts[accountIndex] = {
            ...state.wallets[walletId].accounts[accountIndex],
            ...account,
          }
        }
      }
    },
    selectAccount: (state, action: PayloadAction<SelectAccountPayload>) => {
      state.selectedAccountId = action.payload.accountId
    },

    // Generate new account from existing seed phrase
    generateAccount: (
      state,
      action: PayloadAction<{ walletId: string; account: WalletAccount }>,
    ) => {
      const { walletId, account } = action.payload

      if (state.wallets[walletId] && state.wallets[walletId].type === 0) {
        // Only for seed-based wallets
        // Add to walletsAccounts
        if (!state.walletsAccounts[walletId]) {
          state.walletsAccounts[walletId] = {}
        }
        state.walletsAccounts[walletId][account.id] = account

        // Add to wallet's accounts array
        if (!state.wallets[walletId].accounts) {
          state.wallets[walletId].accounts = []
        }
        state.wallets[walletId].accounts.push(account)
      }
    },

    // Remove account from wallet
    removeAccount: (state, action: PayloadAction<{ walletId: string; accountId: string }>) => {
      const { walletId, accountId } = action.payload

      // Remove from walletsAccounts
      if (state.walletsAccounts[walletId]) {
        delete state.walletsAccounts[walletId][accountId]
      }

      // Remove from wallet's accounts array
      if (state.wallets[walletId]?.accounts) {
        state.wallets[walletId].accounts = state.wallets[walletId].accounts.filter(
          (account) => account.id !== accountId,
        )
      }

      // Clear selection if this account was selected
      if (state.selectedAccountId === accountId) {
        state.selectedAccountId = ''
      }
    },

    // Balance and coin management
    updateBalance: (_state, action: PayloadAction<UpdateBalancePayload>) => {
      // TODO: Implement balance updates for Hedera accounts
      // For now, this is a placeholder as balance management may be handled differently in Hedera
      console.log('Balance update requested:', action.payload)
    },

    // Wallet state management
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload
      if (action.payload) {
        state.lastRefresh = Date.now()
      }
    },
    setSwitching: (state, action: PayloadAction<boolean>) => {
      state.switching = action.payload
    },
    updateLastRefresh: (state) => {
      state.lastRefresh = Date.now()
    },

    // Assets management
    updateWalletAssets: (state, action: PayloadAction<{ walletId: string; assets: any }>) => {
      const { walletId, assets } = action.payload
      state.walletsAccountsAssets[walletId] = assets
    },

    // Reset functionality
    resetWallet: () => initialState,
    clearWalletData: (state) => {
      state.wallets = {}
      state.walletsAccounts = {}
      state.walletsAccountsAssets = {}
      state.selectedWalletId = ''
      state.selectedAccountId = ''
    },
  },
})

export const {
  addWallet,
  updateWallet,
  removeWallet,
  selectWallet,
  addAccount,
  updateAccount,
  removeAccount,
  selectAccount,
  generateAccount,
  updateBalance,
  setRefreshing,
  setSwitching,
  updateLastRefresh,
  updateWalletAssets,
  resetWallet,
  clearWalletData,
} = walletSlice.actions

export default walletSlice.reducer
