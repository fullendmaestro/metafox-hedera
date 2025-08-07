import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage'
import AuthenticationPage from './pages/AuthenticationPage'
import HomePage from './pages/home/HomePage'
import NFTsPage from './pages/NFTsPage'
import SwapPage from './pages/SwapPage'
import DiscoverPage from './pages/DiscoverPage'
import ActivityPage from './pages/ActivityPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AppLayout } from './pages/Layout'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - no authentication required */}
      <Route
        path='/welcome'
        element={
          <ProtectedRoute requireAuth={false} requireOnboarding={false}>
            <WelcomePage />
          </ProtectedRoute>
        }
      />

      {/* Authentication route - requires onboarding but not authentication */}
      <Route
        path='/login'
        element={
          <ProtectedRoute requireAuth={false} requireOnboarding={true}>
            <AuthenticationPage />
          </ProtectedRoute>
        }
      />

      {/* Protected routes - require both onboarding and authentication */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/nfts'
        element={
          <ProtectedRoute>
            <NFTsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/swap'
        element={
          <ProtectedRoute>
            <SwapPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/discover'
        element={
          <ProtectedRoute>
            <DiscoverPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/activity'
        element={
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/onboardingSuccess'
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className='h-full flex items-center justify-center'>
                <div className='text-lg text-white'>Success</div>
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/wallet'
        element={
          <ProtectedRoute>
            <LoginPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
