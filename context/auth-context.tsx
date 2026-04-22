"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { login as loginRequest, logout as logoutRequest, getMe } from "@/services/auth"
import { UserRole } from "@/types/user-role.enum"

export interface AuthUser {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  role?: UserRole
  [key: string]: unknown
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<AuthUser | null>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  setUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function extractUser(payload: unknown): AuthUser | null {
  if (!payload || typeof payload !== "object") return null

  if ("user" in payload && payload.user && typeof payload.user === "object") {
    return payload.user as AuthUser
  }

  if ("email" in payload || "id" in payload) {
    return payload as AuthUser
  }

  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const checkAuth = useCallback(async () => {
    // Не проверяем авторизацию во время выхода
    if (isLoggingOut) return
    
    try {
      setLoading(true)
      const payload = await getMe()
      setUser(extractUser(payload))
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [isLoggingOut])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      const payload = await loginRequest(email, password)
      const nextUser = extractUser(payload)

      if (nextUser) {
        setUser(nextUser)
        return nextUser
      }

      await checkAuth()
      return extractUser(payload)
    } finally {
      setLoading(false)
    }
  }, [checkAuth])

  const logout = useCallback(async () => {
    setIsLoggingOut(true)
    try {
      setLoading(true)
      await logoutRequest()
    } catch (error) {
      console.error("Logout API error:", error)
    } finally {
      setUser(null)
      setLoading(false)
      setIsLoggingOut(false)
    }
  }, [])

  useEffect(() => {
    // Не проверяем авторизацию во время выхода
    if (!isLoggingOut) {
      void checkAuth()
    }
  }, [checkAuth, isLoggingOut])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
    setUser,
  }), [user, loading, login, logout, checkAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
