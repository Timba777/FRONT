import { API_ENDPOINTS } from "@/api/client/api-endpoints"
import { apiClient } from "@/api/client/api-client"
import { errorProcessing } from "@/api/helpers/error-processing"
import type { LoginDto } from "@/api/dto/auth/login.dto"
import type { RegisterDto } from "@/api/dto/auth/register.dto"
import type { ConfirmationDto } from "@/api/dto/auth/confirmation.dto"

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
    } catch (err) {
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
}

export const authApi = new AuthApi()
