"use client"

import { useCallback, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { CountdownTimer } from "@/components/coming-soon/countdown-timer"
import { EarlyAccessForm } from "@/components/coming-soon/early-access-form"
import { BenefitsSection } from "@/components/coming-soon/benefits-section"
import { TelegramSection } from "@/components/coming-soon/telegram-section"
import { useAuth } from "@/context/auth-context"
import { authApi } from "@/services/auth"

export default function ComingSoonPage() {
  const router = useRouter()
  const { loading, isAuthenticated, checkAuth, logout: authLogout } = useAuth()
  
  const targetDate = useMemo(() => {
    const date = new Date('2026-04-21T00:00:00')
    date.setDate(date.getDate() + 56)
    return date
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await authLogout() // Это очистит состояние и установит loading
      // Используем window.location для полного сброса состояния
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
      // Даже если API вернул ошибку, очищаем локальное состояние
      await authLogout()
      window.location.href = "/"
    }
  }, [authLogout])

  // Проверяем авторизацию только при монтировании
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
  }, []) // Пустой массив зависимостей - только при монтировании

  // Редирект только когда точно известно, что пользователь не авторизован
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/")
    }
  }, [loading, isAuthenticated, router])

  // Пока идет проверка, показываем индикатор загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Если не авторизован - не показываем контент
  if (!isAuthenticated) {
    return null
  }

  // Только для авторизованных пользователей показываем страницу Coming Soon
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex h-16 items-center px-6 justify-between">
          <Link href="/">
            <Logo size={36} />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Выйти"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3335 14.1666L17.5002 9.99992L13.3335 5.83325"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 10H7.5"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Выйти</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center">
          {/* Sparkle Icon Badge */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>

          {/* Main Heading */}
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Скоро что-то невероятное
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg font-medium text-foreground">
            Light — AI-маркетплейс для фрилансеров
          </p>

          {/* Supporting Text */}
          <p className="mt-2 max-w-md text-muted-foreground">
            Мы создаём будущее фриланса. Станьте одним из первых, кто его испытает.
          </p>
        </section>

        {/* Countdown Section */}
        <section className="mt-12 flex flex-col items-center" aria-labelledby="coming-soon-countdown-heading">
          <h2
            id="coming-soon-countdown-heading"
            className="mb-6 text-sm font-medium tracking-widest text-muted-foreground"
          >
            ЗАПУСК ЧЕРЕЗ
          </h2>
          <CountdownTimer targetDate={targetDate} />
        </section>

        {/* Early Access Form */}
        <div className="mx-auto mt-12 max-w-md">
          <EarlyAccessForm />
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <BenefitsSection />
        </div>

        {/* Telegram Community Section */}
        <div className="mt-12">
          <TelegramSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo size={32} />
            <ul className="m-0 flex list-none flex-wrap gap-6 p-0 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Light. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}