import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import {
  createMnemonic,
  validateMnemonic,
  derivePrivateKeyFromMnemonic,
  getPublicKeyFromPrivateKey,
} from '@/utils/hedera'
import { useNavigate } from 'react-router-dom'
import {
  addWallet,
  selectAccount,
  selectWallet,
  setAuthenticated,
  setOnBoarded,
  useAppDispatch,
  type WalletAccount,
  type Wallet,
} from '@/store'
import { setPasswordCypherStoreId } from '@/store'
import { CipherStoreManager } from '@metafox/cipher-store'
import { v4 as uuidv4 } from 'uuid'
import { createSeedAccountSource, generateAccountId } from '@/utils/hederaKeyDerivation'

export type OnboardingStep =
  | 'welcome'
  | 'create-wallet'
  | 'view-seed-phrase'
  | 'confirm-seed-phrase'
  | 'create-password'
  | 'success'
  | 'import-wallet'

interface OnboardingContextType {
  // Current step
  currentStep: OnboardingStep
  setCurrentStep: (step: OnboardingStep) => void

  // Seed phrase management
  seedPhrase: string[]
  setSeedPhrase: (phrase: string[]) => void
  generateSeedPhrase: (wordCount?: 12 | 24) => Promise<boolean>
  validateAndSetSeedPhrase: (phrase: string) => boolean
  clearSeedPhrase: () => void

  // Wallet info
  walletAddress?: string
  setWalletAddress: (address: string) => void

  // Progress tracking
  getStepProgress: () => number

  // Navigation helpers
  goToWelcome: () => void
  goToCreateWallet: () => void
  goToImportWallet: () => void
  goToViewSeedPhrase: () => void
  goToConfirmSeedPhrase: () => void
  goToCreatePassword: () => void
  goToSuccess: () => void
  goBack: () => void

  // Wallet creation
  onOnboardingComplete: (params: {
    password: Uint8Array
    type: 'create' | 'import' | 'import-phrase'
  }) => Promise<void>
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

interface OnboardingProviderProps {
  children: ReactNode
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [seedPhrase, setSeedPhrase] = useState<string[]>([])
  const [walletAddress, setWalletAddress] = useState<string>()

  const generateSeedPhrase = async (wordCount: 12 | 24 = 12): Promise<boolean> => {
    try {
      console.log('Generating seed phrase with', wordCount, 'words...')
      const mnemonicString = await createMnemonic(wordCount)
      console.log('Generated mnemonic:', mnemonicString)

      // Validate the generated mnemonic
      if (!validateMnemonic(mnemonicString)) {
        console.error('Generated mnemonic is invalid')
        return false
      }

      const words = mnemonicString.split(' ')
      console.log('Split into words:', words)
      setSeedPhrase(words)
      return true
    } catch (error) {
      console.error('Failed to generate seed phrase:', error)
      return false
    }
  }

  const validateAndSetSeedPhrase = (phrase: string): boolean => {
    try {
      const trimmedPhrase = phrase.trim()
      if (!validateMnemonic(trimmedPhrase)) {
        console.error('Invalid seed phrase provided')
        return false
      }

      const words = trimmedPhrase.split(' ').filter((word) => word.length > 0)
      if (words.length !== 12 && words.length !== 24) {
        console.error('Seed phrase must be 12 or 24 words')
        return false
      }

      setSeedPhrase(words)
      console.log('Seed phrase validated and set successfully')
      return true
    } catch (error) {
      console.error('Failed to validate seed phrase:', error)
      return false
    }
  }

  const clearSeedPhrase = () => {
    setSeedPhrase([])
  }

