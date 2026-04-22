import type { UpdateCustomerProfileDto } from "./update-customer-profile.dto"
import type { UpdateUserProfileDto } from "./update-user-profile.dto"

/**
 * Aligns with backend `UpdateFullCustomerProfileDto` (`PATCH /user-profile/update-customer`).
 */
export interface UpdateFullCustomerProfileDto {
  customerProfile: UpdateCustomerProfileDto
  userProfile?: UpdateUserProfileDto
}
