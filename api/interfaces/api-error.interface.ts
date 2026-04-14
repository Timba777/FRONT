import type { ErrorResponse } from "@/api/interfaces/error-response.interface"

export interface ApiError {
  readonly parsed: ErrorResponse
  readonly originalError: unknown
  readonly statusCode?: number
  readonly code?: string
}
