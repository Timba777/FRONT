import { UserRole } from "@/types/user-role.enum"

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Администратор"
    case UserRole.MASTER:
      return "Фрилансер"
    case UserRole.CUSTOMER:
      return "Клиент"
    default:
      return role
  }
}
