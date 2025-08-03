"use client"

import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'
import { 
  getProfile, 
  updateProfile, 
  getRoleFromJWT,
  type Profile, 
  type ProfileUpdate,
  type UserRole
} from '@/lib/supabase'

interface ProfileState {
  profile: Profile | null
  loading: boolean
  error: string | null
}

export function useProfile() {
  const { user, isAuthenticated } = useAuth()
  const [state, setState] = useState<ProfileState>({
    profile: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let mounted = true

    const fetchProfile = async () => {
      if (!user || !isAuthenticated) {
        setState({ profile: null, loading: false, error: null })
        return
      }

      try {
        const { profile, error } = await getProfile(user.id)
        
        if (!mounted) return
        
        setState({
          profile,
          error: error?.message ?? null,
          loading: false
        })
      } catch (err) {
        if (!mounted) return
        
        setState({
          profile: null,
          error: err instanceof Error ? err.message : 'Unknown error',
          loading: false
        })
      }
    }

    fetchProfile()

    return () => {
      mounted = false
    }
  }, [user, isAuthenticated])

  const updateUserProfile = async (updates: ProfileUpdate) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    setState(prev => ({ ...prev, loading: true }))

    try {
      const { profile, error } = await updateProfile(user.id, updates)
      
      if (error) {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }))
        return { profile: null, error }
      }

      setState({
        profile,
        error: null,
        loading: false
      })

      return { profile, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }))
      return { profile: null, error: { message: errorMessage } }
    }
  }

  const getUserRole = (): UserRole | null => {
    return state.profile?.role ?? null
  }

  const getUserRoleFromSession = (): UserRole | null => {
    if (!user) return null
    
    // Try to get from JWT if available
    const session = user.session
    if (session) {
      return getRoleFromJWT(session)
    }
    
    // Fallback to profile
    return state.profile?.role ?? null
  }

  const isAdmin = (): boolean => {
    const role = getUserRoleFromSession()
    return role === 'admin'
  }

  const isUser = (): boolean => {
    const role = getUserRoleFromSession()
    return role === 'user'
  }

  return {
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    updateProfile: updateUserProfile,
    getUserRole,
    getUserRoleFromSession,
    isAdmin,
    isUser,
    hasProfile: !!state.profile
  }
}