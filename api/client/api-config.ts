if (!process.env.NEXT_PUBLIC_SERVER_URL) {
  console.warn('NEXT_PUBLIC_SERVER_URL не задан в .env, используется значение по умолчанию');
}

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api` as const

/** JSON-запросы (основной клиент). */
export const API_CONFIG = {
  // Temporary direct backend connection while nginx is unstable.
  // TODO: switch back to "http://localhost:80/api" after nginx is fixed.
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
} as const

/**
 * Конфиг только для `multipart/form-data` (без дефолтного JSON `Content-Type`),
 * иначе браузер не сможет выставить boundary, а бэк не увидит файл.
 *
 * Пример: `PATCH .../user-profile/update-image` + `FormData`, поле **`file`**.
 * Путь см. `API_ENDPOINTS.PROFILE.UPDATE_IMAGE`.
 */
export const API_CONFIG_MULTIPART = {
  baseURL,
  timeout: 30000,
  withCredentials: true,
} as const
