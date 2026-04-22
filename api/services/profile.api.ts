import { API_ENDPOINTS } from "@/api/client/api-endpoints"
import { apiClient } from "@/api/client/api-client"
import { errorProcessing } from "@/api/helpers/error-processing"
import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"
import type { CreateFullMasterProfileDto } from "@/api/dto/profile/create-full-master-profile.dto"
import type { UpdateFullCustomerProfileDto } from "@/api/dto/profile/update-full-customer-profile.dto"
import type { UpdateFullMasterProfileDto } from "@/api/dto/profile/update-full-master-profile.dto"

class ProfileApi {
  async getMyProfile() {
    try {
      return await apiClient.get(API_ENDPOINTS.PROFILE.MY_PROFILE)
    } catch (err) {
      throw errorProcessing(err, "получении профиля")
    }
  }

  async createFullCustomerProfile(data: CreateFullCustomerProfileDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.PROFILE.CREATE_CUSTOMER, data)
    } catch (err) {
      throw errorProcessing(err, "создании профиля клиента")
    }
  }

  async updateFullCustomerProfile(data: UpdateFullCustomerProfileDto) {
    try {
      return await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE_CUSTOMER, data)
    } catch (err) {
      throw errorProcessing(err, "обновлении профиля клиента")
    }
  }

  async createFullMasterProfile(data: CreateFullMasterProfileDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.PROFILE.CREATE_MASTER, data)
    } catch (err) {
      throw errorProcessing(err, "создании профиля мастера")
    }
  }

  async updateFullMasterProfile(data: UpdateFullMasterProfileDto) {
    try {
      return await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE_MASTER, data)
    } catch (err) {
      throw errorProcessing(err, "обновлении профиля мастера")
    }
  }

  /** `PATCH` + `multipart/form-data`, поле `file` — `API_ENDPOINTS.PROFILE.UPDATE_IMAGE`. */
  async updateProfileImage(file: File) {
    if (!(file instanceof File)) {
      throw new TypeError("updateProfileImage: expected a File from the file input")
    }
    if (file.size === 0) {
      throw new Error("Пустой файл: выберите другое изображение.")
    }
    const formData = new FormData()
    formData.append("file", file, file.name)

    try {
      return await apiClient.patchFormData(
        API_ENDPOINTS.PROFILE.UPDATE_IMAGE,
        formData
      )
    } catch (err) {
      throw errorProcessing(err, "загрузке изображения профиля")
    }
  }
}

export const profileApi = new ProfileApi()
