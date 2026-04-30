"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { requestPasswordRecovery } from "@/services/auth"

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (value: string) => {
    if (!value) return "Email обязателен"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Неверный формат email"
    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const emailError = validateEmail(email.trim())
    if (emailError) {
      setError(emailError)
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      await requestPasswordRecovery({ email: email.trim() })
      setIsSuccess(true)
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить письмо. Попробуйте снова.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Восстановление пароля</h1>
          <p className="text-sm text-muted-foreground">Укажите email, и мы отправим ссылку для смены пароля.</p>
        </div>

        {isSuccess ? (
          <div className="space-y-4">
            <p className="text-sm text-foreground">
              Мы отправили письмо для восстановления пароля на указанный email
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Вернуться ко входу</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recovery-email">Email</Label>
              <Input
                id="recovery-email"
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={!!error}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner className="h-4 w-4" /> : "Отправить письмо"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                Вернуться ко входу
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
