"use client"

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'

export function useAuth() {
  const {
    user,
    loading,
    error,
    isAuthenticated,
    initialize,
    logout
  } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    logout
  }
}