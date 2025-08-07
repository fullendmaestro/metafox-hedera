import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { localStorage } from 'redux-persist-webextension-storage'

import type { RootState } from './types'

// Import slices
import appReducer from './slices/appSlice'
import settingsReducer from './slices/settingsSlice'
import walletReducer from './slices/walletSlice'

// Root persist config
const rootPersistConfig = {
  key: 'appStore',
  storage: localStorage,
}

// Combine reducers (no per-slice persistReducer)
const rootReducer = combineReducers({
  app: appReducer,
  settings: settingsReducer,
  wallet: walletReducer,
})

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

// Create persistor
export const persistor = persistStore(store)

// Export types
export type AppDispatch = typeof store.dispatch
export type { RootState }

// Export hooks for React components
export const selectApp = (state: RootState) => state.app
export const selectSettings = (state: RootState) => state.settings
export const selectWallet = (state: RootState) => state.wallet
