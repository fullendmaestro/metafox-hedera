import {
  Mnemonic,
  PrivateKey,
  AccountId,
  Client,
  AccountCreateTransaction,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
} from '@hashgraph/sdk'

/**
 * Generate a new mnemonic seed phrase
 * @param wordCount Number of words in the mnemonic (12 or 24)
 * @returns Mnemonic string
 */
export const createMnemonic = async (wordCount: 12 | 24 = 12): Promise<string> => {
  const mnemonic = wordCount === 24 ? await Mnemonic.generate() : await Mnemonic.generate12()
  return mnemonic.toString()
}

/**
 * Validate a mnemonic seed phrase
 * @param mnemonicString The mnemonic string to validate
 * @returns True if valid, false otherwise
 */
export const validateMnemonic = (mnemonicString: string): boolean => {
  try {
    Mnemonic.fromString(mnemonicString)
    return true
  } catch (error) {
    console.error('Invalid mnemonic:', error)
    return false
  }
}

/**
 * Derive a private key from mnemonic at specific index
 * @param mnemonicString The mnemonic string
 * @param index The derivation index (default: 0)
 * @returns PrivateKey instance
 */
export const derivePrivateKeyFromMnemonic = async (
  mnemonicString: string,
  index: number = 0,
): Promise<PrivateKey> => {
  const mnemonic = await Mnemonic.fromString(mnemonicString)
  return mnemonic.toStandardEd25519PrivateKey(undefined, index)
}

/**
 * Get public key and account ID from private key
 * @param privateKey The private key
 * @returns Object with publicKey and potential accountId
 */
export const getPublicKeyFromPrivateKey = (privateKey: PrivateKey) => {
  const publicKey = privateKey.publicKey
  return {
    publicKey,
    publicKeyString: publicKey.toString(),
    // Note: Account ID is assigned when account is created on Hedera
    // This is a placeholder for the account creation process
  }
}

/**
 * Create a Hedera client for testnet
 * @returns Hedera Client instance
 */
export const createHederaClient = (): Client => {
  // Using testnet for development
  return Client.forTestnet()
}

/**
 * Create a Hedera client for mainnet
 * @returns Hedera Client instance
 */
export const createHederaMainnetClient = (): Client => {
  return Client.forMainnet()
}

/**
 * Validate a Hedera account ID
 * @param accountIdString The account ID string to validate
 * @returns True if valid, false otherwise
 */
export const validateHederaAccountId = (accountIdString: string): boolean => {
  try {
    AccountId.fromString(accountIdString)
    return true
  } catch (error) {
    console.error('Invalid Hedera account ID:', error)
    return false
  }
}

/**
 * Format HBAR amount for display
 * @param hbarAmount Amount in HBAR
 * @returns Formatted string
 */
export const formatHbarAmount = (hbarAmount: number): string => {
  return `${hbarAmount.toLocaleString()} HBAR`
}

/**
 * Convert HBAR to tinybars
 * @param hbarAmount Amount in HBAR
 * @returns Amount in tinybars
 */
export const hbarToTinybars = (hbarAmount: number): number => {
  return Math.floor(hbarAmount * 100_000_000) // 1 HBAR = 100,000,000 tinybars
}

/**
 * Convert tinybars to HBAR
 * @param tinybars Amount in tinybars
 * @returns Amount in HBAR
 */
export const tinybarsToHbar = (tinybars: number): number => {
  return tinybars / 100_000_000
}
