import type { LevelExperience } from "./level-experience.enum"
import type { TypePrice } from "./type-price.enum"

/**
 * Aligns with backend `CreateMasterProfileDto` (`POST /user-profile/create-master`).
 */
export interface CreateMasterProfileDto {
  specialization: string
  experienceYears: number
  portfolioUrl?: string
  descriptionProfile: string
  skills?: string[]
  price?: number
  location?: string
  levelExperience: LevelExperience
  typePrice: TypePrice
}
