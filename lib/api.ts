import { apiClient } from "@/api/client/api-client"

// Backward-compatible export for existing code paths.
export const api = apiClient.instance
