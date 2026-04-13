/**
 * Central path map (same grouping as mobile `API_ENDPOINTS`).
 * Web backend uses `/auth/me` for session user; mobile may use `/user-profile/my-profile` — keep web paths here.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
} as const
