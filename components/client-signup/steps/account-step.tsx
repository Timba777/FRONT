"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordStrength } from "@/components/freelancer-signup/password-strength"

interface AccountData {
  fullName: string
  email: string
  password: string
  agreeToTerms: boolean
}

interface AccountStepProps {
  data: AccountData
  onChange: (data: AccountData) => void
  errors: Partial<Record<keyof AccountData, string>>
  touched: Partial<Record<keyof AccountData, boolean>>
  onBlur: (field: keyof AccountData) => void
}

export function AccountStep({ data, onChange, errors, touched, onBlur }: AccountStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field: keyof AccountData, value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium">
          Имя и фамилия <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="Иван Петров"
          value={data.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          onBlur={() => onBlur("fullName")}
          className={`h-11 ${touched.fullName && errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}`}
          aria-invalid={touched.fullName && !!errors.fullName}
        />
        {touched.fullName && errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="ivan@company.com"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          className={`h-11 ${touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
          aria-invalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Пароль <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => onBlur("password")}
            className={`h-11 pr-10 ${touched.password && errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
            aria-invalid={touched.password && !!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <PasswordStrength password={data.password} />
        {touched.password && errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm leading-6 cursor-pointer">
          <Checkbox
            id="terms"
            checked={data.agreeToTerms}
            onCheckedChange={(checked) => handleChange("agreeToTerms", checked as boolean)}
            className="mt-1 shrink-0"
          />

          <span className="text-muted-foreground">
            Я согласен с{" "}
            <a href="#" className="text-primary hover:underline">
              Условиями обслуживания
            </a>{" "}
            и{" "}
            <a href="#" className="text-primary hover:underline">
              Политикой конфиденциальности
            </a>{" "}
            Light
          </span>
        </label>

        {touched.agreeToTerms && errors.agreeToTerms && (
          <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
        )}
      </div>
    </div>
  )
}
