import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AuthenticatePayload, UpdateNetworkPayload } from '../types'

const initialState: AppState = {
  authenticated: false,
  passwordCypherStoreId: null,
  authenticating: false,
  onBoarded: false,
  selected_network: 'testnet',
  autoLockTimeOut: 10,
  openAsSidePanel: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<AuthenticatePayload>) => {
      state.authenticated = action.payload.authenticated
      state.authenticating = false
    },
    setPasswordCypherStoreId: (state, action: PayloadAction<string | null>) => {
      state.passwordCypherStoreId = action.payload
    },
    setAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.authenticating = action.payload
    },
    setOnBoarded: (state, action: PayloadAction<boolean>) => {
      state.onBoarded = action.payload
    },
    setAutoLockTimeOut: (state, action: PayloadAction<number>) => {
      state.autoLockTimeOut = action.payload
    },
    setOpenedAsSidePanel: (state, action: PayloadAction<boolean>) => {
      state.openAsSidePanel = action.payload
    },
    toggleSidePanel: (state) => {
      state.openAsSidePanel = !state.openAsSidePanel
    },
    updateSelectedNetwork: (state, action: PayloadAction<UpdateNetworkPayload>) => {
      state.selected_network = action.payload.network
    },
    resetMetaFox: () => initialState,
    resetApp: () => initialState,
  },
})

export const {
  setAuthenticated,
  setPasswordCypherStoreId,
  setAuthenticating,
  setOnBoarded,
  setAutoLockTimeOut,
  setOpenedAsSidePanel,
  toggleSidePanel,
  resetApp,
} = appSlice.actions

export default appSlice.reducer
