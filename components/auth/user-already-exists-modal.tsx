"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UserAlreadyExistsModalProps {
  open: boolean
  onClose: () => void
}

export function UserAlreadyExistsModal({ open, onClose }: UserAlreadyExistsModalProps) {
  const router = useRouter()

  const goToLogin = () => {
    onClose()
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Пользователь уже существует</DialogTitle>
          <DialogDescription>
            Аккаунт с таким email уже зарегистрирован. Попробуйте войти или используйте другой email.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button type="button" onClick={goToLogin}>
            Перейти ко входу
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
