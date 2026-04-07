"use client"

import { SkillSelector } from "../skill-selector"

interface SkillsStepProps {
  skills: string[]
  onSkillsChange: (skills: string[]) => void
  error?: string
}

export function SkillsStep({ skills, onSkillsChange, error }: SkillsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Добавьте навыки, которые описывают вашу экспертизу. Это поможет клиентам найти вас.
        </p>
        <p className="text-sm text-muted-foreground">
          Минимум 3 навыка обязательно.
        </p>
      </div>
      <SkillSelector
        selectedSkills={skills}
        onSkillsChange={onSkillsChange}
        error={error}
      />
    </div>
  )
}
