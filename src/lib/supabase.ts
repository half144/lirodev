import { createClient, type AuthChangeEvent, type Session } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: {
      getItem: (key) => {
        if (typeof window === 'undefined') return null
        // Try cookies first, then localStorage
        const cookieValue = getCookie(key)
        if (cookieValue) return cookieValue
        return localStorage.getItem(key)
      },
      setItem: (key, value) => {
        if (typeof window === 'undefined') return
        // Set both cookie and localStorage
        setCookie(key, value, { 
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        })
        localStorage.setItem(key, value)
      },
      removeItem: (key) => {
        if (typeof window === 'undefined') return
        // Remove both cookie and localStorage
        deleteCookie(key)
        localStorage.removeItem(key)
      }
    }
  }
})

// Cookie utility functions
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string, options: any = {}) {
  if (typeof document === 'undefined') return
  let cookie = `${name}=${value}`
  
  if (options.maxAge) cookie += `; Max-Age=${options.maxAge}`
  if (options.path) cookie += `; Path=${options.path}`
  if (options.sameSite) cookie += `; SameSite=${options.sameSite}`
  if (options.secure) cookie += `; Secure`
  
  document.cookie = cookie
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export type LoginCredentials = {
  email: string
  password: string
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type UserRole = Database['public']['Enums']['app_role']

export async function signInWithEmail({ email, password }: LoginCredentials) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signUpWithEmail({ email, password }: LoginCredentials) {
  return await supabase.auth.signUp({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export function onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback)
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { profile: data, error }
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { profile: data, error }
}

export async function createProfile(profile: ProfileInsert) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()
  
  return { profile: data, error }
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const { profile } = await getProfile(userId)
  return profile?.role || null
}

export function getRoleFromJWT(session: Session): UserRole | null {
  const payload = session.access_token ? 
    JSON.parse(atob(session.access_token.split('.')[1])) : null
  
  return payload?.user_role || null
}

export function isAdmin(role: UserRole | null): boolean {
  return role === 'admin'
}

export function isUser(role: UserRole | null): boolean {
  return role === 'user'
}