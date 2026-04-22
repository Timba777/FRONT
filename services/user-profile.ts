/**
 * Backward-compatible shim — prefer `services/profile` (same as `auth` → `services/auth`).
 */
export {
  profileApi as userProfileApi,
  getMyProfile,
  createFullCustomerProfile,
  updateFullCustomerProfile,
  createFullMasterProfile,
  updateFullMasterProfile,
  updateProfileImage,
} from "./profile"
