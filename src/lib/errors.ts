export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class ProfileError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "ProfileError";
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "NetworkError";
  }
}

export function createErrorFromSupabaseError(error: any): Error {
  if (!error) return new Error("Unknown error");
  
  const message = error.message || "An error occurred";
  const code = error.code;
  
  // Categorize errors based on common Supabase error codes
  if (code === "23505") return new ProfileError("Profile already exists", code);
  if (code === "23503") return new ProfileError("Invalid profile data", code);
  if (code === "42501") return new AuthError("Permission denied", code);
  if (code === "PGRST301") return new AuthError("User not authenticated", code);
  
  // Network errors
  if (error.status >= 400 && error.status < 500) {
    return new AuthError(message, code);
  }
  
  if (error.status >= 500) {
    return new NetworkError(message, error.status);
  }
  
  return new Error(message);
}