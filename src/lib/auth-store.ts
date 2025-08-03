"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
  getRoleFromJWT,
  supabase,
  type UserRole,
} from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthStore {
  // Session-based role methods for immediate access
  getUserRoleFromSession: () => Promise<UserRole | null>;
  isAdminFromSession: () => Promise<boolean>;
  isUserFromSession: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((_set, _get) => ({
    getUserRoleFromSession: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      if (!session) return null;
      
      return getRoleFromJWT(session);
    },

    isAdminFromSession: async () => {
      const role = await _get().getUserRoleFromSession();
      return role === "admin";
    },

    isUserFromSession: async () => {
      const role = await _get().getUserRoleFromSession();
      return role === "user";
    },
  }))
);
