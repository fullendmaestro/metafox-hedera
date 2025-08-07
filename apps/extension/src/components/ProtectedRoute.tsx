import React from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '@/store'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireOnboarding = true,
}) => {
  const { authenticated, onBoarded } = useApp()

  // If onboarding is required but user is not onboarded, redirect to welcome
  if (requireOnboarding && !onBoarded) {
    return <Navigate to='/welcome' replace />
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && onBoarded && !authenticated) {
    return <Navigate to='/login' replace />
  }

  // If all requirements are met, render the children
  return <>{children}</>
}

export default ProtectedRoute
