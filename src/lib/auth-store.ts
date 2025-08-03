"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import { 
  getCurrentUser, 
  onAuthStateChange, 
  signOut, 
  getProfile, 
  updateProfile, 
  getRoleFromJWT,
  supabase,
  type Profile, 
  type ProfileUpdate,
  type UserRole
} from '@/lib/supabase'

interface AuthStore {
  user: User | null
  profile: Profile | null
  loading: boolean
  profileLoading: boolean
  error: string | null
  profileError: string | null
  isAuthenticated: boolean
  profileLoaded: boolean
  
  // Auth actions
  initialize: () => Promise<void>
  logout: () => Promise<void>
  
  // Profile actions
  loadProfile: () => Promise<void>
  updateUserProfile: (updates: ProfileUpdate) => Promise<{ profile: Profile | null; error: any }>
  
  // Role methods
  getUserRole: () => UserRole | null
  getUserRoleFromSession: () => Promise<UserRole | null>
  isAdmin: () => boolean
  isUser: () => boolean
  isAdminFromSession: () => Promise<boolean>
  isUserFromSession: () => Promise<boolean>
  
  // Internal state setters
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setProfile: (profile: Profile | null) => void
  setProfileLoading: (loading: boolean) => void
  setProfileError: (error: string | null) => void
  setProfileLoaded: (loaded: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set, get) => ({
    user: null,
    profile: null,
    loading: true,
    profileLoading: false,
    error: null,
    profileError: null,
    isAuthenticated: false,
    profileLoaded: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setProfile: (profile) => set({ profile }),
    setProfileLoading: (profileLoading) => set({ profileLoading }),
    setProfileError: (profileError) => set({ profileError }),
    setProfileLoaded: (loaded) => set({ profileLoaded: loaded }),

    initialize: async () => {
      const { setUser, setLoading, setError } = get()
      
      try {
        const { user, error } = await getCurrentUser()
        setUser(user)
        setError(error?.message ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
      
      setLoading(false)

      // Set up auth state listener
      onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
        setError(null)
        
        // Clear profile when user changes
        if (!session?.user) {
          set({ profile: null, profileError: null })
        }
      })
    },

    logout: async () => {
      const { setLoading, setError, setUser, setProfileLoaded } = get()
      setLoading(true)
      
      try {
        const { error } = await signOut()
        if (!error) {
          setUser(null)
          set({ profile: null, profileError: null })
          setProfileLoaded(false)
        }
        setError(error?.message ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
      
      setLoading(false)
    },

    loadProfile: async () => {
      const { user, profileLoaded, setProfile, setProfileLoading, setProfileError, setProfileLoaded } = get()
      
      if (!user) {
        setProfile(null)
        setProfileError(null)
        setProfileLoaded(false)
        return
      }

      // Avoid multiple calls if profile is already loaded
      if (profileLoaded) {
        return
      }

      setProfileLoading(true)
      
      try {
        const { profile, error } = await getProfile(user.id)
        setProfile(profile)
        setProfileError(error?.message ?? null)
        setProfileLoaded(true)
      } catch (err) {
        setProfileError(err instanceof Error ? err.message : 'Unknown error')
        setProfileLoaded(false)
      }
      
      setProfileLoading(false)
    },

    updateUserProfile: async (updates) => {
      const { user, setProfile, setProfileLoading, setProfileError } = get()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      setProfileLoading(true)

      try {
        const { profile, error } = await updateProfile(user.id, updates)
        
        if (error) {
          setProfileError(error.message)
          setProfileLoading(false)
          return { profile: null, error }
        }

        setProfile(profile)
        setProfileError(null)
        setProfileLoading(false)
        
        return { profile, error: null }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setProfileError(errorMessage)
        setProfileLoading(false)
        return { profile: null, error: { message: errorMessage } }
      }
    },

    getUserRole: () => {
      const { profile } = get()
      return profile?.role ?? null
    },

    getUserRoleFromSession: async () => {
      const { user, profile } = get()
      
      if (!user) return null
      
      // Try to get from JWT if available
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        return getRoleFromJWT(session)
      }
      
      // Fallback to profile
      return profile?.role ?? null
    },

    isAdmin: () => {
      const { getUserRole } = get()
      return getUserRole() === 'admin'
    },

    isUser: () => {
      const { getUserRole } = get()
      return getUserRole() === 'user'
    },

    isAdminFromSession: async () => {
      const { getUserRoleFromSession } = get()
      const role = await getUserRoleFromSession()
      return role === 'admin'
    },

    isUserFromSession: async () => {
      const { getUserRoleFromSession } = get()
      const role = await getUserRoleFromSession()
      return role === 'user'
    }
  }))
)

// Auto-load profile when user changes, but reset profileLoaded flag
useAuthStore.subscribe(
  (state) => state.user,
  (user, prevUser) => {
    if (user && user !== prevUser) {
      useAuthStore.getState().setProfileLoaded(false)
      useAuthStore.getState().loadProfile()
    } else if (!user && prevUser) {
      // User logged out
      useAuthStore.getState().setProfileLoaded(false)
    }
  }
)