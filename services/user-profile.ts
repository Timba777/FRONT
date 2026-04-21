import { userProfileApi } from "@/api/services/user-profile.api"
import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"

export const updateProfileImage = async (file: File) => {
  return userProfileApi.updateProfileImage(file)
}

export const createFullCustomerProfile = async (data: CreateFullCustomerProfileDto) => {
  return userProfileApi.createFullCustomerProfile(data)
}

export { userProfileApi }
