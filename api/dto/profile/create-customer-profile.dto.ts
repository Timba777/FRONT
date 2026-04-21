import type { HiringFrequency } from "@/api/dto/profile/hiring-frequency.enum"
import type { LevelExperience } from "@/api/dto/profile/level-experience.enum"

/**
 * Aligns with backend `CreateCustomerProfileDto` (user-profile module).
 */
export interface CreateCustomerProfileDto {
  nameCompany?: string
  sizeCompany: string
  industry: string
  typeSpecialists: string[]
  budget: number
  hiringFrequency: HiringFrequency
  preferenceLevelExperience: LevelExperience
}
