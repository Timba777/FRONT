import type { LevelExperience } from "./level-experience.enum"
import type { TypePrice } from "./type-price.enum"
import type { UserStatus } from "./user-status.enum"

/**
 * Aligns with backend `UpdateMasterProfileDto` (`PATCH /user-profile/update-master`).
 */
export interface UpdateMasterProfileDto {
  specialization?: string
  experienceYears?: number
  portfolioUrl?: string
  descriptionProfile?: string
  skills?: string[]
  price?: number
  status?: UserStatus
  location?: string
  levelExperience?: LevelExperience
  typePrice?: TypePrice
}
