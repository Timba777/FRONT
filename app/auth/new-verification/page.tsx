"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { confirmEmail } from "@/services/auth"

type VerificationStatus = "idle" | "loading" | "success" | "error"

export default function NewVerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<VerificationStatus>("idle")
  const [message, setMessage] = useState("")

  const token = useMemo(() => searchParams.get("token"), [searchParams])

  useEffect(() => {
    let isCancelled = false

    const verifyEmail = async () => {
      if (!token) {
        if (!isCancelled) {
          setStatus("error")
          setMessage("Ссылка подтверждения не содержит токен.")
        }
        return
      }

      try {
        if (!isCancelled) {
          setStatus("loading")
        }

        await confirmEmail({ token })

        if (!isCancelled) {
          setStatus("success")
          setMessage("Email подтвержден. Перенаправляем на главную...")
        }

        setTimeout(() => {
          if (!isCancelled) {
            router.replace("/")
          }
        }, 1200)
      } catch {
        if (!isCancelled) {
          setStatus("error")
          setMessage("Не удалось подтвердить email. Ссылка может быть недействительной или устаревшей.")
        }
      }
    }

    void verifyEmail()

    return () => {
      isCancelled = true
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

        {status === "success" && <p className="text-sm text-foreground">{message}</p>}

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

