// import type { AppDispatch } from '@/store'
// import {
//   setOnBoarded,
//   setAuthenticated,
//   addWallet,
//   selectWallet,
//   setPasswordCypherStoreId,
// } from '@/store'

/**
 * Initialize wallet state from storage
 * This function checks for existing wallets and updates the Redux store accordingly
 */
// export const initializeWalletState = async (dispatch: AppDispatch): Promise<void> => {
//   try {
//     console.log('Initializing wallet state...')

//     // Check for existing wallets in storage
//     const result = await chrome.storage.local.get([
//       'wallets',
//       'selectedWalletId',
//       'onBoarded',
//       'passwordCypherStoreId',
//     ])

//     const { wallets, selectedWalletId, onBoarded, passwordCypherStoreId } = result

//     // Set onboarding status
//     if (onBoarded !== undefined) {
//       dispatch(setOnBoarded(onBoarded))
//     }

//     // Set password cipher store ID if available
//     if (passwordCypherStoreId !== undefined) {
//       dispatch(setPasswordCypherStoreId(passwordCypherStoreId))
//     }

//     // Load existing wallets if any
//     if (wallets && Object.keys(wallets).length > 0) {
//       // Add each wallet to the store
//       Object.values(wallets).forEach((wallet: any) => {
//         dispatch(addWallet({ wallet }))
//       })

//       // Set selected wallet if exists
//       if (selectedWalletId && wallets[selectedWalletId]) {
//         dispatch(selectWallet({ walletId: selectedWalletId }))
//         // If wallet exists, user should be considered onboarded
//         dispatch(setOnBoarded(true))
//       }

//       console.log(`Loaded ${Object.keys(wallets).length} wallets from storage`)
//     }

//     console.log('Wallet state initialization completed')
//   } catch (error) {
//     console.error('Failed to initialize wallet state:', error)
//     throw error
//   }
// }

/**
 * Check if user needs onboarding
 */
// export const checkOnboardingStatus = async (): Promise<boolean> => {
//   try {
//     const result = await chrome.storage.local.get(['onBoarded', 'wallets'])

//     // User is onboarded if they have completed the process or have wallets
//     const hasCompletedOnboarding = result.onBoarded === true
//     const hasWallets = result.wallets && Object.keys(result.wallets).length > 0

//     return hasCompletedOnboarding || hasWallets
//   } catch (error) {
//     console.error('Failed to check onboarding status:', error)
//     return false
//   }
// }

/**
 * Check if user is authenticated
 * This could be based on session storage, encrypted data, or biometric checks
 */
// export const checkAuthenticationStatus = async (): Promise<boolean> => {
//   try {
//     // For now, check if there's a recent authentication token
//     const result = await chrome.storage.session?.get(['authToken', 'authTimestamp'])

//     if (result?.authToken && result?.authTimestamp) {
//       const now = Date.now()
//       const authAge = now - result.authTimestamp
//       const maxAge = 30 * 60 * 1000 // 30 minutes

//       return authAge < maxAge
//     }

//     return false
//   } catch (error) {
//     console.error('Failed to check authentication status:', error)
//     return false
//   }
// }

/**
 * Set authentication status
 */
// export const setAuthenticationStatus = async (authenticated: boolean): Promise<void> => {
//   try {
//     if (authenticated) {
//       await chrome.storage.session?.set({
//         authToken: 'authenticated',
//         authTimestamp: Date.now(),
//       })
//     } else {
//       await chrome.storage.session?.remove(['authToken', 'authTimestamp'])
//     }
//   } catch (error) {
//     console.error('Failed to set authentication status:', error)
//   }
// }

/**
 * Complete onboarding process
 */
// export const completeOnboarding = async (dispatch: AppDispatch): Promise<void> => {
//   try {
//     // Update Redux store
//     dispatch(setOnBoarded(true))

//     console.log('Onboarding completed')
//   } catch (error) {
//     console.error('Failed to complete onboarding:', error)
//     throw error
//   }
// }

/**
 * Authenticate user
 */
// export const authenticateUser = async (dispatch: AppDispatch): Promise<void> => {
//   try {
//     // Set authentication status
//     await setAuthenticationStatus(true)

//     // Update Redux store
//     dispatch(setAuthenticated({ authenticated: true }))

//     console.log('User authenticated')
//   } catch (error) {
//     console.error('Failed to authenticate user:', error)
//     throw error
//   }
// }

/**
 * Sign out user
 */
// export const signOutUser = async (dispatch: AppDispatch): Promise<void> => {
//   try {
//     // Clear authentication status
//     await setAuthenticationStatus(false)

//     // Update Redux store
//     dispatch(setAuthenticated({ authenticated: false }))

//     console.log('User signed out')
//   } catch (error) {
//     console.error('Failed to sign out user:', error)
//     throw error
//   }
// }
