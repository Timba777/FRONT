import { AxiosError } from "axios"
import { API_ENDPOINTS } from "@/api/client/api-endpoints"
import { apiClient } from "@/api/client/api-client"
import { errorProcessing } from "@/api/helpers/error-processing"
import type { LoginDto } from "@/api/dto/auth/login.dto"
import type { RegisterDto } from "@/api/dto/auth/register.dto"
import type { ConfirmationDto } from "@/api/dto/auth/confirmation.dto"
import type { PasswordRecoveryResetDto } from "@/api/dto/auth/password-recovery-reset.dto"
import type { NewPasswordDto } from "@/api/dto/auth/new-password.dto"

class AuthApi {
  async login(data: LoginDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data)
    } catch (err) {
      throw errorProcessing(err, "входе")
    }
  }

  async register(data: RegisterDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data)
    } catch (err) {
      throw errorProcessing(err, "регистрации")
    }
  }

  async getMe() {
    try {
      return await apiClient.get(API_ENDPOINTS.AUTH.ME)
    } catch (err: unknown) {
      // Public pages (login/signup/password recovery): 401 means "guest", not an app error.
      if (err instanceof AxiosError && err.response?.status === 401) {
        return null
      }
      throw errorProcessing(err, "получении пользователя")
    }
  }

  async logout() {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (err) {
      throw errorProcessing(err, "выходе")
    }
  }

  async confirmEmail(data: ConfirmationDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.EMAIL_CONFIRMATION, data)
    } catch (err) {
      throw errorProcessing(err, "подтверждении email")
    }
  }

  async requestPasswordRecovery(data: PasswordRecoveryResetDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.PASSWORD_RECOVERY.RESET, data)
    } catch (err) {
      throw errorProcessing(err, "запросе восстановления пароля")
    }
  }

  async setNewPassword(token: string, data: NewPasswordDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.PASSWORD_RECOVERY.NEW_PASSWORD(token), data)
    } catch (err) {
      throw errorProcessing(err, "установке нового пароля")
    }
  }
}

export const authApi = new AuthApi()
