"use client"

import { useEffect, useState } from "react"
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
  const [internalOpen, setInternalOpen] = useState(open)

  // Синхронизируем internalOpen с пропом open
  useEffect(() => {
    console.log(`Open prop changed to: ${open}`)
    setInternalOpen(open)
  }, [open])

  const handleOpenChange = (next: boolean) => {
    console.log('Dialog onOpenChange:', next)
    if (!next) {
      onClose()
      setInternalOpen(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      if (onResend) {
        await onResend(email)
        setHint("Письмо отправлено повторно. Проверьте папку «Входящие» и «Спам».")
        return
      }
      setHint("Повторная отправка пока недоступна. Проверьте папку «Спам».")
    } finally {
      setIsResending(false)
    }
  }

  useEffect(() => {
    console.log(`Internal open state: ${internalOpen}`)
  }, [internalOpen])

  return (
    <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
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