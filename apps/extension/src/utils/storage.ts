/**
 * Chrome Extension Storage Layer implementation for CipherStore
 * Uses chrome.storage.local for persistent storage
 */
export class ChromeStorageLayer {
  /**
   * Get a value from Chrome storage
   * @param key Storage key
   * @returns Promise that resolves to the stored value
   */
  async get<T = string>(key: string): Promise<T> {
    try {
      const result = await chrome.storage.local.get([key])
      return result[key] as T
    } catch (error) {
      console.error('ChromeStorageLayer.get error:', error)
      throw error
    }
  }

  /**
   * Set a value in Chrome storage
   * @param key Storage key
   * @param value Value to store
   */
  async set<T = string>(key: string, value: T): Promise<void> {
    try {
      await chrome.storage.local.set({ [key]: value })
    } catch (error) {
      console.error('ChromeStorageLayer.set error:', error)
      throw error
    }
  }

  /**
   * Remove a value from Chrome storage
   * @param key Storage key to remove
   */
  async remove(key: string): Promise<void> {
    try {
      await chrome.storage.local.remove([key])
    } catch (error) {
      console.error('ChromeStorageLayer.remove error:', error)
      throw error
    }
  }

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await chrome.storage.local.clear()
    } catch (error) {
      console.error('ChromeStorageLayer.clear error:', error)
      throw error
    }
  }

  /**
   * Get all storage keys
   * @returns Promise that resolves to array of all keys
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const result = await chrome.storage.local.get(null)
      return Object.keys(result)
    } catch (error) {
      console.error('ChromeStorageLayer.getAllKeys error:', error)
      throw error
    }
  }

  /**
   * Check if a key exists in storage
   * @param key Storage key to check
   * @returns Promise that resolves to true if key exists
   */
  async has(key: string): Promise<boolean> {
    try {
      const result = await chrome.storage.local.get([key])
      return key in result && result[key] !== undefined
    } catch (error) {
      console.error('ChromeStorageLayer.has error:', error)
      throw error
    }
  }
}
