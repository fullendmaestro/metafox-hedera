import { store } from '../store'
import { getStorageSyncManager } from '../utils/storageSyncManager'

console.log('MetaFox-Hedera background script starting...')

// Initialize the store synchronization with Chrome storage
async function initializeBackground() {
  try {
    const syncManager = getStorageSyncManager(store)
    await syncManager.initialize()
    console.log('Background script initialized successfully')
  } catch (error) {
    console.error('Failed to initialize background script:', error)
  }
}

// Initialize when the service worker starts
initializeBackground()

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('MetaFox-Hedera extension installed:', details.reason)

  if (details.reason === 'install') {
    // First time installation
    console.log('First time installation detected')
  } else if (details.reason === 'update') {
    // Extension update
    console.log('Extension updated from version:', details.previousVersion)
  }
})

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background script received message:', message)

  // Handle different message types
  switch (message.type) {
    case 'STORE_ACTION':
      // Dispatch action to store
      store.dispatch(message.action)
      sendResponse({ success: true })
      break

    case 'GET_STORE_STATE':
      // Return current store state
      sendResponse({ state: store.getState() })
      break

    default:
      sendResponse({ error: 'Unknown message type' })
  }

  return true // Keep message channel open for async responses
})

// Handle storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('Chrome storage changed:', { changes, areaName })
})

// Cleanup on shutdown
self.addEventListener('beforeunload', () => {
  console.log('Background script shutting down')
})
