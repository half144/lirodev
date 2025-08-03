"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfile,
  updateProfile,
  type ProfileUpdate,
  type Profile,
  type UserRole,
} from "@/lib/supabase";
import { queryKeys } from "@/lib/query-keys";
import { useMemo } from "react";
import type { User } from "@supabase/supabase-js";

interface UseProfileQueryOptions {
  user: User | null;
}

export function useProfileQuery({ user }: UseProfileQueryOptions) {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.profile.byId(user?.id || ""),
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      const { profile, error } = await getProfile(user.id);
      if (error) throw error;
      return profile;
    },
    enabled: !!user?.id,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: ProfileUpdate) => {
      if (!user?.id) throw new Error("User not authenticated");
      const { profile, error } = await updateProfile(user.id, updates);
      if (error) throw error;
      return profile;
    },
    onMutate: async (updates) => {
      const queryKey = queryKeys.profile.byId(user?.id || "");
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot previous value
      const previousProfile = queryClient.getQueryData<Profile>(queryKey);
      
      // Optimistically update
      if (previousProfile) {
        queryClient.setQueryData(queryKey, { ...previousProfile, ...updates });
      }
      
      return { previousProfile };
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        queryKeys.profile.byId(user?.id || ""),
        updatedProfile
      );
    },
    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousProfile) {
        queryClient.setQueryData(
          queryKeys.profile.byId(user?.id || ""),
          context.previousProfile
        );
      }
    },
  });

  const profileUtils = useMemo(() => {
    const role = profile?.role || null;
    
    return {
      getUserRole: (): UserRole | null => role,
      isAdmin: (): boolean => role === "admin",
      isUser: (): boolean => role === "user",
      hasProfile: !!profile,
    };
  }, [profile?.role]);

  return {
    profile,
    loading: isLoading,
    error: error?.message || null,
    updateProfile: updateProfileMutation.mutate,
    updateLoading: updateProfileMutation.isPending,
    refetch,
    ...profileUtils,
  };
}
