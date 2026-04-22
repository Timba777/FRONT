import { isApiError } from "@/api/client/api-client"

const PROFILE_EXISTS_HINTS = [
  "already has a customer profile",
  "already has a master profile",
  "customer profile already exists",
  "master profile already exists",
  "профиль клиента уже существует",
  "профиль мастера уже существует",
] as const

const PROFILE_FORBIDDEN_HINTS = [
  "not enough rights",
  "you do not have access rights",
  "forbidden",
  "недостаточно прав",
  "нет прав",
] as const

const PROFILE_UNAUTHORIZED_HINTS = [
  "the user is not logged in",
  "please log in",
  "unauthorized",
  "not enough rights",
  "you do not have access rights",
  "forbidden",
  "нет доступа",
  "недостаточно прав",
] as const

function readStatusCode(error: unknown): number | undefined {
  if (isApiError(error) && typeof error.statusCode === "number") {
    return error.statusCode
  }

  if (typeof error === "object" && error !== null && "statusCode" in error) {
    const value = (error as { statusCode?: unknown }).statusCode
    if (typeof value === "number") return value
  }

  return undefined
}

function collectText(error: unknown, depth = 0): string {
  if (depth > 4) return ""

  const parts: string[] = []

  if (error instanceof Error && error.message) {
    parts.push(error.message)
  }

  if (isApiError(error)) {
    const general = error.parsed.general
    if (typeof general === "string" && general.length > 0) {
      parts.push(general)
    }
  }

  if (typeof error === "object" && error !== null && "originalError" in error) {
    const inner = (error as { originalError?: unknown }).originalError
    if (inner !== undefined && inner !== null && inner !== error) {
      parts.push(collectText(inner, depth + 1))
    }
  }

  return parts.join(" ").toLowerCase()
}

export function isProfileAlreadyExistsError(error: unknown): boolean {
  const status = readStatusCode(error)
  const text = collectText(error)

  // Backend may return 400/409 for this case; message check is primary.
  if (status !== undefined && status >= 400 && status < 500) {
    return PROFILE_EXISTS_HINTS.some((hint) => text.includes(hint))
  }

  return PROFILE_EXISTS_HINTS.some((hint) => text.includes(hint))
}

/**
 * Some backends forbid profile creation before explicit auth/email confirmation.
 * In signup flow this should not hard-fail wizard completion.
 */
export function isProfileCreationForbiddenError(error: unknown): boolean {
  const status = readStatusCode(error)
  const text = collectText(error)

  if (status === 401 || status === 403) {
    return true
  }

  return PROFILE_FORBIDDEN_HINTS.some((hint) => text.includes(hint))
}

export function isProfileCreationUnauthorizedError(error: unknown): boolean {
  const status = readStatusCode(error)
  const text = collectText(error)

  if (status === 401 || status === 403) {
    return true
  }

  return PROFILE_UNAUTHORIZED_HINTS.some((hint) => text.includes(hint))
}

