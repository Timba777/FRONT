"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface SocialLoginButtonProps {
  icon: ReactNode
  provider: string
  onClick?: () => void
  disabled?: boolean
}

export function SocialLoginButton({ icon, provider, onClick, disabled = false }: SocialLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full justify-center gap-3 rounded-lg border-border/50 bg-background font-normal hover:bg-muted/50"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>Продолжить с {provider}</span>
    </Button>
  )
}