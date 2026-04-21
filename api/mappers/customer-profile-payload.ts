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
  experienceLevels: string[]
  notifyTopMatches: boolean
  sendWeeklySummary: boolean
  autoInviteHighMatches: boolean
}

/** Values from `SettingsStep` hiring frequency buttons — must stay in sync with UI. */
const UI_HIRING_FREQUENCY = ["weekly", "monthly", "quarterly", "occasionally"] as const
export type UiHiringFrequency = (typeof UI_HIRING_FREQUENCY)[number]

/** Values from `SettingsStep` experience checkboxes — must stay in sync with UI. */
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

const UI_EXPERIENCE_RANK: Record<UiExperienceLevel, number> = {
  beginner: 1,
  intermediate: 2,
  expert: 3,
}

function mapExperienceRankToBackend(rank: number): LevelExperience {
  switch (rank) {
    case 1:
      return LevelExperience.Начинающий
    case 2:
      return LevelExperience.Средний
    case 3:
      return LevelExperience.Эксперт
    default:
      return LevelExperience.Средний
  }
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
 * Backend expects a single `LevelExperience`; the wizard allows multiple checkboxes.
 * Strategy: take the highest selected level (expert > intermediate > beginner).
 * If none selected, defaults to `Средний` (matches common default in UI defaults).
 */
/**
 * Maps wizard `experienceLevels: string[]` to a single backend `LevelExperience`
 * (highest selected level; default `Средний` if none).
 */
export function mapLevelExperience(levels: string[]): LevelExperience {
  let maxRank = 0
  for (const level of levels) {
    if (isUiExperienceLevel(level)) {
      const rank = UI_EXPERIENCE_RANK[level]
      if (rank > maxRank) maxRank = rank
    }
  }
  if (maxRank === 0) {
    return LevelExperience.Средний
  }
  return mapExperienceRankToBackend(maxRank)
}

/**
 * `budgetRange` is [min, max] in thousands (UI slider); backend expects one positive `number`.
 * Uses rounded midpoint; ensures value satisfies typical `@IsPositive()` rules.
 */
export function mapBudgetRangeToSingleBudget(range: [number, number]): number {
  const [min, max] = range
  const midpoint = Math.round((min + max) / 2)
  return Math.max(1, midpoint)
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
    budget: mapBudgetRangeToSingleBudget(settingsData.budgetRange),
    hiringFrequency: mapHiringFrequency(settingsData.hiringFrequency),
    preferenceLevelExperience: mapLevelExperience(settingsData.experienceLevels),
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
