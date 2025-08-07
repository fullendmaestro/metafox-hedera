import { initCypherStorage } from '@metafox/cipher-store'
import { ChromeStorageLayer } from '@/utils/storage'

/**
 * Initialize the application
 * This function should be called when the extension starts
 */
export const initializeApp = async () => {
  try {
    console.log('Initializing MetaFox-Hedera...')

    // Initialize cipher storage with Chrome storage layer
    const storageLayer = new ChromeStorageLayer()
    initCypherStorage(storageLayer)

    console.log('Cipher storage initialized')

    // TODO: Add other initialization tasks here
    // - Check for existing wallets
    // - Initialize Hedera client
    // - Set up background scripts

    console.log('MetaFox-Hedera initialized successfully')
  } catch (error) {
    console.error('Failed to initialize MetaFox-Hedera:', error)
    throw error
  }
}

/**
 * Check if the extension is properly initialized
 */
export const isAppInitialized = (): boolean => {
  try {
    // Simple check - you can expand this
    return typeof chrome !== 'undefined' && !!chrome.storage
  } catch (error) {
    return false
  }
}

/**
 * Reset application data (for development/testing)
 */
export const resetAppData = async () => {
  try {
    console.log('Resetting MetaFox-Hedera data...')

    // Clear all storage
    await chrome.storage.local.clear()

    console.log('App data reset successfully')
  } catch (error) {
    console.error('Failed to reset app data:', error)
    throw error
  }
}
