import { authApi } from "@/api/services/auth.api"
import type { LoginDto } from "@/api/dto/auth/login.dto"
import type { RegisterDto } from "@/api/dto/auth/register.dto"
import type { ConfirmationDto } from "@/api/dto/auth/confirmation.dto"
import type { PasswordRecoveryResetDto } from "@/api/dto/auth/password-recovery-reset.dto"
import type { NewPasswordDto } from "@/api/dto/auth/new-password.dto"

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

export const confirmEmail = async (data: ConfirmationDto) => {
  return authApi.confirmEmail(data)
}

export const requestPasswordRecovery = async (data: PasswordRecoveryResetDto) => {
  return authApi.requestPasswordRecovery(data)
}

export const setNewPassword = async (token: string, data: NewPasswordDto) => {
  return authApi.setNewPassword(token, data)
}

export { authApi }
