"use client"

import type { CreateFullCustomerProfileDto } from "@/api/dto/profile/create-full-customer-profile.dto"
import type { CreateFullMasterProfileDto } from "@/api/dto/profile/create-full-master-profile.dto"

const PENDING_PROFILE_KEY = "pending_profile_submission_v1"

export type PendingProfileSubmission =
  | {
      kind: "customer"
      payload: CreateFullCustomerProfileDto
    }
  | {
      kind: "master"
      payload: CreateFullMasterProfileDto
    }

export function savePendingProfileSubmission(data: PendingProfileSubmission): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(data))
}

export function loadPendingProfileSubmission(): PendingProfileSubmission | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(PENDING_PROFILE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as PendingProfileSubmission
    if (
      parsed &&
      typeof parsed === "object" &&
      ("kind" in parsed && (parsed.kind === "customer" || parsed.kind === "master")) &&
      "payload" in parsed
    ) {
      return parsed
    }
  } catch {
    // Ignore malformed payload.
  }

  return null
}

export function clearPendingProfileSubmission(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(PENDING_PROFILE_KEY)
}

