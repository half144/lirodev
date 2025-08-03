"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { LoginForm } from "@/components/login-form"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations("auth")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleLoginSuccess = () => {
    setMessage({ type: "success", text: t("login.success") })
    
    const redirectTo = searchParams.get("redirect") || "/"
    
    setTimeout(() => {
      router.push(redirectTo)
    }, 1500)
  }

  const handleLoginError = (error: string) => {
    setMessage({ type: "error", text: error })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-4">
        {message && (
          <div
            className={`p-4 rounded-md text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </div>
  )
}