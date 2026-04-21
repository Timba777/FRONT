import type { UpdateUserProfileDto } from "@/api/dto/profile/update-user-profile.dto"

/**
 * Minimal mapping from signup `fullName` to backend `UpdateUserProfileDto`.
 *
 * TODO: When the signup form collects `firstName` / `lastName` / `middleName` separately,
 * map them explicitly instead of stuffing the whole string into `firstName`.
 */
export function buildUpdateUserProfileFromFullName(fullName: string): UpdateUserProfileDto {
  const trimmed = fullName.trim()
  if (trimmed.length === 0) {
    return {}
  }
  return { firstName: trimmed }
}
