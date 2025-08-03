export const queryKeys = {
  auth: {
    user: ["auth", "user"] as const,
  },
  profile: {
    all: ["profile"] as const,
    byId: (id: string) => ["profile", id] as const,
  },
} as const;
