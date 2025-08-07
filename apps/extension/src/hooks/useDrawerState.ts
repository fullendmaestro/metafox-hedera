import { useState } from 'react'

export const useDrawerState = () => {
  const [showSelectWallet, setShowSelectWallet] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [showConnectedApps, setShowConnectedApps] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  // New drawer states for more options
  const [showAddressBook, setShowAddressBook] = useState(false)
  const [showColorMode, setShowColorMode] = useState(false)
  const [showCurrency, setShowCurrency] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)

  const openSelectWallet = () => setShowSelectWallet(true)
  const closeSelectWallet = () => setShowSelectWallet(false)

  const openAIAssistant = () => setShowAIAssistant(true)
  const closeAIAssistant = () => setShowAIAssistant(false)

  const openConnectedApps = () => setShowConnectedApps(true)
  const closeConnectedApps = () => setShowConnectedApps(false)

  const openMoreOptions = () => setShowMoreOptions(true)
  const closeMoreOptions = () => setShowMoreOptions(false)

  // New drawer actions
  const openAddressBook = () => setShowAddressBook(true)
  const closeAddressBook = () => setShowAddressBook(false)

  const openColorMode = () => setShowColorMode(true)
  const closeColorMode = () => setShowColorMode(false)

  const openCurrency = () => setShowCurrency(true)
  const closeCurrency = () => setShowCurrency(false)

  const openNetwork = () => setShowNetwork(true)
  const closeNetwork = () => setShowNetwork(false)

  return {
    // State
    showSelectWallet,
    showAIAssistant,
    showConnectedApps,
    showMoreOptions,
    showAddressBook,
    showColorMode,
    showCurrency,
    showNetwork,

    // Actions
    openSelectWallet,
    closeSelectWallet,
    openAIAssistant,
    closeAIAssistant,
    openConnectedApps,
    closeConnectedApps,
    openMoreOptions,
    closeMoreOptions,
    openAddressBook,
    closeAddressBook,
    openColorMode,
    closeColorMode,
    openCurrency,
    closeCurrency,
    openNetwork,
    closeNetwork,
  }
}
