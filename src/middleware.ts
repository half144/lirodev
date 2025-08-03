import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createClient } from '@supabase/supabase-js'
import { routing } from './i18n/routing'

const protectedRoutes = ['/dashboard', '/profile', '/admin']
const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request)
  const pathname = request.nextUrl.pathname
  const locale = pathname.split('/')[1]
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathWithoutLocale.startsWith(route)
  )
  
  if (!isProtectedRoute) {
    return intlResponse
  }
  
  // Check for Supabase auth token in cookies
  const authTokenKey = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`
  const authToken = request.cookies.get(authTokenKey)
  
  if (!authToken) {
    return createLoginRedirect(pathname, locale, request.url)
  }
  
  try {
    const authData = JSON.parse(authToken.value)
    
    if (!authData.access_token) {
      return createLoginRedirect(pathname, locale, request.url)
    }
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data: { user }, error } = await supabase.auth.getUser(authData.access_token)
    
    if (error || !user) {
      return createLoginRedirect(pathname, locale, request.url)
    }
  } catch {
    return createLoginRedirect(pathname, locale, request.url)
  }
  
  return intlResponse
}

function createLoginRedirect(pathname: string, locale: string, baseUrl: string) {
  const loginUrl = new URL(`/${locale}/login`, baseUrl)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}