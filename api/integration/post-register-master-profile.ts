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
      throw new Error("Невозможно определить опыт работы: выберите значение в шаге профиля.")
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
      throw new Error("Невозможно определить уровень опыта: выберите значение в шаге профиля.")
  }
}

export function buildCreateFullMasterProfileAfterFreelancerSignup(
  account: FreelancerSignupAccountSnapshot,
  profile: FreelancerSignupProfileSnapshot,
  skillsData: FreelancerSignupSkillsSnapshot
): CreateFullMasterProfileDto {
  const specialization = profile.profileTitle.trim()
  if (!specialization) {
    throw new Error("Укажите заголовок профиля перед созданием профиля мастера.")
  }

  const descriptionProfile = profile.description.trim()
  if (!descriptionProfile) {
    throw new Error("Укажите описание профиля перед созданием профиля мастера.")
  }

  const location = profile.location.trim()
  const cleanedSkills = skillsData.skills
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0)

  return {
    masterProfile: {
      specialization,
      experienceYears: mapExperienceToYears(profile.experience),
      descriptionProfile,
      skills: cleanedSkills.length > 0 ? cleanedSkills : undefined,
      location: location.length > 0 ? location : undefined,
      levelExperience: mapExperienceToLevel(profile.experience),
      // Backend validates enum; wizard has no control yet — hourly is a safe default.
      typePrice: TypePrice.Почасовая,
    },
    userProfile: buildUpdateUserProfileFromFullName(account.fullName),
  }
}

