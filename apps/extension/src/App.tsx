import { useEffect } from 'react'
import AppRoutes from './Routes'
import { initializeApp } from './utils/init'
// import {
//   initializeWalletState,
//   checkOnboardingStatus,
//   checkAuthenticationStatus,
// } from './utils/walletInit'
import { useAppDispatch } from '@/store'
// import { setAuthenticated, setOnBoarded } from '@/store'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const init = async () => {
      try {
        console.log('Starting app initialization...')

        // Initialize the core app functionality
        await initializeApp()

        // Initialize wallet state from storage
        // await initializeWalletState(dispatch)

        // Check onboarding and authentication status
        // const isOnboarded = await checkOnboardingStatus()
        // const isAuthenticated = await checkAuthenticationStatus()

        // Update store with actual status
        // dispatch(setOnBoarded(isOnboarded))
        // if (isAuthenticated) {
        //   dispatch(setAuthenticated({ authenticated: true }))
        // }

        // console.log('App initialization completed', { isOnboarded, isAuthenticated })
      } catch (error) {
        console.error('Failed to initialize app:', error)
        // Error state is handled by the app slice if needed
      }
    }

    init()
  }, [dispatch])

  // Let the routing system handle authentication and onboarding redirects
  return (
    <div
      className={`min-h-screen min-w-full gradient-cosmic flex items-center justify-center transition-all duration-300`}
    >
      <AppRoutes />
    </div>
  )
}

export default App
