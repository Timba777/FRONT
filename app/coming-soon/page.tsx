"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { CountdownTimer } from "@/components/coming-soon/countdown-timer"
import { EarlyAccessForm } from "@/components/coming-soon/early-access-form"
import { BenefitsSection } from "@/components/coming-soon/benefits-section"
import { TelegramSection } from "@/components/coming-soon/telegram-section"
import { useAuth } from "@/context/auth-context"

export default function ComingSoonPage() {
  const router = useRouter()
  const { loading, isAuthenticated, checkAuth } = useAuth()
  // Calculate target date: 56 days from now
  const targetDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 56)
    return date
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      void checkAuth()
    }
  }, [isAuthenticated, checkAuth])

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/")
    }
  }, [loading, isAuthenticated, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex h-16 items-center px-6">
          <Link href="/">
            <Logo size={36} />
          </Link>
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
