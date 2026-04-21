import { profileApi } from "@/api/services/profile.api"
import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"
import type { CreateFullMasterProfileDto } from "@/api/dto/profile/create-full-master-profile.dto"
import type { UpdateFullCustomerProfileDto } from "@/api/dto/profile/update-full-customer-profile.dto"
import type { UpdateFullMasterProfileDto } from "@/api/dto/profile/update-full-master-profile.dto"

export const getMyProfile = async () => {
  return profileApi.getMyProfile()
}

export const createFullCustomerProfile = async (data: CreateFullCustomerProfileDto) => {
  return profileApi.createFullCustomerProfile(data)
}

export const updateFullCustomerProfile = async (data: UpdateFullCustomerProfileDto) => {
  return profileApi.updateFullCustomerProfile(data)
}

export const createFullMasterProfile = async (data: CreateFullMasterProfileDto) => {
  return profileApi.createFullMasterProfile(data)
}

export const updateFullMasterProfile = async (data: UpdateFullMasterProfileDto) => {
  return profileApi.updateFullMasterProfile(data)
}

export const updateProfileImage = async (file: File) => {
  return profileApi.updateProfileImage(file)
}

export { profileApi }
