import { authApi, type LoginDto, type RegisterPayload } from "@/services/endpoints/auth"

export interface LoginPayload extends LoginDto {}

export type { RegisterPayload }

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
