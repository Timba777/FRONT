import { apiClient } from "@/lib/api-client"

// Backward-compatible export for existing code paths.
export const api = apiClient.instance
