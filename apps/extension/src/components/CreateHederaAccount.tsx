import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { hederaTestnetService } from '@/utils/hederaService'
import { formatHbarAmount } from '@/utils/hedera'
import { Plus, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface CreateHederaAccountProps {
  publicKey: string
  onAccountCreated?: (accountId: string) => void
}

export const CreateHederaAccount: React.FC<CreateHederaAccountProps> = ({
  publicKey,
  onAccountCreated,
}) => {
  const [initialBalance, setInitialBalance] = useState('1')
  const [operatorAccountId, setOperatorAccountId] = useState('')
  const [operatorPrivateKey, setOperatorPrivateKey] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [createdAccountId, setCreatedAccountId] = useState<string | null>(null)

  const handleCreateAccount = async () => {
    setError(null)
    setSuccess(null)

    // Validation
    if (!operatorAccountId.trim()) {
      setError('Operator account ID is required')
      return
    }

    if (!operatorPrivateKey.trim()) {
      setError('Operator private key is required')
      return
    }

    const balance = parseFloat(initialBalance)
    if (isNaN(balance) || balance < 0) {
      setError('Please enter a valid initial balance')
      return
    }

    setIsCreating(true)

    try {
      const newAccount = await hederaTestnetService.createAccount(
        balance,
        operatorAccountId.trim(),
        operatorPrivateKey.trim(),
      )

      setCreatedAccountId(newAccount.accountId)
      setSuccess(`Account created successfully! Account ID: ${newAccount.accountId}`)

      if (onAccountCreated) {
        onAccountCreated(newAccount.accountId)
      }
    } catch (err) {
      console.error('Account creation failed:', err)
      setError(err instanceof Error ? err.message : 'Account creation failed')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='space-y-6 p-6 bg-card border rounded-lg'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center'>
          <Plus className='w-5 h-5 text-white' />
        </div>
        <div>
          <h3 className='font-semibold text-foreground'>Create Hedera Account</h3>
          <p className='text-sm text-muted-foreground'>Create a new account on Hedera network</p>
        </div>
      </div>

      <div className='space-y-4'>
        {/* Info Box */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Info className='w-5 h-5 text-blue-500 mt-0.5' />
            <div className='space-y-2'>
              <p className='text-sm font-medium text-blue-900'>Account Creation Requirements</p>
              <ul className='text-xs text-blue-700 space-y-1'>
                <li>• You need an existing Hedera account to pay the creation fee</li>
                <li>• Account creation costs approximately 1 HBAR</li>
                <li>• The new account will have the initial balance you specify</li>
                <li>• This uses Hedera testnet (free test HBAR)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Public Key Display */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>Public Key (Read-only)</label>
          <div className='p-3 bg-muted rounded-lg text-sm font-mono text-muted-foreground break-all'>
            {publicKey}
          </div>
        </div>

        {/* Operator Account */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>
            Operator Account ID
            <span className='text-destructive ml-1'>*</span>
          </label>
          <input
            type='text'
            value={operatorAccountId}
            onChange={(e) => setOperatorAccountId(e.target.value)}
            placeholder='0.0.123456'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            disabled={isCreating}
          />
          <p className='text-xs text-muted-foreground'>
            Account that will pay for the creation transaction
          </p>
        </div>

        {/* Operator Private Key */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>
            Operator Private Key
            <span className='text-destructive ml-1'>*</span>
          </label>
          <input
            type='password'
            value={operatorPrivateKey}
            onChange={(e) => setOperatorPrivateKey(e.target.value)}
            placeholder='Private key of the operator account'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            disabled={isCreating}
          />
          <p className='text-xs text-muted-foreground'>
            This key is used only for this transaction and is not stored
          </p>
        </div>

        {/* Initial Balance */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>Initial Balance (HBAR)</label>
          <input
            type='number'
            value={initialBalance}
            onChange={(e) => setInitialBalance(e.target.value)}
            placeholder='1.00'
            step='0.01'
            min='0'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            disabled={isCreating}
          />
          {initialBalance && !isNaN(parseFloat(initialBalance)) && (
            <p className='text-xs text-muted-foreground'>
              {formatHbarAmount(parseFloat(initialBalance))}
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
            <div className='flex items-center gap-2'>
              <AlertTriangle className='w-4 h-4 text-destructive' />
              <p className='text-sm text-destructive'>{error}</p>
            </div>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              <p className='text-sm text-green-700'>{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleCreateAccount}
          disabled={isCreating || !operatorAccountId.trim() || !operatorPrivateKey.trim()}
          className='w-full'
        >
          {isCreating ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Creating Account...
            </>
          ) : (
            <>
              <Plus className='w-4 h-4 mr-2' />
              Create Account
            </>
          )}
        </Button>

        {/* Testnet Notice */}
        <div className='text-center'>
          <p className='text-xs text-muted-foreground'>
            🧪 This creates an account on Hedera Testnet
          </p>
          <p className='text-xs text-muted-foreground'>
            Get free testnet HBAR from the{' '}
            <a
              href='https://portal.hedera.com/register'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              Hedera Portal
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateHederaAccount
