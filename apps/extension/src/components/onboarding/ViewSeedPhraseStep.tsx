import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Copy, CheckCircle, AlertTriangle, Shield } from 'lucide-react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const ViewSeedPhraseStep: React.FC = () => {
  const { goBack, goToConfirmSeedPhrase, seedPhrase, getStepProgress } = useOnboarding()
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [hasViewed, setHasViewed] = useState(false)

  // Use the seed phrase from context
  const words = seedPhrase

  const handleReveal = () => {
    setIsRevealed(true)
    setHasViewed(true)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(words.join(' '))
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
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
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-primary to-chart-2 rounded-2xl flex items-center justify-center'>
          <Shield className='w-8 h-8 text-white' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Your Recovery Phrase</h3>
          <p className='text-muted-foreground'>
            Write down these 12 words in the exact order shown. You'll need them to restore your
            wallet.
          </p>
        </div>

        {/* Seed Phrase Display */}
        <div className='bg-card border rounded-lg p-4 space-y-4'>
          {!isRevealed ? (
            <div className='text-center space-y-4'>
              <div className='w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center'>
                <EyeOff className='w-6 h-6 text-muted-foreground' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Click to reveal your seed phrase</p>
                <p className='text-xs text-muted-foreground'>
                  Make sure no one is looking at your screen
                </p>
              </div>
              <Button onClick={handleReveal} variant='outline' className='mx-auto'>
                <Eye className='w-4 h-4 mr-2' />
                Reveal Seed Phrase
              </Button>
            </div>
          ) : words.length === 0 ? (
            <div className='text-center space-y-4'>
              <div className='w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-6 h-6 text-muted-foreground' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-destructive'>No seed phrase available</p>
                <p className='text-xs text-muted-foreground'>
                  Please go back and generate a new seed phrase
                </p>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='grid grid-cols-3 gap-2'>
                {words.map((word, index) => (
                  <div key={index} className='bg-muted rounded p-2 text-center'>
                    <span className='text-xs text-muted-foreground block'>{index + 1}</span>
                    <span className='text-sm font-medium'>{word}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleCopy}
                variant='outline'
                size='sm'
                className='w-full'
                disabled={isCopied}
              >
                {isCopied ? (
                  <>
                    <CheckCircle className='w-4 h-4 mr-2 text-green-500' />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className='w-4 h-4 mr-2' />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className='space-y-3'>
          <Button
            className='w-full h-11'
            size='lg'
            onClick={goToConfirmSeedPhrase}
            disabled={!hasViewed || words.length === 0}
          >
            I've Written It Down
          </Button>
          <p className='text-xs text-muted-foreground'>
            Next, we'll verify you've saved your recovery phrase
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewSeedPhraseStep
