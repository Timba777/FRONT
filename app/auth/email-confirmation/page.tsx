"use client";
export const dynamic = 'force-dynamic';

import { useEffect, useMemo, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { confirmEmail } from "@/services/auth"

type ConfirmationStatus = "idle" | "loading" | "success" | "error"

function EmailConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<ConfirmationStatus>("idle")
  const [message, setMessage] = useState<string>("")

  const token = useMemo(() => searchParams.get("token"), [searchParams])

  useEffect(() => {
    let cancelled = false

    const runConfirmation = async () => {
      if (!token) {
        if (!cancelled) {
          setStatus("error")
          setMessage("Ссылка подтверждения не содержит токен.")
        }
        return
      }

      try {
        if (!cancelled) {
          setStatus("loading")
        }

        await confirmEmail({ token })

        if (!cancelled) {
          setStatus("success")
          setMessage("Email успешно подтвержден. Выполняем вход...")
        }

        setTimeout(() => {
          if (!cancelled) {
            router.replace("/")
          }
        }, 1200)
      } catch {
        if (!cancelled) {
          setStatus("error")
          setMessage("Не удалось подтвердить email. Возможно, ссылка устарела.")
        }
      }
    }

    void runConfirmation()

    return () => {
      cancelled = true
    }
  }, [router, token])

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        {status === "loading" && (
          <div className="flex items-center gap-3">
            <Spinner className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">Подтверждаем email...</p>
          </div>
        )}

        {status === "success" && (
          <p className="text-sm text-foreground">{message}</p>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <p className="text-sm text-destructive">{message}</p>
            <Button asChild>
              <Link href="/">Перейти на главную</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

export default function EmailConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <EmailConfirmationContent />
    </Suspense>
  )
}