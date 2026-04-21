import { isApiError } from "@/api/client/api-client"

const MESSAGE_HINTS = [
  "already exists",
  "already registered",
  "user already exists",
  "email already exists",
  "пользователь уже существует",
  "email уже существует",
] as const

function messageImpliesExistingUser(text: string): boolean {
  const lower = text.toLowerCase()
  return MESSAGE_HINTS.some((hint) => lower.includes(hint))
}

function readStatusCode(error: unknown): number | undefined {
  if (isApiError(error) && typeof error.statusCode === "number") {
    return error.statusCode
  }

  if (typeof error === "object" && error !== null && "statusCode" in error) {
    const value = (error as { statusCode?: unknown }).statusCode
    if (typeof value === "number") return value
  }

  let current: unknown = error
  for (let depth = 0; depth < 5 && current !== undefined && current !== null; depth += 1) {
    if (typeof current === "object" && "response" in current) {
      const response = (current as { response?: { status?: unknown } }).response
      if (response && typeof response === "object" && "status" in response) {
        const status = (response as { status?: unknown }).status
        if (typeof status === "number") return status
      }
    }

    if (typeof current !== "object" || current === null) break
    const record = current as Record<string, unknown>
    const next = record.originalError
    if (next === undefined || next === null || next === current) break
    current = next
  }

  return undefined
}

function collectErrorText(error: unknown, depth: number): string {
  if (depth > 5) return ""

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
    const inner = (error as { originalError: unknown }).originalError
    if (inner !== undefined && inner !== null && inner !== error) {
      parts.push(collectErrorText(inner, depth + 1))
    }
  }

  return parts.join(" ")
}

/**
 * Detects duplicate registration / user-already-exists responses from the API layer.
 * Uses HTTP 409 when available, otherwise case-insensitive message heuristics.
 */
export function isUserAlreadyExistsError(error: unknown): boolean {
  const status = readStatusCode(error)
  if (status === 409) return true

  const combined = collectErrorText(error, 0)
  if (combined.length === 0) return false

  return messageImpliesExistingUser(combined)
}
