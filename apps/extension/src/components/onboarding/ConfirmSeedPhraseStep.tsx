import React, { useState } from 'react'
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const ConfirmSeedPhraseStep: React.FC = () => {
  const { goBack, goToCreatePassword, seedPhrase, getStepProgress } = useOnboarding()

  // Use the seed phrase from context
  const words = seedPhrase

  // Select 4 random positions to verify (use word length dynamically)
  const [verificationIndexes] = useState(() => {
    if (!words.length) return []
    const indexes = Array.from({ length: words.length }, (_, i) => i)
    return indexes
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(4, words.length)) // Don't exceed word count
      .sort((a, b) => a - b)
  })

  const [inputWords, setInputWords] = useState<{ [key: number]: string }>({})
  const [isVerified, setIsVerified] = useState(false)
  const [showError, setShowError] = useState(false)
  const [wordErrors, setWordErrors] = useState<{ [key: number]: boolean }>({})

  const handleWordInput = (index: number, value: string) => {
    const newInputWords = { ...inputWords, [index]: value.trim().toLowerCase() }
    setInputWords(newInputWords)
    setShowError(false)

    // Clear individual word error when user starts typing
    if (wordErrors[index]) {
      setWordErrors({ ...wordErrors, [index]: false })
    }

    // Check if all words are entered and correct
    const allEntered = verificationIndexes.every(
      (i) => newInputWords[i] && newInputWords[i].length > 0,
    )
    if (allEntered) {
      const correctWords: { [key: number]: boolean } = {}
      const allCorrect = verificationIndexes.every((i) => {
        const isCorrect = newInputWords[i] === words[i].toLowerCase()
        correctWords[i] = !isCorrect
        return isCorrect
      })

      setWordErrors(correctWords)
      setIsVerified(allCorrect)
      if (!allCorrect) {
        setShowError(true)
      }
    } else {
      setIsVerified(false)
      setWordErrors({})
    }
  }

  const handleVerifyAndContinue = () => {
    if (isVerified) {
      goToCreatePassword()
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header with back button */}
      <div className='flex items-center justify-between'>
        <Button variant='ghost' size='icon' onClick={goBack} className='h-8 w-8'>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <h2 className='text-base font-medium'>Create Wallet</h2>
        <Progress value={getStepProgress()} className='w-16'></Progress>
      </div>

      <div className='text-center space-y-6'>
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-primary to-chart-3 rounded-2xl flex items-center justify-center'>
          <CheckCircle className='w-8 h-8 text-white' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Confirm Recovery Phrase</h3>
          <p className='text-muted-foreground'>
            Enter the missing words from your recovery phrase to verify you've saved it correctly.
          </p>
        </div>

        {/* Seed Phrase Grid with Input Fields */}
        <div className='bg-card border rounded-lg p-4 space-y-4'>
          <div className='grid grid-cols-3 gap-2'>
            {words.map((word, index) => {
              const needsInput = verificationIndexes.includes(index)
              const hasError = wordErrors[index]
              const hasCorrectInput = inputWords[index] && !hasError && !showError

              return (
                <div key={index} className='space-y-1'>
                  <span className='text-xs text-muted-foreground block text-center'>
                    {index + 1}
                  </span>
                  {needsInput ? (
                    <div className='space-y-1'>
                      <input
                        type='text'
                        value={inputWords[index] || ''}
                        onChange={(e) => handleWordInput(index, e.target.value)}
                        placeholder='?'
                        className={`w-full px-2 py-2 text-center border rounded text-sm font-medium bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          hasError
                            ? 'border-red-300 bg-red-50 focus:ring-red-500'
                            : hasCorrectInput
                              ? 'border-green-300 bg-green-50 text-green-800'
                              : 'border-input'
                        }`}
                        autoComplete='off'
                        spellCheck='false'
                      />
                      {hasError && (
                        <div className='flex justify-center'>
                          <AlertTriangle className='w-3 h-3 text-red-500' />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='bg-muted rounded p-2 text-center'>
                      <span className='text-sm font-medium text-muted-foreground'>{word}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <div className='bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center gap-2'>
            <AlertTriangle className='w-4 h-4 text-destructive' />
            <span className='text-sm text-destructive'>
              Some words are incorrect. Please check your recovery phrase and try again.
            </span>
          </div>
        )}

        {/* Success Message */}
        {isVerified && (
          <div className='bg-green-100 border border-green-300 rounded-lg p-3 flex items-center gap-2'>
            <CheckCircle className='w-4 h-4 text-green-600' />
            <span className='text-sm text-green-800'>
              Perfect! You've correctly verified your recovery phrase.
            </span>
          </div>
        )}

        <div className='space-y-3'>
          <Button
            className='w-full h-11'
            size='lg'
            onClick={handleVerifyAndContinue}
            disabled={!isVerified}
          >
            {isVerified ? 'Continue to Password' : 'Verify Phrase'}
          </Button>
          <p className='text-xs text-muted-foreground'>
            {isVerified
              ? 'Create a password to secure your wallet'
              : 'Enter all correct words to continue'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmSeedPhraseStep
