import { authApi } from "@/api/services/auth.api"
import type { LoginDto } from "@/api/dto/auth/login.dto"
import type { RegisterDto } from "@/api/dto/auth/register.dto"

export interface LoginPayload extends LoginDto {}

// Backward-compatible alias retained for existing imports.
export type RegisterPayload = RegisterDto

export const login = async (email: string, password: string) => {
  return authApi.login({ email, password })
}

export const register = async (data: RegisterPayload) => {
  return authApi.register(data)
}

export const getMe = async () => {
  return authApi.getMe()
}

export const logout = async () => {
  return authApi.logout()
}

export { authApi }
