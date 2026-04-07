"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const suggestedSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "UI/UX дизайн",
  "Figma",
  "JavaScript",
  "Next.js",
  "Tailwind CSS",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Vue.js",
  "Angular",
  "Swift",
  "Kotlin",
  "Иллюстрация",
]

interface SkillSelectorProps {
  selectedSkills: string[]
  onSkillsChange: (skills: string[]) => void
  error?: string
}

export function SkillSelector({ selectedSkills, onSkillsChange, error }: SkillSelectorProps) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = (skill: string) => {
    const trimmed = skill.trim()
    if (trimmed && !selectedSkills.includes(trimmed)) {
      onSkillsChange([...selectedSkills, trimmed])
    }
    setInputValue("")
  }

  const removeSkill = (skill: string) => {
    onSkillsChange(selectedSkills.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(inputValue)
    }
  }

  const availableSuggestions = suggestedSkills.filter(
    (skill) => !selectedSkills.includes(skill)
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Введите навык и нажмите Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-11"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            onClick={() => addSkill(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 rounded-full p-0.5 hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Suggested Skills */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Популярные навыки:</p>
        <div className="flex flex-wrap gap-2">
          {availableSuggestions.slice(0, 12).map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => addSkill(skill)}
              className={cn(
                "rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors",
                "hover:border-primary hover:bg-primary/5 hover:text-primary",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
