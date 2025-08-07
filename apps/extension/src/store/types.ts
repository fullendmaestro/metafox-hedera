// Redux store types based on the storage model
export interface AppState {
  authenticated: boolean
  selected_network: 'testnet' | 'mainnet'
  authenticating: boolean
  passwordCypherStoreId: string | null
  onBoarded: boolean
  autoLockTimeOut: number
  openAsSidePanel: boolean
}

export interface PrivacySettings {
  hidePortfolioBalances: boolean
  isAnalyticsEnabled: boolean
}

export interface SettingsState {
  baseCurrency: string
  openAsSidePanel: boolean
  privacy: PrivacySettings
}

export interface BandwidthEnergy {
  amount: string
  limit: string
}

export interface AssetItem {
  address: string
  coin: number
  publicKey: string
}

export interface AccountCoin {
  balance: string
  bandwidth: BandwidthEnergy
  blockchainId: string
  blocked: string
  claimable: string
  coinId: number
  energy: BandwidthEnergy
  frozen: string
  pending: string
  reserved: string
  rewards: string
  staked: string
}

export interface AccountSource {
  seedIndex: number
  sourceType: number // 0 for seed phrase, 1 for private key import
}

export interface WalletAccount {
  address: string
  createdAt: number
  id: string
  name: string
  source: AccountSource
}

export interface Wallet {
  accounts: WalletAccount[]
  avatarIndex: number
  cipherStoreID: string
  createdAt: number
  id: string
  name: string
  type: number // 0 for mnemonic, 1 for private key
}

export interface WalletState {
  selectedWalletId: string
  selectedAccountId: string
  lastRefresh: number
  refreshing: boolean
  switching: boolean
  wallets: { [key: string]: Wallet }
  walletsAccounts: { [walletId: string]: { [accountId: string]: WalletAccount } }
  walletsAccountsAssets: { [key: string]: any }
}

export interface RootState {
  app: AppState
  settings: SettingsState
  wallet: WalletState
}

// Action payload types
export interface UpdateNetworkPayload {
  network: 'testnet' | 'mainnet'
}

export interface AuthenticatePayload {
  authenticated: boolean
}

export interface UpdateWalletPayload {
  walletId: string
  wallet: Partial<Wallet>
}

export interface AddWalletPayload {
  wallet: Wallet
}

export interface RemoveWalletPayload {
  walletId: string
}

export interface UpdateAccountPayload {
  walletId: string
  accountId: string
  account: Partial<WalletAccount>
}

export interface AddAccountPayload {
  walletId: string
  account: WalletAccount
}

export interface UpdateBalancePayload {
  walletId: string
  accountId: string
  coinId: string
  balance: string
}

export interface SelectWalletPayload {
  walletId: string
}

export interface SelectAccountPayload {
  accountId: string
}
