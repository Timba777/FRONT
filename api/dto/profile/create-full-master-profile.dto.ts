import type { CreateMasterProfileDto } from "./create-master-profile.dto"
import type { UpdateUserProfileDto } from "./update-user-profile.dto"

/**
 * Aligns with backend `CreateFullMasterProfileDto` (`POST /user-profile/create-master`).
 */
export interface CreateFullMasterProfileDto {
  masterProfile: CreateMasterProfileDto
  userProfile?: UpdateUserProfileDto
}