  const onOnboardingComplete = async ({
    password,
    type,
  }: {
    password: Uint8Array
    type: 'create' | 'import' | 'import-phrase'
  }) => {
    try {
      // Convert Uint8Array password to string
      const passwordString = new TextDecoder().decode(password)

      // Persist password to the store
      const { entryID: passwordStoreId } = await CipherStoreManager.addEntry({
        data: JSON.stringify(passwordString),
        password,
      })

      // Dispatch the password cipher store ID to Redux store
      dispatch(setPasswordCypherStoreId(passwordStoreId))

      if (type === 'create') {
        // Create wallet from mnemonic using new Hedera wallet structure
        const walletId = uuidv4()
        const accountId = generateAccountId()
        const privateKey = derivePrivateKeyFromMnemonic(seedPhrase.join(' '), 0)
        const { publicKeyString } = getPublicKeyFromPrivateKey(await privateKey)

        // Store the mnemonic securely
        const { entryID: mnemonicStoreId } = await CipherStoreManager.addEntry({
          data: JSON.stringify(seedPhrase.join(' ')),
          password,
        })

        // Create account with Hedera structure
        const account: WalletAccount = {
          address: publicKeyString, // Using public key as address for now
          createdAt: Date.now(),
          id: accountId,
          name: 'Account 1',
          source: createSeedAccountSource(0), // First account from seed
        }

        // Create wallet with Hedera structure
        const wallet: Wallet = {
          accounts: [account], // Store accounts in wallet
          avatarIndex: 0,
          cipherStoreID: mnemonicStoreId,
          createdAt: Date.now(),
          id: walletId,
          name: 'Main Wallet',
          type: 0, // 0 for mnemonic wallet
        }

        // Dispatch wallet creation
        dispatch(addWallet({ wallet }))

        // Select the new wallet and account
        dispatch(selectWallet({ walletId }))
        dispatch(selectAccount({ accountId }))
      } else if (type === 'import' || type === 'import-phrase') {
        // Import wallet (either from seed phrase or private key)
        const walletId = uuidv4()
        const accountId = generateAccountId()

        let privateKey: Promise<any>
        let walletType: number
        let accountSource: any
        let keyData: string

        if (type === 'import-phrase') {
          // Importing from seed phrase
          privateKey = derivePrivateKeyFromMnemonic(seedPhrase.join(' '), 0)
          walletType = 0 // Mnemonic wallet
          accountSource = createSeedAccountSource(0)
          keyData = seedPhrase.join(' ')
        } else {
          // TODO: Add support for importing from private key
          // This would need additional UI to capture the private key
          throw new Error('Private key import not yet implemented')
        }

        const resolvedPrivateKey = await privateKey
        const { publicKeyString } = getPublicKeyFromPrivateKey(resolvedPrivateKey)

        // Store the key data securely
        const { entryID: keyStoreId } = await CipherStoreManager.addEntry({
          data: JSON.stringify(keyData),
          password,
        })

        // Create account with Hedera structure
        const account: WalletAccount = {
          address: publicKeyString,
          createdAt: Date.now(),
          id: accountId,
          name: 'Account 1',
          source: accountSource,
        }

        // Create wallet with Hedera structure
        const wallet: Wallet = {
          accounts: [account],
          avatarIndex: Math.floor(Math.random() * 10), // Random avatar for imported wallet
          cipherStoreID: keyStoreId,
          createdAt: Date.now(),
          id: walletId,
          name: type === 'import-phrase' ? 'Imported Wallet' : 'Private Key Wallet',
          type: walletType,
        }

        // Dispatch wallet creation
        dispatch(addWallet({ wallet }))

        // Select the new wallet and account
        dispatch(selectWallet({ walletId }))
        dispatch(selectAccount({ accountId }))
      }

      // Mark onboarding as complete
      dispatch(setOnBoarded(true))

      // Automatically authenticate the user after successful wallet creation
      dispatch(setAuthenticated({ authenticated: true }))

      // Navigate to the main app
      navigate('/')
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
      throw error
    }
  }

  const getStepProgress = (): number => {
    switch (currentStep) {
      case 'welcome':
        return 0
      case 'create-wallet':
        return 20
      case 'view-seed-phrase':
        return 40
      case 'confirm-seed-phrase':
        return 60
      case 'create-password':
        return 80
      case 'success':
        return 100
      case 'import-wallet':
        return 50
      default:
        return 0
    }
  }

  const goToWelcome = () => setCurrentStep('welcome')
  const goToCreateWallet = () => setCurrentStep('create-wallet')
  const goToImportWallet = () => setCurrentStep('import-wallet')
  const goToViewSeedPhrase = () => setCurrentStep('view-seed-phrase')
  const goToConfirmSeedPhrase = () => setCurrentStep('confirm-seed-phrase')
  const goToCreatePassword = () => setCurrentStep('create-password')
  const goToSuccess = () => setCurrentStep('success')

  const goBack = () => {
    switch (currentStep) {
      case 'create-wallet':
      case 'import-wallet':
        goToWelcome()
        break
      case 'view-seed-phrase':
        goToCreateWallet()
        break
      case 'confirm-seed-phrase':
        goToViewSeedPhrase()
        break
      case 'create-password':
        goToConfirmSeedPhrase()
        break
      case 'success':
        goToCreatePassword()
        break
      default:
        goToWelcome()
        break
    }
  }

  const contextValue: OnboardingContextType = {
    currentStep,
    setCurrentStep,
    seedPhrase,
    setSeedPhrase,
    generateSeedPhrase,
    validateAndSetSeedPhrase,
    clearSeedPhrase,
    walletAddress,
    setWalletAddress,
    getStepProgress,
    goToWelcome,
    goToCreateWallet,
    goToImportWallet,
    goToViewSeedPhrase,
    goToConfirmSeedPhrase,
    goToCreatePassword,
    goToSuccess,
    goBack,
    onOnboardingComplete,
  }

  return <OnboardingContext.Provider value={contextValue}>{children}</OnboardingContext.Provider>
}

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}

// Export types for external use
export type { OnboardingContextType }
