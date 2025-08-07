// import { PrivateKey } from '@hashgraph/sdk'
// import { initCypherStorage, CipherStoreManager } from '@metafox/cipher-store'
// import { ChromeStorageLayer } from './storage'
// import { WALLETS } from '../const/storage-keys'
// import type { Wallet, Wallet as WalletType } from '../types/wallet'
// import type { Account } from '../types/wallet'
// import { SOURCETYPE } from '../types/wallet'
// import {
//   createMnemonic,
//   validateMnemonic,
//   derivePrivateKeyFromMnemonic,
//   getPublicKeyFromPrivateKey,
// } from './hedera'
// import { v4 as uuidv4 } from 'uuid'

// // Initialize cipher storage with Chrome storage layer
// const storageLayer = new ChromeStorageLayer()
// initCypherStorage(storageLayer)

// export class WalletManager {
//   private static instance: WalletManager
//   private wallets: WalletType[] = []

//   private constructor() {
//     this.loadWallets()
//   }

//   public static getInstance(): WalletManager {
//     if (!WalletManager.instance) {
//       WalletManager.instance = new WalletManager()
//     }
//     return WalletManager.instance
//   }

//   /**
//    * Load wallets from storage
//    */
//   private async loadWallets(): Promise<void> {
//     try {
//       const walletsData = await chrome.storage.local.get([WALLETS])
//       this.wallets = walletsData[WALLETS] || []
//     } catch (error) {
//       console.error('Failed to load wallets:', error)
//       this.wallets = []
//     }
//   }

//   /**
//    * Save wallets to storage
//    */
//   private async saveWallets(): Promise<void> {
//     try {
//       await chrome.storage.local.set({ [WALLETS]: this.wallets })
//     } catch (error) {
//       console.error('Failed to save wallets:', error)
//       throw error
//     }
//   }

//   /**
//    * Create a new wallet from mnemonic
//    * @param mnemonic The mnemonic phrase
//    * @param password The password to encrypt the wallet
//    * @param walletName Optional wallet name
//    * @param accountIndexes Array of account indexes to derive (default: [0])
//    * @returns Promise that resolves to the created wallet
//    */
//   public async createWalletFromMnemonic(
//     mnemonic: string,
//     password: string,
//     walletName: string = 'Main Wallet',
//     accountIndexes: number[] = [0],
//   ): Promise<WalletType> {
//     try {
//       // Validate mnemonic
//       if (!validateMnemonic(mnemonic)) {
//         throw new Error('Invalid mnemonic phrase')
//       }

//       // Store encrypted mnemonic in cipher store
//       const cipherResult = await CipherStoreManager.addEntry({
//         data: JSON.stringify({ mnemonic, type: 'seed_phrase' }),
//         password,
//       })

//       // Generate accounts from mnemonic
//       const accounts: Account[] = []
//       for (const index of accountIndexes) {
//         const privateKey = derivePrivateKeyFromMnemonic(mnemonic, index)
//         const { publicKeyString } = getPublicKeyFromPrivateKey(await privateKey)

//         const account: Account = {
//           id: uuidv4(),
//           name: `Account ${index + 1}`,
//           address: publicKeyString, // This will be the public key until account is created on Hedera
//           source: {
//             sourceType: SOURCETYPE.SEED_PHRASE,
//             seedIndex: index,
//           },
//           createdAt: Date.now(),
//         }
//         accounts.push(account)
//       }

//       // Create wallet object
//       const wallet: Wallet = {
//         id: uuidv4(),
//         name: walletName,
//         accounts,
//         type: SOURCETYPE.SEED_PHRASE,
//         cipherStoreID: cipherResult.entryID,
//         createdAt: Date.now(),
//         avatarIndex: Math.floor(Math.random() * 10), // Random avatar
//       }

//       // Add to wallets array and save
//       this.wallets.push(wallet)
//       await this.saveWallets()

//       return wallet
//     } catch (error) {
//       console.error('Failed to create wallet from mnemonic:', error)
//       throw error
//     }
//   }

//   /**
//    * Import wallet from private key
//    * @param privateKeyString The private key string
//    * @param password The password to encrypt the wallet
//    * @param walletName Optional wallet name
//    * @returns Promise that resolves to the created wallet
//    */
//   public async importWalletFromPrivateKey(
//     privateKeyString: string,
//     password: string,
//     walletName: string = 'Imported Wallet',
//   ): Promise<Wallet> {
//     try {
//       // Validate private key
//       const privateKey = PrivateKey.fromString(privateKeyString)
//       const { publicKeyString } = getPublicKeyFromPrivateKey(privateKey)

//       // Store encrypted private key in cipher store
//       const cipherResult = await CipherStoreManager.addEntry({
//         data: JSON.stringify({ privateKey: privateKeyString, type: 'private_key' }),
//         password,
//       })

//       // Create account
//       const account: Account = {
//         id: uuidv4(),
//         name: 'Imported Account',
//         address: publicKeyString,
//         source: {
//           sourceType: SOURCETYPE.PRIVATE_KEY_IMPORT,
//         },
//         createdAt: Date.now(),
//       }

