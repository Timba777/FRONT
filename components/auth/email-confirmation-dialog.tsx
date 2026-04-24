"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EmailConfirmationDialogProps {
  open: boolean
  email: string
  onClose: () => void
  onEditEmail: () => void
  onResend?: (email: string) => Promise<void>
  editEmailLabel?: string
}

export function EmailConfirmationDialog({
  open,
  email,
  onClose,
  onEditEmail,
  onResend,
  editEmailLabel = "Изменить email адрес",
}: EmailConfirmationDialogProps) {
  const [isResending, setIsResending] = useState(false)
  const [hint, setHint] = useState<string | null>(null)

  const handleResend = async () => {
    setIsResending(true)
    try {
      if (onResend) {
        await onResend(email)
        setHint("Письмо отправлено повторно. Проверьте папку «Входящие» и «Спам».")
        return
      }

      // TODO: Call resend confirmation endpoint when backend provides it.
      setHint("Повторная отправка пока недоступна. Проверьте папку «Спам».")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Подтвердите email</DialogTitle>
          <DialogDescription>
            Мы отправили письмо с подтверждением на <span className="font-medium text-foreground">{email}</span>.
          </DialogDescription>
          <DialogDescription>
            Если письма нет во «Входящих», проверьте папку «Спам».
          </DialogDescription>
          {hint && <DialogDescription>{hint}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onEditEmail}>
            {editEmailLabel}
          </Button>
          <Button type="button" variant="secondary" onClick={handleResend} disabled={isResending}>
            {isResending ? "Отправка..." : "Отправить повторно"}
          </Button>
          <Button type="button" onClick={onClose}>
            Понятно
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

