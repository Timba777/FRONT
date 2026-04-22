import type { CreateCustomerProfileDto } from "./create-customer-profile.dto"
import type { UpdateUserProfileDto } from "./update-user-profile.dto"

/**
 * Aligns with backend `CreateFullCustomerProfileDto` (POST `/user-profile/create-customer`).
 */
export interface CreateFullCustomerProfileDto {
  customerProfile: CreateCustomerProfileDto
  userProfile?: UpdateUserProfileDto
}
