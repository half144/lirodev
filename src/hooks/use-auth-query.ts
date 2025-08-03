"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  onAuthStateChange,
  signOut,
} from "@/lib/supabase";
import { useEffect, useMemo } from "react";
import { queryKeys } from "@/lib/query-keys";
import type { User } from "@supabase/supabase-js";

const THIRTY_SECONDS = 30 * 1000;

export function useAuthQuery() {
  const queryClient = useQueryClient();

  const { 
    data: authData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: async () => {
      const { user, error } = await getCurrentUser();
      if (error) throw error;
      return user;
    },
    staleTime: THIRTY_SECONDS,
    retry: (failureCount, error: any) => {
      // Don't retry auth errors
      if (error?.status === 401) return false;
      return failureCount < 1;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: signOut,
    onMutate: async () => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.auth.user });
      const previousUser = queryClient.getQueryData(queryKeys.auth.user);
      queryClient.setQueryData(queryKeys.auth.user, null);
      return { previousUser };
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(queryKeys.auth.user, context.previousUser);
      }
    },
  });

  // Handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      const user = session?.user ?? null;
      queryClient.setQueryData(queryKeys.auth.user, user);
      
      // Clear profile cache when user changes
      if (event === 'SIGNED_OUT' || !user) {
        queryClient.removeQueries({ queryKey: queryKeys.profile.all });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const authState = useMemo(() => ({
    user: authData ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    isAuthenticated: !!authData,
    logout: logoutMutation.mutate,
    logoutLoading: logoutMutation.isPending,
    refetch,
  }), [authData, isLoading, error, logoutMutation.mutate, logoutMutation.isPending, refetch]);

  return authState;
}
