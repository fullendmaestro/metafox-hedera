import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Typed hooks for React components
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Convenience hooks for specific slices
export const useMetaFox = () => useAppSelector((state) => state.metafox)
export const useApp = () => useAppSelector((state) => state.app)
export const useSettings = () => useAppSelector((state) => state.settings)
export const useWallet = () => useAppSelector((state) => state.wallet)

// Specific selector hooks for common use cases
export const useIsAuthenticated = () => useAppSelector((state) => state.app.authenticated)
export const useIsOnBoarded = () => useAppSelector((state) => state.app.onBoarded)
export const useSelectedWallet = () => {
  const { wallets, selectedWalletId } = useAppSelector((state) => state.wallet)
  return selectedWalletId ? wallets[selectedWalletId] : null
}

export const useSelectedAccount = () => {
  const { walletsAccounts, selectedWalletId, selectedAccountId } = useAppSelector(
    (state) => state.wallet,
  )
  if (!selectedWalletId || !selectedAccountId) return null
  return walletsAccounts[selectedWalletId]?.[selectedAccountId] || null
}

export const useWalletList = () => {
  const wallets = useAppSelector((state) => state.wallet.wallets)
  return Object.values(wallets)
}

export const useAccountsForWallet = (walletId: string) => {
  const accounts = useAppSelector((state) => state.wallet.walletsAccounts[walletId])
  return accounts ? Object.values(accounts) : []
}

export const useActiveChain = () => useAppSelector((state) => state.metafox.active_chain)
export const useSelectedNetwork = () => useAppSelector((state) => state.metafox.selected_network)
