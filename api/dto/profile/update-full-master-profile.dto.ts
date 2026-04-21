import type { UpdateMasterProfileDto } from "./update-master-profile.dto"
import type { UpdateUserProfileDto } from "./update-user-profile.dto"

/**
 * Aligns with backend `UpdateFullMasterProfileDto` (`PATCH /user-profile/update-master`).
 */
export interface UpdateFullMasterProfileDto {
  masterProfile: UpdateMasterProfileDto
  userProfile?: UpdateUserProfileDto
}
