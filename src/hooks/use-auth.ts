"use client"

import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { getCurrentUser, onAuthStateChange, signOut } from '@/lib/supabase'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    let mounted = true

    const getInitialUser = async () => {
      try {
        const { user, error } = await getCurrentUser()
        
        if (!mounted) return
        
        setState(prev => ({
          ...prev,
          user,
          error: error?.message ?? null,
          loading: false
        }))
      } catch (err) {
        if (!mounted) return
        
        setState(prev => ({ 
          ...prev, 
          error: err instanceof Error ? err.message : 'Unknown error', 
          loading: false 
        }))
      }
    }

    getInitialUser()

    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (!mounted) return
      
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        loading: false,
        error: null
      }))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    setState(prev => ({ ...prev, loading: true }))
    
    try {
      const { error } = await signOut()
      setState(prev => ({
        ...prev,
        user: error ? prev.user : null,
        error: error?.message ?? null,
        loading: false
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Unknown error',
        loading: false
      }))
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    logout
  }
}