//       // Create wallet object
//       const wallet: Wallet = {
//         id: uuidv4(),
//         name: walletName,
//         accounts: [account],
//         type: SOURCETYPE.PRIVATE_KEY_IMPORT,
//         cipherStoreID: cipherResult.entryID,
//         createdAt: Date.now(),
//         avatarIndex: Math.floor(Math.random() * 10),
//       }

//       // Add to wallets array and save
//       this.wallets.push(wallet)
//       await this.saveWallets()

//       return wallet
//     } catch (error) {
//       console.error('Failed to import wallet from private key:', error)
//       throw error
//     }
//   }

//   /**
//    * Get all wallets
//    * @returns Array of wallets
//    */
//   public getWallets(): WalletType[] {
//     return [...this.wallets]
//   }

//   /**
//    * Get wallet by ID
//    * @param walletId The wallet ID
//    * @returns Wallet or undefined
//    */
//   public getWallet(walletId: string): WalletType | undefined {
//     return this.wallets.find((wallet) => wallet.id === walletId)
//   }

//   /**
//    * Get account by ID
//    * @param accountId The account ID
//    * @returns Object with wallet and account or undefined
//    */
//   public getAccount(accountId: string): { wallet: WalletType; account: Account } | undefined {
//     for (const wallet of this.wallets) {
//       const account = wallet.accounts.find((acc) => acc.id === accountId)
//       if (account) {
//         return { wallet, account }
//       }
//     }
//     return undefined
//   }

//   /**
//    * Delete wallet
//    * @param walletId The wallet ID to delete
//    * @returns Promise that resolves when wallet is deleted
//    */
//   public async deleteWallet(walletId: string): Promise<void> {
//     try {
//       const walletIndex = this.wallets.findIndex((wallet) => wallet.id === walletId)
//       if (walletIndex === -1) {
//         throw new Error('Wallet not found')
//       }

//       // Remove wallet from array
//       this.wallets.splice(walletIndex, 1)
//       await this.saveWallets()
//     } catch (error) {
//       console.error('Failed to delete wallet:', error)
//       throw error
//     }
//   }

//   /**
//    * Update wallet name
//    * @param walletId The wallet ID
//    * @param newName The new wallet name
//    * @returns Promise that resolves when wallet is updated
//    */
//   public async updateWalletName(walletId: string, newName: string): Promise<void> {
//     try {
//       const wallet = this.getWallet(walletId)
//       if (!wallet) {
//         throw new Error('Wallet not found')
//       }

//       wallet.name = newName
//       await this.saveWallets()
//     } catch (error) {
//       console.error('Failed to update wallet name:', error)
//       throw error
//     }
//   }

//   /**
//    * Add account to existing wallet (for mnemonic-based wallets)
//    * @param walletId The wallet ID
//    * @param accountIndex The account index to derive
//    * @param accountName Optional account name
//    * @returns Promise that resolves to the new account
//    */
//   public async addAccountToWallet(
//     walletId: string,
//     accountIndex: number,
//     accountName?: string,
//   ): Promise<Account> {
//     try {
//       const wallet = this.getWallet(walletId)
//       if (!wallet) {
//         throw new Error('Wallet not found')
//       }

//       if (wallet.type !== SOURCETYPE.SEED_PHRASE) {
//         throw new Error('Can only add accounts to mnemonic-based wallets')
//       }

//       // Check if account index already exists
//       const existingAccount = wallet.accounts.find((acc) => acc.source.seedIndex === accountIndex)
//       if (existingAccount) {
//         throw new Error('Account with this index already exists')
//       }

//       // For now, we need the password to decrypt the mnemonic
//       // This would typically be provided by the user or stored securely
//       // TODO: Implement proper password handling
//       throw new Error('Adding accounts requires password - implement password handling')
//     } catch (error) {
//       console.error('Failed to add account to wallet:', error)
//       throw error
//     }
//   }

//   /**
//    * Check if any wallets exist
//    * @returns True if wallets exist
//    */
//   public hasWallets(): boolean {
//     return this.wallets.length > 0
//   }

//   /**
//    * Get the first wallet (primary wallet)
//    * @returns First wallet or undefined
//    */
//   public getPrimaryWallet(): WalletType | undefined {
//     return this.wallets[0]
//   }
// }

// // Export singleton instance
// export const walletManager = WalletManager.getInstance()

// // // Legacy compatibility - keeping the Wallet class for existing code
// // export class WalletLegacy {
// //   static async importMnemonicAccounts({
// //     mnemonic,
// //     password,
// //     selectedAddressIndexes = [0],
// //   }: {
// //     mnemonic: string
// //     password: Uint8Array
// //     selectedAddressIndexes: number[]
// //   }): Promise<WalletType> {
// //     // Convert Uint8Array password to string
// //     const passwordString = new TextDecoder().decode(password)

// //     return walletManager.createWalletFromMnemonic(
// //       mnemonic,
// //       passwordString,
// //       'Main Wallet',
// //       selectedAddressIndexes,
// //     )
// //   }
// // }
