import { buildCustomerProfilePayload } from "@/api/mappers/customer-profile-payload"
import type {
  ClientSignupProfileData,
  ClientSignupSettingsData,
} from "@/api/mappers/customer-profile-payload"
import { buildUpdateUserProfileFromFullName } from "@/api/mappers/update-user-profile-from-signup"
import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"

export interface ClientSignupAccountSnapshot {
  fullName: string
}

/**
 * Code-ready body for `POST /user-profile/create-customer` after registration + CUSTOMER session.
 *
 * Call site (recommended): `components/client-signup/client-signup-wizard.tsx` inside `handleSubmit`,
 * after successful `register` + `checkAuth`, **before** or **after** email-confirmation UX — product decision.
 * Do not call until session exists and user role is `CUSTOMER`.
 */
export function buildCreateFullCustomerProfileAfterClientSignup(
  account: ClientSignupAccountSnapshot,
  profileData: ClientSignupProfileData,
  settingsData: ClientSignupSettingsData
): CreateFullCustomerProfileDto {
  return {
    customerProfile: buildCustomerProfilePayload(profileData, settingsData),
    userProfile: buildUpdateUserProfileFromFullName(account.fullName),
  }
}
