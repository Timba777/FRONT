"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const calculateStrength = () => {
    let strength = 0
    if (hasMinLength) strength++
    if (hasUpperCase) strength++
    if (hasLowerCase) strength++
    if (hasNumber) strength++
    if (hasSpecialChar) strength++
    return strength
  }

  const strength = calculateStrength()
  const percentage = (strength / 5) * 100

  const getStrengthLabel = () => {
    if (strength === 0) return ""
    if (strength <= 2) return "Слабый пароль"
    if (strength <= 3) return "Средний пароль"
    if (strength <= 4) return "Хороший пароль"
    return "Надежный пароль"
  }

  const getStrengthColor = () => {
    if (strength <= 2) return "bg-destructive"
    if (strength <= 3) return "bg-yellow-500"
    if (strength <= 4) return "bg-emerald-400"
    return "bg-emerald-500"
  }

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-all duration-300", getStrengthColor())}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span
          className={cn(
            "ml-3 text-xs font-medium",
            strength <= 2 && "text-destructive",
            strength === 3 && "text-yellow-600",
            strength >= 4 && "text-emerald-600"
          )}
        >
          {getStrengthLabel()}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className={cn("h-3 w-3", hasMinLength ? "text-emerald-500" : "text-muted-foreground/40")} />
        <span className={hasMinLength ? "text-emerald-600" : ""}>8+ символов</span>
      </div>
    </div>
  )
}
