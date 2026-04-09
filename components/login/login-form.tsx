"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { SocialLoginButton } from "./social-login-button"
import { login } from "@/services/auth"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})

  const validateEmail = (value: string) => {
    if (!value) return "Email обязателен"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Неверный формат email"
    return undefined
  }

  const validatePassword = (value: string) => {
    if (!value) return "Пароль обязателен"
    return undefined
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
    }
  }

  const isFormValid = !validateEmail(email) && !validatePassword(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setTouched({ email: true, password: true })
    setErrors({ email: emailError, password: passwordError })
    
    if (emailError || passwordError) return
    
    setIsLoading(true)
    try {
      await login(email, password)
      router.push("/coming-soon")
    } catch {
      setErrors((prev) => ({
        ...prev,
        password: "Не удалось войти. Проверьте данные и попробуйте снова",
      }))
      setTouched((prev) => ({ ...prev, password: true }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold text-foreground">Light</span>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Добро пожаловать в Light
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Войдите, чтобы продолжить
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="alex@company.com или maria@portfolio.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`h-11 ${touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Пароль <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`h-11 pr-10 ${touched.password && errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p id="password-error" className="text-sm text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm text-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              Забыли пароль?
            </a>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-12 w-full rounded-lg text-base font-medium"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <Spinner className="h-5 w-5" /> : "Войти"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">или</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <SocialLoginButton
            icon={
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
            provider="Google"
            onClick={() => router.push("/register")}
          />
          <SocialLoginButton
            icon={
              <svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            provider="LinkedIn"
            onClick={() => router.push("/register")}
          />
          <SocialLoginButton
            icon={
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
            }
            provider="Apple"
            onClick={() => router.push("/register")}
          />
        </div>

        {/* Sign Up Links */}
        <div className="mt-8 text-center">
          <span className="text-sm text-muted-foreground">Нет аккаунта? </span>
          <Link
            href="/signup/client"
            className="text-sm font-medium text-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Присоединиться как заказчик
          </Link>
          <span className="mx-2 text-muted-foreground">•</span>
          <Link
            href="/signup/freelancer"
            className="text-sm font-medium text-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Присоединиться как фрилансер
          </Link>
        </div>

        {/* Remember Me */}
        <div className="mt-6 flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
            Запомнить меня
          </Label>
        </div>
      </div>
    </div>
  )
}
