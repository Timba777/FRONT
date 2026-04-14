import { AxiosError } from "axios"
import type { ErrorResponse } from "@/api/interfaces/error-response.interface"

export const parseServerError = (error: unknown): ErrorResponse => {
  const result: ErrorResponse = { fields: {} }

  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      const statusCode = axiosError.response.status
      const serverData = axiosError.response.data as any
      result.statusCode = statusCode

      if (serverData?.message) {
        result.general = Array.isArray(serverData.message)
          ? serverData.message.join("\n")
          : serverData.message
      } else if (serverData?.error) {
        result.general = serverData.error
      } else {
        result.general = `Ошибка сервера: ${statusCode}`
      }
    } else if (axiosError.request) {
      result.general = "Нет соединения с сервером. Проверьте интернет-соединение."
    } else {
      result.general = axiosError.message || "Произошла неизвестная ошибка"
    }
  } else if (error instanceof Error) {
    result.general = error.message
  } else {
    result.general = "Произошла неизвестная ошибка"
  }

  return result
}

export const errorProcessing = (error: unknown, label: string): Error => {
  const parsed = parseServerError(error)
  const enhancedError = new Error(parsed.general || `Произошла ошибка при ${label}`) as Error & {
    statusCode?: number
    serverData?: unknown
    originalError?: unknown
  }

  enhancedError.originalError = error
  enhancedError.statusCode = parsed.statusCode

  if (error && typeof error === "object" && "response" in error) {
    enhancedError.serverData = (error as any).response?.data
  }

  return enhancedError
}
