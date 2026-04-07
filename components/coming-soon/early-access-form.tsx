"use client"

import { useState } from "react"
import { Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export function EarlyAccessForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError("Email обязателен")
      return
    }
    
    if (!validateEmail(email)) {
      setError("Неверный формат email")
      return
    }

    setError("")
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-foreground">
            Вы в списке!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Мы уведомим вас о запуске Light на {email}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="text-center text-xl font-semibold text-foreground">
        Получите ранний доступ
      </h3>
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError("")
            }}
            className={`h-11 pl-10 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        
        <Button
          type="submit"
          className="h-12 w-full rounded-lg text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="h-5 w-5" /> : "Уведомить о запуске"}
        </Button>
      </form>
      
      <div className="mt-4 space-y-1 text-center">
        <p className="text-xs text-muted-foreground">
          Я согласен получать обновления о запуске Light
        </p>
        <p className="text-xs text-muted-foreground/70">
          Никакого спама, только новости о запуске. Отписаться можно в любой момент.
        </p>
      </div>
    </div>
  )
}
