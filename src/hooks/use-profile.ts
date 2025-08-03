"use client";

import { useProfileQuery } from "./use-profile-query";
import { useAuth } from "./use-auth";

export function useProfile() {
  const { user } = useAuth();
  return useProfileQuery({ user });
}
