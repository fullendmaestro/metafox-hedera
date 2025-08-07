import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Download, ArrowLeft, AlertTriangle, Key } from 'lucide-react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { validateMnemonic } from '@/utils/hedera'
import { PrivateKey } from '@hashgraph/sdk'
import { walletManager } from '@/utils/wallet'

interface ImportWalletStepProps {
  onComplete?: () => void
}

const ImportWalletStep: React.FC<ImportWalletStepProps> = () => {
  const { goBack, goToCreatePassword, setSeedPhrase } = useOnboarding()
  const [importType, setImportType] = useState<'mnemonic' | 'privatekey'>('mnemonic')
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  const handleImport = async () => {
    setError('')

    if (!inputValue.trim()) {
      setError(`Please enter your ${importType === 'mnemonic' ? 'recovery phrase' : 'private key'}`)
      return
    }

    setIsImporting(true)

    try {
      if (importType === 'mnemonic') {
        // Validate mnemonic
        const mnemonicWords = inputValue.trim().split(/\s+/)
        const mnemonicString = mnemonicWords.join(' ')

        if (!validateMnemonic(mnemonicString)) {
          setError('Invalid recovery phrase. Please check and try again.')
          return
        }

        // Set seed phrase in context and proceed to password creation
        setSeedPhrase(mnemonicWords)
        goToCreatePassword()
      } else {
        // Validate private key
        try {
          PrivateKey.fromString(inputValue.trim())
          // For private key import, we'll need to handle it differently
          // since it doesn't need seed phrase confirmation
          // For now, let's just validate and proceed
          setError('Private key import will be implemented in the next step')
        } catch (err) {
          setError('Invalid private key format. Please check and try again.')
        }
      }
    } catch (error) {
      console.error('Import error:', error)
      setError('Failed to import wallet. Please try again.')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header with back button */}
      <div className='flex items-center justify-between'>
        <Button variant='ghost' size='icon' onClick={goBack} className='h-8 w-8'>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <h2 className='text-base font-medium'>Import Wallet</h2>
        <div className='w-8' /> {/* Spacer for alignment */}
      </div>

      <div className='text-center space-y-6'>
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-chart-2 rounded-2xl flex items-center justify-center'>
          <Download className='w-8 h-8 text-white' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Import Existing Wallet</h3>
          <p className='text-muted-foreground'>
            Enter your recovery phrase or private key to restore your Hedera wallet.
          </p>
        </div>

        {/* Import Type Selector */}
        <div className='flex border rounded-lg p-1 bg-muted'>
          <button
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
              importType === 'mnemonic'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setImportType('mnemonic')}
          >
            Recovery Phrase
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
              importType === 'privatekey'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setImportType('privatekey')}
          >
            <Key className='w-4 h-4 mr-1 inline' />
            Private Key
          </button>
        </div>

        <div className='space-y-4 text-left'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-foreground'>
              {importType === 'mnemonic' ? 'Recovery Phrase' : 'Private Key'}
            </label>
            {importType === 'mnemonic' ? (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter your 12 or 24-word recovery phrase separated by spaces'
                className='w-full h-24 p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none'
              />
            ) : (
              <input
                type='password'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter your Hedera private key'
                className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground'
              />
            )}
          </div>

          {error && (
            <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
              <div className='flex items-center gap-2'>
                <AlertTriangle className='w-4 h-4 text-destructive' />
                <p className='text-sm text-destructive'>{error}</p>
              </div>
            </div>
          )}

          <div className='bg-card border rounded-lg p-3'>
            <p className='text-xs text-muted-foreground'>
              <strong>Privacy Notice:</strong> Your{' '}
              {importType === 'mnemonic' ? 'recovery phrase' : 'private key'} is encrypted and
              stored locally. MetaFox cannot access or recover your wallet if you lose your
              credentials.
            </p>
          </div>
        </div>

        <div className='space-y-3'>
          <Button
            className='w-full h-11'
            size='lg'
            onClick={handleImport}
            disabled={isImporting || !inputValue.trim()}
          >
            {isImporting ? 'Importing...' : 'Import Wallet'}
          </Button>
          <button
            className='w-full text-sm text-muted-foreground hover:text-foreground transition-colors'
            onClick={() => setImportType(importType === 'mnemonic' ? 'privatekey' : 'mnemonic')}
          >
            {importType === 'mnemonic'
              ? 'Import using private key instead'
              : 'Import using recovery phrase instead'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportWalletStep
