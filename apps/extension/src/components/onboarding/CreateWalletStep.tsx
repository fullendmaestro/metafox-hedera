import React, { useState } from 'react'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const CreateWalletStep: React.FC = () => {
  const { goBack, generateSeedPhrase, goToViewSeedPhrase, getStepProgress } = useOnboarding()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateSeedPhrase = async () => {
    setIsGenerating(true)
    try {
      const success = await generateSeedPhrase(12)
      if (success) {
        goToViewSeedPhrase()
      } else {
        console.error('Failed to generate seed phrase')
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error generating seed phrase:', error)
    } finally {
      setIsGenerating(false)
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
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-primary to-chart-1 rounded-2xl flex items-center justify-center'>
          <Sparkles className='w-8 h-8 text-white' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Create New Wallet</h3>
          <p className='text-muted-foreground'>
            We'll generate a secure recovery phrase for you. Make sure to write it down and store it
            safely.
          </p>
        </div>

        <div className='bg-card border rounded-lg p-4 space-y-3'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-destructive rounded-full'></div>
            <span className='text-sm font-medium text-foreground'>Important Security Tips</span>
          </div>
          <ul className='text-sm text-muted-foreground space-y-1 text-left'>
            <li>• Never share your recovery phrase with anyone</li>
            <li>• Store it in a safe place offline</li>
            <li>• MetaFox will never ask for your recovery phrase</li>
          </ul>
        </div>

        <div className='space-y-3'>
          <Button
            className='w-full h-11'
            size='lg'
            onClick={handleGenerateSeedPhrase}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Recovery Phrase'}
          </Button>
          <p className='text-xs text-muted-foreground'>
            This will create a secure 12-word recovery phrase
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateWalletStep
