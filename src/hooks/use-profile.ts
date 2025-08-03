"use client"

import { useAuthStore } from '@/lib/auth-store'
import type { ProfileUpdate } from '@/lib/supabase'

export function useProfile() {
  const {
    profile,
    profileLoading: loading,
    profileError: error,
    updateUserProfile,
    getUserRole,
    getUserRoleFromSession,
    isAdmin,
    isUser,
    isAdminFromSession,
    isUserFromSession
  } = useAuthStore()

  return {
    profile,
    loading,
    error,
    updateProfile: updateUserProfile,
    getUserRole,
    getUserRoleFromSession,
    isAdmin,
    isUser,
    isAdminFromSession,
    isUserFromSession,
    hasProfile: !!profile
  }
}