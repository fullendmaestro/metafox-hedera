import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { hederaTestnetService } from '@/utils/hederaService'
import { validateHederaAccountId, formatHbarAmount } from '@/utils/hedera'
import { ArrowUpRight, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'

interface TransferHbarProps {
  fromAccountId?: string
  fromPrivateKey?: string
  onTransactionComplete?: (txId: string) => void
}

export const TransferHbar: React.FC<TransferHbarProps> = ({
  fromAccountId,
  fromPrivateKey,
  onTransactionComplete,
}) => {
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleTransfer = async () => {
    setError(null)
    setSuccess(null)

    // Validation
    if (!fromAccountId || !fromPrivateKey) {
      setError('Source account information is required')
      return
    }

    if (!toAccountId.trim()) {
      setError('Recipient account ID is required')
      return
    }

    if (!validateHederaAccountId(toAccountId.trim())) {
      setError('Invalid recipient account ID format')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setIsTransferring(true)

    try {
      const result = await hederaTestnetService.transferHbar(
        fromAccountId,
        fromPrivateKey,
        toAccountId.trim(),
        amountNum,
      )

      setSuccess(`Transfer successful! Transaction ID: ${result.transactionId}`)

      // Reset form
      setToAccountId('')
      setAmount('')

      if (onTransactionComplete) {
        onTransactionComplete(result.transactionId)
      }
    } catch (err) {
      console.error('Transfer failed:', err)
      setError(err instanceof Error ? err.message : 'Transfer failed')
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <div className='space-y-6 p-6 bg-card border rounded-lg'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center'>
          <ArrowUpRight className='w-5 h-5 text-white' />
        </div>
        <div>
          <h3 className='font-semibold text-foreground'>Send HBAR</h3>
          <p className='text-sm text-muted-foreground'>Transfer HBAR to another account</p>
        </div>
      </div>

      <div className='space-y-4'>
        {/* From Account (Read-only) */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>From Account</label>
          <div className='p-3 bg-muted rounded-lg text-sm font-mono text-muted-foreground'>
            {fromAccountId || 'No account selected'}
          </div>
        </div>

        {/* To Account */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>To Account ID</label>
          <input
            type='text'
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            placeholder='0.0.123456'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            disabled={isTransferring}
          />
        </div>

        {/* Amount */}
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>Amount (HBAR)</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='0.00'
            step='0.01'
            min='0'
            className='w-full p-3 border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            disabled={isTransferring}
          />
          {amount && !isNaN(parseFloat(amount)) && (
            <p className='text-xs text-muted-foreground'>{formatHbarAmount(parseFloat(amount))}</p>
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
          onClick={handleTransfer}
          disabled={isTransferring || !fromAccountId || !fromPrivateKey}
          className='w-full'
        >
          {isTransferring ? (
            <>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Transferring...
            </>
          ) : (
            <>
              <ArrowUpRight className='w-4 h-4 mr-2' />
              Send HBAR
            </>
          )}
        </Button>

        {(!fromAccountId || !fromPrivateKey) && (
          <p className='text-xs text-muted-foreground text-center'>
            Account must be created on Hedera network to send transactions
          </p>
        )}
      </div>
    </div>
  )
}

export default TransferHbar
