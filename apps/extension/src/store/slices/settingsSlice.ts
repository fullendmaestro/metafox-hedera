import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState, PrivacySettings } from '../types'

const initialState: SettingsState = {
  baseCurrency: 'USD',
  openAsSidePanel: true,
  privacy: {
    hidePortfolioBalances: false,
    isAnalyticsEnabled: true,
  },
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload
    },
    setOpenAsSidePanel: (state, action: PayloadAction<boolean>) => {
      state.openAsSidePanel = action.payload
    },
    updatePrivacySettings: (state, action: PayloadAction<Partial<PrivacySettings>>) => {
      state.privacy = { ...state.privacy, ...action.payload }
    },
    setHidePortfolioBalances: (state, action: PayloadAction<boolean>) => {
      state.privacy.hidePortfolioBalances = action.payload
    },
    setAnalyticsEnabled: (state, action: PayloadAction<boolean>) => {
      state.privacy.isAnalyticsEnabled = action.payload
    },
    resetSettings: () => initialState,
  },
})

export const {
  setBaseCurrency,
  setOpenAsSidePanel,
  updatePrivacySettings,
  setHidePortfolioBalances,
  setAnalyticsEnabled,
  resetSettings,
} = settingsSlice.actions

export default settingsSlice.reducer
