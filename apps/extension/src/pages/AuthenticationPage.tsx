import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { AppLayout } from '@/pages/Layout'
import { useAppDispatch } from '@/store'
import { authenticateUser } from '@/utils/walletInit'

const AuthenticationPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleAuthenticate = async () => {
    try {
      setIsAuthenticating(true)
      await authenticateUser(dispatch)
      // After successful authentication, navigate to home
      navigate('/')
    } catch (error) {
      console.error('Failed to authenticate:', error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <AppLayout showBottomNav={false}>
      <div className='h-full flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-xs'>
          <div className='w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-2xl'>
            <Lock className='w-8 h-8 text-white' />
          </div>

          <div className='space-y-2'>
            <h2 className='text-xl font-bold text-white'>Welcome Back</h2>
            <p className='text-white/80 text-sm'>Please authenticate to access your wallet</p>
          </div>

          <Button
            onClick={handleAuthenticate}
            disabled={isAuthenticating}
            className='w-full gradient-golden border-none shadow-xl hover:shadow-2xl transition-all duration-300 text-white font-semibold rounded-lg'
          >
            {isAuthenticating ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                Authenticating...
              </>
            ) : (
              <>
                <Lock className='w-4 h-4 mr-2' />
                Authenticate
              </>
            )}
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

export default AuthenticationPage
