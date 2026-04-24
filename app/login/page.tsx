"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { LeftPanel } from "@/components/login/left-panel"
import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  const router = useRouter()
  const { loading, isAuthenticated, checkAuth } = useAuth()

  useEffect(() => {
    let isMounted = true
    
    const initAuth = async () => {
      if (!isAuthenticated && !loading && isMounted) {
        await checkAuth()
      }
    }
    
    initAuth()
    
    return () => {
      isMounted = false
    }
  }, [])

  // Если пользователь уже авторизован - отправляем на coming-soon
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/coming-soon")
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col-reverse lg:flex-row">
      {/* Left Panel - Marketing Content */}
      <aside className="w-full bg-muted/30 lg:w-[42%]">
        <LeftPanel />
      </aside>

      {/* Right Panel - Login Form */}
      <section className="flex w-full flex-1 items-center justify-center bg-background lg:w-[58%]">
        <LoginForm />
      </section>
    </main>
  )
}