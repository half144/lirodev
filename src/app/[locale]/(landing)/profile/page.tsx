"use client"

import { useTranslations } from "next-intl"
import { ProfileForm } from "@/components/profile-form"
import { useProfile } from "@/hooks/use-profile"
import { useState } from "react"

export default function ProfilePage() {
  const t = useTranslations("profile")
  const { isAdmin } = useProfile()
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSuccess = () => {
    setMessage({ type: "success", text: t("success") })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleError = (error: string) => {
    setMessage({ type: "error", text: error })
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md text-sm max-w-2xl mx-auto ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
              }`}
          >
            {message.text}
          </div>
        )}

        <ProfileForm
          onSuccess={handleSuccess}
          onError={handleError}
          showRoleField={isAdmin()}
        />
      </div>
    </div>
  )
}