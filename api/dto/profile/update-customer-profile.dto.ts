import type { HiringFrequency } from "./hiring-frequency.enum"
import type { LevelExperience } from "./level-experience.enum"

/**
 * Aligns with backend `UpdateCustomerProfileDto` (PATCH nested `customerProfile`).
 * All fields optional at runtime for partial updates.
 */
export interface UpdateCustomerProfileDto {
  nameCompany?: string
  sizeCompany?: string
  industry?: string
  typeSpecialists?: string[]
  budget?: number
  hiringFrequency?: HiringFrequency
  preferenceLevelExperience?: LevelExperience
}
