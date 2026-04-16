import { UserRole } from "@/types/user-role.enum"

// Backend register DTO (flat payload required by /auth/register).
// Index signature is kept for backward compatibility with existing callers.
export interface RegisterDto {
  // Backend actually validates `firstName` (message says "name").
  firstName: string
  // Optional compatibility aliases used by older callers.
  name?: string
  email: string
  password: string
  passwordRepeat?: string
  // Temporary backend-compat field (typo in backend validator).
  passwordReapeat: string
  role: UserRole
  [key: string]: unknown
}
