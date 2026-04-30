"use client"

import { FormEvent, Suspense, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { setNewPassword } from "@/services/auth"

type FieldErrors = {
  password?: string
  passwordRepeat?: string
  general?: string
}

function NewPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token"), [searchParams])

  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {}

    if (!password) {
      nextErrors.password = "Пароль обязателен"
    } else if (password.length < 6) {
      nextErrors.password = "Пароль должен содержать минимум 6 символов"
    }

    if (!passwordRepeat) {
      nextErrors.passwordRepeat = "Повтор пароля обязателен"
    } else if (password !== passwordRepeat) {
      nextErrors.passwordRepeat = "Пароли не совпадают"
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!token) {
      setErrors({ general: "Ссылка восстановления недействительна" })
      return
    }

    const validationErrors = validate()
    if (validationErrors.password || validationErrors.passwordRepeat) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await setNewPassword(token, { password, passwordRepeat })
      setIsSuccess(true)
      setTimeout(() => {
        router.replace("/login")
      }, 1200)
    } catch (submitError: unknown) {
      setErrors({
        general:
          submitError instanceof Error
            ? submitError.message
            : "Не удалось изменить пароль. Попробуйте снова.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-destructive">Ссылка восстановления недействительна</p>
          <Button asChild className="mt-4 w-full">
            <Link href="/login">Перейти ко входу</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Новый пароль</h1>
          <p className="text-sm text-muted-foreground">Введите новый пароль для вашего аккаунта.</p>
        </div>

        {isSuccess ? (
          <p className="text-sm text-foreground">Пароль успешно изменен</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password-repeat">Повторите пароль</Label>
              <Input
                id="new-password-repeat"
                type="password"
                value={passwordRepeat}
                onChange={(event) => setPasswordRepeat(event.target.value)}
                aria-invalid={!!errors.passwordRepeat}
              />
              {errors.passwordRepeat && <p className="text-sm text-destructive">{errors.passwordRepeat}</p>}
            </div>

            {errors.general && <p className="text-sm text-destructive">{errors.general}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner className="h-4 w-4" /> : "Сохранить новый пароль"}
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  )
}
