"use client";

import { useAuthQuery } from "./use-auth-query";
import { useAuthStore } from "@/lib/auth-store";

export function useAuth() {
  const authQuery = useAuthQuery();
  const { getUserRoleFromSession, isAdminFromSession, isUserFromSession } = useAuthStore();

  return {
    ...authQuery,
    // Session-based role methods for immediate access
    getUserRoleFromSession,
    isAdminFromSession,
    isUserFromSession,
  };
}