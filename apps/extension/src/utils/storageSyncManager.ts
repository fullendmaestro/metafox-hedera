import type { Store } from '@reduxjs/toolkit'
import type { RootState } from '../store/types'

/**
 * Synchronizes Redux store changes with Chrome storage
 * This utility ensures that any changes to the Redux store are automatically
 * persisted to Chrome's extension storage API
 */
export class StorageSyncManager {
  private store: Store<RootState>
  private isInitialized = false

  constructor(store: Store<RootState>) {
    this.store = store
  }

  /**
   * Initialize the storage sync manager
   * Sets up listeners for store changes and storage changes
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      // Load initial state from Chrome storage
      await this.loadInitialState()

      // Set up store change listener
      this.setupStoreListener()

      // Set up Chrome storage change listener
      this.setupStorageListener()

      this.isInitialized = true
      console.log('Storage sync manager initialized')
    } catch (error) {
      console.error('Failed to initialize storage sync manager:', error)
      throw error
    }
  }

  /**
   * Load initial state from Chrome storage
   */
  private async loadInitialState(): Promise<void> {
    try {
      const result = await chrome.storage.local.get('metafox-hedera-store')
      const persistedData = result['metafox-hedera-store']

      if (persistedData) {
        // The data is already handled by redux-persist
        console.log('Initial state loaded from Chrome storage')
      }
    } catch (error) {
      console.error('Error loading initial state:', error)
    }
  }

  /**
   * Set up listener for Redux store changes
   */
  private setupStoreListener(): void {
    let previousState = this.store.getState()

    this.store.subscribe(() => {
      const currentState = this.store.getState()

      // Only sync if state actually changed
      if (currentState !== previousState) {
        this.syncToStorage(currentState)
        previousState = currentState
      }
    })
  }

  /**
   * Set up listener for Chrome storage changes
   */
  private setupStorageListener(): void {
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && changes['metafox-hedera-store']) {
        const newValue = changes['metafox-hedera-store'].newValue

        if (newValue) {
          // Handle external storage changes
          console.log('Chrome storage changed externally')
          // Redux-persist will handle the rehydration automatically
        }
      }
    })
  }

  /**
   * Sync Redux state to Chrome storage
   */
  private async syncToStorage(state: RootState): Promise<void> {
    try {
      // Create a sanitized version of the state for storage
      const sanitizedState = this.sanitizeState(state)

      // Store as JSON string (similar to how redux-persist does it)
      await chrome.storage.local.set({
        'metafox-hedera-store': JSON.stringify(sanitizedState),
      })

      console.log('State synced to Chrome storage')
    } catch (error) {
      console.error('Error syncing to storage:', error)
    }
  }

  /**
   * Sanitize state for storage (remove non-serializable data)
   */
  private sanitizeState(state: RootState): any {
    // Remove any functions, undefined values, or circular references
    return JSON.parse(JSON.stringify(state))
  }

  /**
   * Manually trigger a sync to storage
   */
  async forceSyncToStorage(): Promise<void> {
    const currentState = this.store.getState()
    await this.syncToStorage(currentState)
  }

  /**
   * Clear all storage data
   */
  async clearStorage(): Promise<void> {
    try {
      await chrome.storage.local.remove('metafox-hedera-store')
      console.log('Storage cleared')
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  /**
   * Get storage usage information
   */
  async getStorageInfo(): Promise<{ bytesInUse: number; quota: number }> {
    try {
      const bytesInUse = await chrome.storage.local.getBytesInUse()
      const quota = chrome.storage.local.QUOTA_BYTES

      return { bytesInUse, quota }
    } catch (error) {
      console.error('Error getting storage info:', error)
      return { bytesInUse: 0, quota: 0 }
    }
  }
}

// Singleton instance
let storageSyncManager: StorageSyncManager | null = null

/**
 * Get or create the storage sync manager instance
 */
export function getStorageSyncManager(store?: Store<RootState>): StorageSyncManager {
  if (!storageSyncManager && store) {
    storageSyncManager = new StorageSyncManager(store)
  }

  if (!storageSyncManager) {
    throw new Error('StorageSyncManager not initialized. Provide a store instance.')
  }

  return storageSyncManager
}
