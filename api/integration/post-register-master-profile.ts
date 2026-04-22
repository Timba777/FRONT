import { LevelExperience } from "@/api/dto/profile/level-experience.enum"
import { TypePrice } from "@/api/dto/profile/type-price.enum"
import type { CreateFullMasterProfileDto } from "@/api/dto/profile/create-full-master-profile.dto"
import { buildUpdateUserProfileFromFullName } from "@/api/mappers/update-user-profile-from-signup"

export interface FreelancerSignupAccountSnapshot {
  fullName: string
}

export interface FreelancerSignupProfileSnapshot {
  profileTitle: string
  description: string
  location: string
  experience: string
}

export interface FreelancerSignupSkillsSnapshot {
  skills: string[]
}

function mapExperienceToYears(value: string): number {
  switch (value) {
    case "0-1":
      return 0.5
    case "1-3":
      return 2
    case "3-5":
      return 4
    case "5-10":
      return 7
    case "10+":
      return 10
    default:
      return 1
  }
}

function mapExperienceToLevel(value: string): LevelExperience {
  switch (value) {
    case "0-1":
      return LevelExperience.Начинающий
    case "1-3":
    case "3-5":
      return LevelExperience.Средний
    case "5-10":
    case "10+":
      return LevelExperience.Эксперт
    default:
      return LevelExperience.Средний
  }
}

export function buildCreateFullMasterProfileAfterFreelancerSignup(
  account: FreelancerSignupAccountSnapshot,
  profile: FreelancerSignupProfileSnapshot,
  skillsData: FreelancerSignupSkillsSnapshot
): CreateFullMasterProfileDto {
  const specialization = profile.profileTitle.trim() || "Фрилансер"
  const descriptionProfile = profile.description.trim() || specialization

  return {
    masterProfile: {
      specialization,
      experienceYears: mapExperienceToYears(profile.experience),
      descriptionProfile,
      skills: skillsData.skills,
      location: profile.location.trim() || undefined,
      levelExperience: mapExperienceToLevel(profile.experience),
      // Default price mode until dedicated UI field is introduced.
      typePrice: TypePrice.Почасовая,
    },
    userProfile: buildUpdateUserProfileFromFullName(account.fullName),
  }
}

