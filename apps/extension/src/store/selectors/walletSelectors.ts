/**
 * Redux selectors for the wallet state
 *
 * These selectors provide convenient access to wallet and account data
 * with proper typing and memoization.
 */

import { createSelector } from '@reduxjs/toolkit'
import type { RootState, WalletAccount, Wallet } from '../types'

// Base selectors
export const selectWalletState = (state: RootState) => state.wallet

export const selectWallets = (state: RootState) => state.wallet.wallets
export const selectWalletsAccounts = (state: RootState) => state.wallet.walletsAccounts
export const selectSelectedWalletId = (state: RootState) => state.wallet.selectedWalletId
export const selectSelectedAccountId = (state: RootState) => state.wallet.selectedAccountId
export const selectIsRefreshing = (state: RootState) => state.wallet.refreshing
export const selectIsSwitching = (state: RootState) => state.wallet.switching

// Computed selectors
export const selectSelectedWallet = createSelector(
  [selectWallets, selectSelectedWalletId],
  (wallets, selectedWalletId): Wallet | null => {
    return selectedWalletId ? wallets[selectedWalletId] || null : null
  },
)

export const selectSelectedAccount = createSelector(
  [selectWalletsAccounts, selectSelectedWalletId, selectSelectedAccountId],
  (walletsAccounts, selectedWalletId, selectedAccountId): WalletAccount | null => {
    if (!selectedWalletId || !selectedAccountId) return null
    return walletsAccounts[selectedWalletId]?.[selectedAccountId] || null
  },
)

export const selectWalletAccounts = createSelector(
  [selectWalletsAccounts, selectSelectedWalletId],
  (walletsAccounts, selectedWalletId): WalletAccount[] => {
    if (!selectedWalletId) return []
    return Object.values(walletsAccounts[selectedWalletId] || {})
  },
)

export const selectAccountsByWalletId = createSelector(
  [selectWalletsAccounts, (_state: RootState, walletId: string) => walletId],
  (walletsAccounts, walletId): WalletAccount[] => {
    return Object.values(walletsAccounts[walletId] || {})
  },
)

export const selectWalletById = createSelector(
  [selectWallets, (_state: RootState, walletId: string) => walletId],
  (wallets, walletId): Wallet | null => {
    return wallets[walletId] || null
  },
)

export const selectAccountById = createSelector(
  [
    selectWalletsAccounts,
    (_state: RootState, walletId: string) => walletId,
    (_state: RootState, _walletId: string, accountId: string) => accountId,
  ],
  (walletsAccounts, walletId, accountId): WalletAccount | null => {
    return walletsAccounts[walletId]?.[accountId] || null
  },
)

// Utility selectors
export const selectAllWallets = createSelector([selectWallets], (wallets): Wallet[] =>
  Object.values(wallets),
)

export const selectAllAccounts = createSelector(
  [selectWalletsAccounts],
  (walletsAccounts): WalletAccount[] => {
    return Object.values(walletsAccounts).flatMap((accounts) => Object.values(accounts))
  },
)

export const selectSeedWallets = createSelector([selectAllWallets], (wallets): Wallet[] =>
  wallets.filter((wallet) => wallet.type === 0),
)

export const selectImportedWallets = createSelector([selectAllWallets], (wallets): Wallet[] =>
  wallets.filter((wallet) => wallet.type === 1),
)

export const selectCanGenerateMoreAccounts = createSelector(
  [selectSelectedWallet],
  (selectedWallet): boolean => {
    return selectedWallet ? selectedWallet.type === 0 : false
  },
)

export const selectWalletCount = createSelector(
  [selectWallets],
  (wallets): number => Object.keys(wallets).length,
)

export const selectAccountCount = createSelector(
  [selectWalletsAccounts, selectSelectedWalletId],
  (walletsAccounts, selectedWalletId): number => {
    if (!selectedWalletId) return 0
    return Object.keys(walletsAccounts[selectedWalletId] || {}).length
  },
)
