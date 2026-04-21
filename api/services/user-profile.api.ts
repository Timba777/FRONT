import { API_ENDPOINTS } from "@/api/client/api-endpoints"
import { apiClient } from "@/api/client/api-client"
import { errorProcessing } from "@/api/helpers/error-processing"
import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"

class UserProfileApi {
  /**
   * Avatar / title image upload. Backend: `PATCH /user-profile/update-image`, field name `file`.
   */
  async updateProfileImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    try {
      return await apiClient.patchFormData(
        API_ENDPOINTS.USER_PROFILE.UPDATE_IMAGE,
        formData
      )
    } catch (err) {
      throw errorProcessing(err, "загрузке изображения профиля")
    }
  }

  /**
   * Creates customer profile after registration (requires authenticated CUSTOMER session).
   * Backend: `POST /user-profile/create-customer` with `CreateFullCustomerProfileDto`.
   */
  async createFullCustomerProfile(data: CreateFullCustomerProfileDto) {
    try {
      return await apiClient.post(API_ENDPOINTS.USER_PROFILE.CREATE_CUSTOMER, data)
    } catch (err) {
      throw errorProcessing(err, "создании профиля клиента")
    }
  }
}

export const userProfileApi = new UserProfileApi()
