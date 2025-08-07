/**
 * Hedera key derivation utilities
 *
 * This module provides utilities for managing Hedera key derivation paths
 * and account generation from seed phrases.
 */

import type { AccountSource, WalletAccount } from '../store/types'

/**
 * Gets the next available derivation index for a wallet
 */
export function getNextDerivationIndex(accounts: WalletAccount[]): number {
  if (!accounts || accounts.length === 0) {
    return 0
  }

  const usedIndexes = accounts
    .filter((account) => account.source.sourceType === 0) // Only seed-based accounts
    .map((account) => account.source.seedIndex)
    .sort((a, b) => a - b)

  // Find the next available index
  let nextIndex = 0
  for (const index of usedIndexes) {
    if (index === nextIndex) {
      nextIndex++
    } else {
      break
    }
  }

  return nextIndex
}

/**
 * Creates a new account source for seed-based derivation
 */
export function createSeedAccountSource(seedIndex: number): AccountSource {
  return {
    seedIndex,
    sourceType: 0, // 0 for seed phrase
  }
}

/**
 * Creates a new account source for private key import
 */
export function createPrivateKeyAccountSource(): AccountSource {
  return {
    seedIndex: -1, // -1 indicates not from seed
    sourceType: 1, // 1 for private key import
  }
}

/**
 * Generates a unique account ID
 */
export function generateAccountId(): string {
  return crypto.randomUUID()
}

/**
 * Creates a default account name based on derivation index
 */
export function createDefaultAccountName(seedIndex: number): string {
  return `Account ${seedIndex + 1}`
}

/**
 * Checks if an account can generate additional accounts (seed-based wallet)
 */
export function canGenerateMoreAccounts(walletType: number): boolean {
  return walletType === 0 // Only mnemonic wallets can generate more accounts
}

/**
 * Gets the derivation path for Hedera accounts
 * Following BIP-44 standard: m/44'/3030'/account'/0/0
 */
export function getHederaDerivationPath(accountIndex: number): string {
  return `m/44'/3030'/${accountIndex}'/0/0`
}
