import { HiringFrequency } from "@/api/dto/profile/hiring-frequency.enum"
import { LevelExperience } from "@/api/dto/profile/level-experience.enum"
import type { CreateCustomerProfileDto } from "@/api/dto/profile/create-customer-profile.dto"

/**
 * Mirrors `components/client-signup/steps/*` wizard state (intentionally duplicated
 * to avoid importing UI components into the API layer).
 */
export interface ClientSignupProfileData {
  companyName: string
  companySize: string
  industry: string
  freelancerTypes: string[]
  howHeard: string
}

export interface ClientSignupSettingsData {
  budgetRange: [number, number]
  hiringFrequency: string
  experienceLevel: string
  notifyTopMatches: boolean
  sendWeeklySummary: boolean
  autoInviteHighMatches: boolean
}

/** Values from `SettingsStep` hiring frequency buttons — must stay in sync with UI. */
const UI_HIRING_FREQUENCY = ["weekly", "monthly", "quarterly", "occasionally"] as const
export type UiHiringFrequency = (typeof UI_HIRING_FREQUENCY)[number]

/** Values from `SettingsStep` experience level buttons — must stay in sync with UI. */
const UI_EXPERIENCE_LEVEL = ["beginner", "intermediate", "expert"] as const
export type UiExperienceLevel = (typeof UI_EXPERIENCE_LEVEL)[number]

const isUiHiringFrequency = (value: string): value is UiHiringFrequency =>
  (UI_HIRING_FREQUENCY as readonly string[]).includes(value)

const isUiExperienceLevel = (value: string): value is UiExperienceLevel =>
  (UI_EXPERIENCE_LEVEL as readonly string[]).includes(value)

const UI_HIRING_TO_BACKEND: Record<UiHiringFrequency, HiringFrequency> = {
  weekly: HiringFrequency.Еженедельно,
  monthly: HiringFrequency.Ежемесячно,
  quarterly: HiringFrequency.Ежеквартально,
  occasionally: HiringFrequency.Иногда,
}

const UI_EXPERIENCE_TO_BACKEND: Record<UiExperienceLevel, LevelExperience> = {
  beginner: LevelExperience.Начинающий,
  intermediate: LevelExperience.Средний,
  expert: LevelExperience.Эксперт,
}

/**
 * Maps Settings step `hiringFrequency` string to backend `HiringFrequency` enum.
 * @throws If UI introduces a new value without updating this map.
 */
export function mapHiringFrequency(uiValue: string): HiringFrequency {
  if (!isUiHiringFrequency(uiValue)) {
    throw new Error(
      `Unknown hiringFrequency UI value "${uiValue}". Expected one of: ${UI_HIRING_FREQUENCY.join(", ")}`
    )
  }
  return UI_HIRING_TO_BACKEND[uiValue]
}

/**
 * Maps single wizard `experienceLevel` to backend `LevelExperience`.
 * Empty string falls back to `Средний` (matches previous default intent).
 */
export function mapLevelExperience(uiValue: string): LevelExperience {
  const trimmed = uiValue.trim()
  if (trimmed.length === 0) {
    return LevelExperience.Средний
  }
  if (!isUiExperienceLevel(trimmed)) {
    throw new Error(
      `Unknown experienceLevel UI value "${uiValue}". Expected one of: ${UI_EXPERIENCE_LEVEL.join(", ")}`
    )
  }
  return UI_EXPERIENCE_TO_BACKEND[trimmed]
}

/**
 * Backend `budget`: upper bound of the wizard slider range (`budgetRange[1]`), per product/backend contract.
 */
export function mapBudgetFromBudgetRangeUpperBound(range: [number, number]): number {
  return range[1]
}

/**
 * Builds backend-ready `CreateCustomerProfileDto` from client signup wizard slices.
 */
export function buildCustomerProfilePayload(
  profileData: ClientSignupProfileData,
  settingsData: ClientSignupSettingsData
): CreateCustomerProfileDto {
  const nameCompany = profileData.companyName.trim()
  return {
    ...(nameCompany.length > 0 ? { nameCompany } : {}),
    sizeCompany: profileData.companySize.trim(),
    industry: profileData.industry.trim(),
    typeSpecialists: [...profileData.freelancerTypes],
    budget: mapBudgetFromBudgetRangeUpperBound(settingsData.budgetRange),
    hiringFrequency: mapHiringFrequency(settingsData.hiringFrequency),
    preferenceLevelExperience: mapLevelExperience(settingsData.experienceLevel),
  }
}

/**
 * Part 2 — Audit: wizard fields with no target on `CreateCustomerProfileDto` / `UpdateUserProfileDto`
 * (per current backend contracts). Safe to keep collecting in UI until backend adds columns/DTO fields.
 */
export const CUSTOMER_SIGNUP_FIELDS_WITHOUT_BACKEND_DTO_TARGET = [
  "howHeard",
  "notifyTopMatches",
  "sendWeeklySummary",
  "autoInviteHighMatches",
] as const

export type CustomerSignupFieldWithoutBackendDtoTarget =
  (typeof CUSTOMER_SIGNUP_FIELDS_WITHOUT_BACKEND_DTO_TARGET)[number]
