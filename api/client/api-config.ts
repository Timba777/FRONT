export const API_CONFIG = {
  // Temporary direct backend connection while nginx is unstable.
  // TODO: switch back to "http://localhost:80/api" after nginx is fixed.
  baseURL: "http://localhost:4000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as const