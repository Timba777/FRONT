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
 * Payload shape (backend):
 * `{ "customerProfile": { ... }, "userProfile": { ... } }` — `userProfile` may be `{}` if nothing to patch.
 *
 * **When to send:** only after **step 3 (Настройки)** is complete — `customerProfile` needs both
 * step 2 (company / industry / specialists) and step 3 (budget / hiring / experience). Do **not** call
 * right after leaving step 2; the natural place is the same flow as final submit (e.g. after `register` +
 * `checkAuth` in `handleSubmit`), once you explicitly decide to wire `createFullCustomerProfile`.
 *
 * Do not call `createFullCustomerProfile` until product explicitly enables it (session + CUSTOMER role required).
 */
export function buildCreateFullCustomerProfileAfterClientSignup(
  account: ClientSignupAccountSnapshot,
  profileData: ClientSignupProfileData,
  settingsData: ClientSignupSettingsData
): CreateFullCustomerProfileDto {
  const userProfile = buildUpdateUserProfileFromFullName(account.fullName)
  return {
    customerProfile: buildCustomerProfilePayload(profileData, settingsData),
    userProfile,
  }
}
