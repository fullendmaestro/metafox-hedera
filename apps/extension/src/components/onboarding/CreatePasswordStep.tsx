import React, { useState } from 'react'
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'

const CreatePasswordStep: React.FC = () => {
  const { goBack, goToSuccess, getStepProgress, onOnboardingComplete } = useOnboarding()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleCreateWallet = async () => {
    setIsCreating(true)

    try {
      // Convert password string to Uint8Array
      const passwordUint8Array = new TextEncoder().encode(password)

      // Call onOnboardingComplete to create the wallet
      await onOnboardingComplete({
        password: passwordUint8Array,
        type: 'create',
      })

      console.log('Wallet created successfully with password')
      goToSuccess()
    } catch (error) {
      console.error('Failed to create wallet:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const isFormValid = password && confirmPassword && password === confirmPassword

  return (
    <div className='space-y-6'>
      {/* Header with back button */}
      <div className='flex items-center justify-between'>
        <Button variant='ghost' size='icon' onClick={goBack} className='h-8 w-8'>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <h2 className='text-base font-medium'>Create Password</h2>
        <Progress value={getStepProgress()} className='w-16'></Progress>
      </div>

      <div className='text-center space-y-6'>
        <div className='w-16 h-16 mx-auto bg-gradient-to-br from-primary to-chart-3 rounded-2xl flex items-center justify-center'>
          <Lock className='w-8 h-8 text-white' />
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-foreground'>Secure Your Wallet</h3>
          <p className='text-muted-foreground'>Create a strong password to protect your wallet.</p>
        </div>

        {/* Password Form */}
        <div className='space-y-4'>
          {/* Password Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-left block'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder='Enter your password'
                className='w-full px-3 py-3 border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                autoComplete='new-password'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-left block'>Confirm Password</label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
                className={`w-full px-3 py-3 border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  confirmPassword && password !== confirmPassword
                    ? 'border-red-300 focus:ring-red-500'
                    : ''
                }`}
                autoComplete='new-password'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>

            {/* Password Match Indicator */}
            {confirmPassword && (
              <div className='flex items-center gap-2 text-xs'>
                {password === confirmPassword ? (
                  <>
                    <CheckCircle className='w-3 h-3 text-green-500' />
                    <span className='text-green-600'>Passwords match</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className='w-3 h-3 text-red-500' />
                    <span className='text-red-600'>Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='space-y-3'>
          <Button
            className='w-full h-11'
            size='lg'
            onClick={handleCreateWallet}
            disabled={!isFormValid || isCreating}
          >
            {isCreating ? 'Creating Wallet...' : 'Create Wallet'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePasswordStep
