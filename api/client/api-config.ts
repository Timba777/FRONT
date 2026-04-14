export const API_CONFIG = {
  // Explicit backend origin is required for stable cookie auth and CORS in browser.
  baseURL: "http://localhost/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as const
