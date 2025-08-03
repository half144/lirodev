"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useProfile } from "@/hooks/use-profile"
import { User, LogOut, Settings } from "lucide-react"

export function UserMenu() {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const { profile, getUserRole } = useProfile()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'br'

  if (loading || !isAuthenticated || !user) {
    return null
  }

  const userInitial = profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()
  const userRole = getUserRole()
  const displayName = profile?.full_name || user.email

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Avatar" 
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-medium">
                {userInitial || <User className="h-4 w-4" />}
              </div>
            )}
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Account
            {userRole && (
              <Badge variant={userRole === 'admin' ? 'default' : 'secondary'}>
                {userRole}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Signed in as {displayName}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          <Button 
            variant="outline" 
            asChild
            className="w-full justify-start"
          >
            <Link href={`/${locale}/profile`}>
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}