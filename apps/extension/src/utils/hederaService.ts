import {
  Client,
  AccountCreateTransaction,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountId,
  TokenAssociateTransaction,
  TokenId,
  AccountInfoQuery,
  TransactionRecord,
  Status,
} from '@hashgraph/sdk'
import { createHederaClient, createHederaMainnetClient } from './hedera'

export interface HederaAccount {
  accountId: string
  balance: number // in HBAR
  publicKey: string
}

export interface TransactionResult {
  transactionId: string
  status: Status
  receipt?: any
}

export class HederaService {
  private client: Client
  private isMainnet: boolean

  constructor(isMainnet: boolean = false) {
    this.isMainnet = isMainnet
    this.client = isMainnet ? createHederaMainnetClient() : createHederaClient()
  }

  /**
   * Create a new Hedera account
   * @param initialBalance Initial balance in HBAR
   * @param operatorAccountId Operator account ID (for paying fees)
   * @param operatorPrivateKey Operator private key
   * @returns Promise that resolves to new account info
   */
  async createAccount(
    initialBalance: number,
    operatorAccountId: string,
    operatorPrivateKey: string,
  ): Promise<HederaAccount> {
    try {
      // Set operator
      this.client.setOperator(operatorAccountId, operatorPrivateKey)

      // Generate new key pair for the account
      const newAccountPrivateKey = PrivateKey.generateED25519()
      const newAccountPublicKey = newAccountPrivateKey.publicKey

      // Create the account
      const transaction = new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(new Hbar(initialBalance))

      const txResponse = await transaction.execute(this.client)
      const receipt = await txResponse.getReceipt(this.client)
      const newAccountId = receipt.accountId!

      return {
        accountId: newAccountId.toString(),
        balance: initialBalance,
        publicKey: newAccountPublicKey.toString(),
      }
    } catch (error) {
      console.error('Failed to create Hedera account:', error)
      throw error
    }
  }

  /**
   * Get account balance
   * @param accountId The account ID to query
   * @returns Promise that resolves to balance in HBAR
   */
  async getAccountBalance(accountId: string): Promise<number> {
    try {
      const balance = await new AccountBalanceQuery().setAccountId(accountId).execute(this.client)

      return balance.hbars.toTinybars().toNumber() / 100_000_000 // Convert to HBAR
    } catch (error) {
      console.error('Failed to get account balance:', error)
      throw error
    }
  }

  /**
   * Get account information
   * @param accountId The account ID to query
   * @returns Promise that resolves to account info
   */
  async getAccountInfo(accountId: string): Promise<any> {
    try {
      const accountInfo = await new AccountInfoQuery().setAccountId(accountId).execute(this.client)

      return {
        accountId: accountInfo.accountId.toString(),
        balance: accountInfo.balance.toTinybars().toNumber() / 100_000_000,
        publicKey: accountInfo.key?.toString(),
        isDeleted: accountInfo.isDeleted,
        autoRenewPeriod: accountInfo.autoRenewPeriod?.seconds?.toString(),
        memo: accountInfo.accountMemo,
      }
    } catch (error) {
      console.error('Failed to get account info:', error)
      throw error
    }
  }

  /**
   * Transfer HBAR between accounts
   * @param fromAccountId Sender account ID
   * @param fromPrivateKey Sender private key
   * @param toAccountId Recipient account ID
   * @param amount Amount in HBAR
   * @returns Promise that resolves to transaction result
   */
  async transferHbar(
    fromAccountId: string,
    fromPrivateKey: string,
    toAccountId: string,
    amount: number,
  ): Promise<TransactionResult> {
    try {
      // Set operator
      this.client.setOperator(fromAccountId, fromPrivateKey)

      // Create transfer transaction
      const transaction = new TransferTransaction()
        .addHbarTransfer(fromAccountId, new Hbar(-amount))
        .addHbarTransfer(toAccountId, new Hbar(amount))

      const txResponse = await transaction.execute(this.client)
      const receipt = await txResponse.getReceipt(this.client)

      return {
        transactionId: txResponse.transactionId.toString(),
        status: receipt.status,
        receipt,
      }
    } catch (error) {
      console.error('Failed to transfer HBAR:', error)
      throw error
    }
  }

  /**
   * Associate account with HTS token
   * @param accountId Account ID to associate
   * @param accountPrivateKey Account private key
   * @param tokenId Token ID to associate
   * @returns Promise that resolves to transaction result
   */
  async associateToken(
    accountId: string,
    accountPrivateKey: string,
    tokenId: string,
  ): Promise<TransactionResult> {
    try {
      // Set operator
      this.client.setOperator(accountId, accountPrivateKey)

      // Create token association transaction
      const transaction = new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([TokenId.fromString(tokenId)])

      const txResponse = await transaction.execute(this.client)
      const receipt = await txResponse.getReceipt(this.client)

      return {
        transactionId: txResponse.transactionId.toString(),
        status: receipt.status,
        receipt,
      }
    } catch (error) {
      console.error('Failed to associate token:', error)
      throw error
    }
  }

  /**
   * Get transaction record
   * @param transactionId Transaction ID to query
   * @returns Promise that resolves to transaction record
   */
  async getTransactionRecord(transactionId: string): Promise<TransactionRecord> {
    try {
      // Implementation would require parsing transaction ID properly
      // This is a placeholder for the actual implementation
      throw new Error('Transaction record query not implemented yet')
    } catch (error) {
      console.error('Failed to get transaction record:', error)
      throw error
    }
  }

  /**
   * Close the client connection
   */
  close(): void {
    this.client.close()
  }

  /**
   * Get network (testnet/mainnet)
   */
  getNetwork(): string {
    return this.isMainnet ? 'mainnet' : 'testnet'
  }
}

// Export singleton instances
export const hederaTestnetService = new HederaService(false)
export const hederaMainnetService = new HederaService(true)
