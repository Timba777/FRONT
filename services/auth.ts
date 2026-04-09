import { api } from "@/lib/api"

export interface LoginPayload {
  email: string
  password: string
}

export type RegisterPayload = Record<string, unknown>

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password })
  return response.data
}

export const register = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register", data)
  return response.data
}

export const getMe = async () => {
  const response = await api.get("/auth/me")
  return response.data
}

export const logout = async () => {
  const response = await api.post("/auth/logout")
  return response.data
}
