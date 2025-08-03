"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProfile } from "@/hooks/use-profile"
import { Loader2, User } from "lucide-react"
import type { ProfileUpdate, UserRole } from "@/lib/supabase"

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  role: z.enum(["admin", "user"]).optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  showRoleField?: boolean
}

export function ProfileForm({ onSuccess, onError, showRoleField = false }: ProfileFormProps) {
  const t = useTranslations("profile")
  const { profile, updateProfile, updateLoading, loading: profileLoading, isAdmin } = useProfile()

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      avatar_url: profile?.avatar_url || "",
      role: profile?.role || "user",
    },
  })

  const { reset } = form

  // Reset form when profile loads
  React.useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || "",
        email: profile.email || "",
        avatar_url: profile.avatar_url || "",
        role: profile.role,
      })
    }
  }, [profile, reset])

  const onSubmit = (values: ProfileFormData) => {
      const updates: ProfileUpdate = {}
      
      if (values.full_name !== profile?.full_name) {
        updates.full_name = values.full_name || null
      }
      
      if (values.email !== profile?.email) {
        updates.email = values.email || null
      }
      
      if (values.avatar_url !== profile?.avatar_url) {
        updates.avatar_url = values.avatar_url || null
      }
      
      // Only allow role changes if user is admin or showRoleField is true
      if ((isAdmin() || showRoleField) && values.role !== profile?.role) {
        updates.role = values.role as UserRole
      }

      if (Object.keys(updates).length === 0) {
        onError?.("No changes to save")
        return
      }

      updateProfile(updates, {
        onSuccess: () => {
          onSuccess?.()
        },
        onError: (error) => {
          onError?.(error instanceof Error ? error.message : "Update failed")
        }
      })
  }

  if (profileLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fullNamePlaceholder")}
                      disabled={updateLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      disabled={updateLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("avatarUrl")}</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder={t("avatarUrlPlaceholder")}
                      disabled={updateLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(isAdmin() || showRoleField) && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("role")}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={updateLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectRole")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">{t("roleUser")}</SelectItem>
                        <SelectItem value="admin">{t("roleAdmin")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("saving")}
                </>
              ) : (
                t("save")
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}