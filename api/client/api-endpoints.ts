export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    ME: "/user-profile/my-profile",
    EMAIL_CONFIRMATION: "/auth/email-confirmation",
  },
  USER_PROFILE: {
    MY_PROFILE: "/user-profile/my-profile",
    CREATE_CUSTOMER: "/user-profile/create-customer",
    UPDATE_CUSTOMER: "/user-profile/update-customer",
    UPDATE_IMAGE: "/user-profile/update-image",
  },
} as const
