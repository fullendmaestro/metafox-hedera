/**
 * Wallet management hooks and utilities
 *
 * This module provides React hooks for interacting with the wallet store
 * and performing common wallet operations.
 */

import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import {
  generateAccount,
  addWallet,
  removeAccount,
  selectWallet,
  selectAccount,
  type WalletAccount,
  type Wallet,
} from '../store'
import {
  selectSelectedWallet,
  selectSelectedAccount,
  selectWalletAccounts,
  selectCanGenerateMoreAccounts,
  selectAllWallets,
} from '../store/selectors'
import {
  getNextDerivationIndex,
  generateAccountId,
  createDefaultAccountName,
  createSeedAccountSource,
} from '../utils/hederaKeyDerivation'
import { derivePrivateKeyFromMnemonic, getPublicKeyFromPrivateKey } from '../utils/hedera'
import { CipherStoreManager } from '@metafox/cipher-store'

/**
 * Hook for wallet management operations
 */
export function useWalletManager() {
  const dispatch = useAppDispatch()
  const selectedWallet = useAppSelector(selectSelectedWallet)
  const selectedAccount = useAppSelector(selectSelectedAccount)
  const walletAccounts = useAppSelector(selectWalletAccounts)
  const canGenerateMore = useAppSelector(selectCanGenerateMoreAccounts)
  const allWallets = useAppSelector(selectAllWallets)

  /**
   * Generate a new account from the current wallet's seed phrase
   */
  const generateNewAccount = useCallback(
    async (_password: Uint8Array, customName?: string): Promise<WalletAccount | null> => {
      if (!selectedWallet || !canGenerateMore) {
        console.error(
          'Cannot generate account: no selected wallet or wallet cannot generate more accounts',
        )
        return null
      }

      try {
        // TODO: Add getEntry method to CipherStoreManager
        // Get the mnemonic from cipher store
        // const mnemonicData = await CipherStoreManager.getEntry(selectedWallet.cipherStoreID, _password)
        // const mnemonic = JSON.parse(mnemonicData.data)

        // For now, using a placeholder - this needs to be implemented
        console.warn('CipherStoreManager.getEntry not yet implemented')

        // Determine the next derivation index
        const nextIndex = getNextDerivationIndex(walletAccounts)

        // Generate account
        const accountId = generateAccountId()
        // const privateKey = await derivePrivateKeyFromMnemonic(mnemonic, nextIndex)
        // const { publicKeyString } = getPublicKeyFromPrivateKey(privateKey)

        const newAccount: WalletAccount = {
          address: 'placeholder-address', // Will be replaced with real address
          createdAt: Date.now(),
          id: accountId,
          name: customName || createDefaultAccountName(nextIndex),
          source: createSeedAccountSource(nextIndex),
        }

        // Dispatch the action to add the account
        dispatch(
          generateAccount({
            walletId: selectedWallet.id,
            account: newAccount,
          }),
        )

        return newAccount
      } catch (error) {
        console.error('Failed to generate new account:', error)
        return null
      }
    },
    [selectedWallet, canGenerateMore, walletAccounts, dispatch],
  )

  /**
   * Select a wallet and optionally an account
   */
  const selectWalletAndAccount = useCallback(
    (walletId: string, accountId?: string) => {
      dispatch(selectWallet({ walletId }))
      if (accountId) {
        dispatch(selectAccount({ accountId }))
      }
    },
    [dispatch],
  )

  /**
   * Remove an account from a wallet
   */
  const deleteAccount = useCallback(
    (walletId: string, accountId: string) => {
      dispatch(removeAccount({ walletId, accountId }))
    },
    [dispatch],
  )

  /**
   * Import a wallet from mnemonic
   */
  const importWalletFromMnemonic = useCallback(
    async (mnemonic: string, password: Uint8Array, walletName: string): Promise<Wallet | null> => {
      try {
        // Store the mnemonic securely
        const { entryID: mnemonicStoreId } = await CipherStoreManager.addEntry({
          data: JSON.stringify(mnemonic),
          password,
        })

        // Generate first account
        const accountId = generateAccountId()
        const privateKey = await derivePrivateKeyFromMnemonic(mnemonic, 0)
        const { publicKeyString } = getPublicKeyFromPrivateKey(privateKey)

        const account: WalletAccount = {
          address: publicKeyString,
          createdAt: Date.now(),
          id: accountId,
          name: 'Account 1',
          source: createSeedAccountSource(0),
        }

        // Create wallet
        const wallet: Wallet = {
          accounts: [account],
          avatarIndex: Math.floor(Math.random() * 10),
          cipherStoreID: mnemonicStoreId,
          createdAt: Date.now(),
          id: crypto.randomUUID(),
          name: walletName,
          type: 0, // Mnemonic wallet
        }

        dispatch(addWallet({ wallet }))
        return wallet
      } catch (error) {
        console.error('Failed to import wallet from mnemonic:', error)
        return null
      }
    },
    [dispatch],
  )

  return {
    // State
    selectedWallet,
    selectedAccount,
    walletAccounts,
    canGenerateMore,
    allWallets,

    // Actions
    generateNewAccount,
    selectWalletAndAccount,
    deleteAccount,
    importWalletFromMnemonic,
  }
}

/**
 * Hook for wallet selection state
 */
export function useWalletSelection() {
  const selectedWallet = useAppSelector(selectSelectedWallet)
  const selectedAccount = useAppSelector(selectSelectedAccount)
  const walletAccounts = useAppSelector(selectWalletAccounts)

  return {
    selectedWallet,
    selectedAccount,
    walletAccounts,
    hasWallet: !!selectedWallet,
    hasAccount: !!selectedAccount,
  }
}
