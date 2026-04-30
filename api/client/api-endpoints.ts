export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    /** Same resource as `PROFILE.MY_PROFILE` — kept for existing `auth.api` / `getMe`. */
    ME: "/user-profile/my-profile",
    EMAIL_CONFIRMATION: "/auth/email-confirmation",
    PASSWORD_RECOVERY: {
      RESET: "/auth/password-recovery/reset",
      NEW_PASSWORD: (token: string) => `/auth/password-recovery/new-password/${token}`,
    },
  },
  /** User profile module — mirrors `auth` grouping (`api/services/profile.api.ts` + `services/profile.ts`). */
  PROFILE: {
    MY_PROFILE: "/user-profile/my-profile",
    CREATE_CUSTOMER: "/user-profile/create-customer",
    UPDATE_CUSTOMER: "/user-profile/update-customer",
    CREATE_MASTER: "/user-profile/create-master",
    UPDATE_MASTER: "/user-profile/update-master",
    UPDATE_IMAGE: "/user-profile/update-image",
  },
} as const
