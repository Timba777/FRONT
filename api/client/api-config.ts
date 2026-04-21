if (!process.env.NEXT_PUBLIC_SERVER_URL) {
  console.warn('NEXT_PUBLIC_SERVER_URL не задан в .env, используется значение по умолчанию');
}
export const API_CONFIG = {
  // Temporary direct backend connection while nginx is unstable.
  // TODO: switch back to "http://localhost:80/api" after nginx is fixed.
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as const
export const API_CONFIG_MULTIPART = {
  // Temporary direct backend connection while nginx is unstable.
  // TODO: switch back to "http://localhost:80/api" after nginx is fixed.
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as const