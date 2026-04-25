import { isApiError } from "@/api/client/api-client"

const EMAIL_NOT_VERIFIED_CODES = ["EMAIL_NOT_VERIFIED", "EMAIL_NOT_CONFIRMED"] as const
const EMAIL_NOT_VERIFIED_CODE_SET: ReadonlySet<string> = new Set(EMAIL_NOT_VERIFIED_CODES)

const EMAIL_NOT_VERIFIED_HINTS = [
  "email not verified",
  "email not confirmed",
  "confirm your email",
  "подтвердите email",
  "почта не подтверждена",
  "has not been verified",  
  "not been verified"      
] as const

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

function readErrorCode(error: unknown): string | undefined {
  if (isApiError(error) && typeof error.code === "string" && error.code.length > 0) {
    return error.code
  }

  if (typeof error === "object" && error !== null) {
    const directCode = (error as { code?: unknown }).code
    if (typeof directCode === "string" && directCode.length > 0) {
      return directCode
    }

    const serverDataCode = (error as { serverData?: { code?: unknown } }).serverData?.code
    if (typeof serverDataCode === "string" && serverDataCode.length > 0) {
      return serverDataCode
    }
  }

  let current: unknown = error
  for (let depth = 0; depth < 5 && current !== undefined && current !== null; depth += 1) {
    if (typeof current !== "object" || current === null) break
    const record = current as Record<string, unknown>

    const responseDataCode = (record.response as { data?: { code?: unknown } } | undefined)?.data
      ?.code
    if (typeof responseDataCode === "string" && responseDataCode.length > 0) {
      return responseDataCode
    }

    const next = record.originalError
    if (next === undefined || next === null || next === current) break
    current = next
  }

  return undefined
}

function collectErrorText(error: unknown, depth = 0): string {
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

  if (typeof error === "object" && error !== null) {
    const serverData = (error as { serverData?: { message?: unknown; error?: unknown } }).serverData
    if (typeof serverData?.message === "string" && serverData.message.length > 0) {
      parts.push(serverData.message)
    }
    if (typeof serverData?.error === "string" && serverData.error.length > 0) {
      parts.push(serverData.error)
    }
  }

  if (typeof error === "object" && error !== null && "originalError" in error) {
    const inner = (error as { originalError?: unknown }).originalError
    if (inner !== undefined && inner !== null && inner !== error) {
      parts.push(collectErrorText(inner, depth + 1))
    }
  }

  return parts.join(" ").toLowerCase()
}

export function isEmailNotVerifiedError(error: unknown): boolean {
  const statusCode = readStatusCode(error)
  const code = readErrorCode(error)?.toUpperCase()


  if (code && EMAIL_NOT_VERIFIED_CODE_SET.has(code)) {
    return true
  }

  const combined = collectErrorText(error).toLowerCase()
  
  if (combined.length === 0) return false
  
  const hasHint = EMAIL_NOT_VERIFIED_HINTS.some((hint) => {
    const hintLower = hint.toLowerCase()
    const includes = combined.includes(hintLower)
    return includes
  })
  
  
  if (hasHint) return true
  
  return false
}
