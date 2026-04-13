import { API_ENDPOINTS } from "@/lib/api-endpoints"
import { apiClient } from "@/lib/api-client"
import { errorProcessing } from "@/lib/error-processing"

export type RegisterPayload = Record<string, unknown>

export interface LoginDto {
  email: string
  password: string
}

class AuthApi {
  async login(data: LoginDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data)
    } catch (err) {
      throw errorProcessing(err, "входе")
    }
  }

  async register(data: RegisterPayload) {
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
}

export const authApi = new AuthApi()
