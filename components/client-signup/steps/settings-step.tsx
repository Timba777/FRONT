"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface SettingsData {
  budgetRange: [number, number]
  hiringFrequency: string
  experienceLevels: string[]
  notifyTopMatches: boolean
  sendWeeklySummary: boolean
  autoInviteHighMatches: boolean
}

interface SettingsStepProps {
  data: SettingsData
  onChange: (data: SettingsData) => void
  errors: Partial<Record<keyof SettingsData, string>>
  touched: Partial<Record<keyof SettingsData, boolean>>
  onBlur: (field: keyof SettingsData) => void
}

const hiringFrequencies = [
  { value: "weekly", label: "Еженедельно" },
  { value: "monthly", label: "Ежемесячно" },
  { value: "quarterly", label: "Ежеквартально" },
  { value: "occasionally", label: "Иногда" },
]

const experienceOptions = [
  { value: "beginner", label: "Начальный" },
  { value: "intermediate", label: "Средний" },
  { value: "expert", label: "Эксперт" },
]

const formatBudget = (value: number) => {
  if (value === 0) return "0"
  if (value >= 500) return "500k+"
  return `${value}k`
}

export function SettingsStep({ data, onChange, errors, touched, onBlur }: SettingsStepProps) {
  const handleChange = <K extends keyof SettingsData>(field: K, value: SettingsData[K]) => {
    onChange({ ...data, [field]: value })
  }

  const toggleExperienceLevel = (level: string) => {
    const newLevels = data.experienceLevels.includes(level)
      ? data.experienceLevels.filter((l) => l !== level)
      : [...data.experienceLevels, level]
    handleChange("experienceLevels", newLevels)
  }

  const getBudgetDisplay = () => {
    const [min, max] = data.budgetRange
    if (min === 0 && max === 500) return "Любой бюджет"
    return `${formatBudget(min)} — ${formatBudget(max)} ₽`
  }

  return (
    <div className="space-y-8">
      {/* Budget Range */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">
          Типичный бюджет проекта <span className="text-destructive">*</span>
        </Label>
        <div className="px-1">
          <Slider
            value={data.budgetRange}
            onValueChange={(value) => handleChange("budgetRange", value as [number, number])}
            min={0}
            max={500}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">0</span>
          <span className="font-medium text-primary">{getBudgetDisplay()}</span>
          <span className="text-muted-foreground">500k+</span>
        </div>
        {touched.budgetRange && errors.budgetRange && (
          <p className="text-sm text-destructive">{errors.budgetRange}</p>
        )}
      </div>

      {/* Hiring Frequency */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Как часто вы нанимаете? <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {hiringFrequencies.map((freq) => (
            <button
              key={freq.value}
              type="button"
              onClick={() => {
                handleChange("hiringFrequency", freq.value)
                onBlur("hiringFrequency")
              }}
              className={cn(
                "rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                data.hiringFrequency === freq.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {freq.label}
            </button>
          ))}
        </div>
        {touched.hiringFrequency && errors.hiringFrequency && (
          <p className="text-sm text-destructive">{errors.hiringFrequency}</p>
        )}
      </div>

      {/* Experience Levels */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Предпочтительный уровень опыта
        </Label>
        <div className="space-y-2">
          {experienceOptions.map((exp) => (
            <label
              key={exp.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                checked={data.experienceLevels.includes(exp.value)}
                onCheckedChange={() => toggleExperienceLevel(exp.value)}
              />
              <span className="text-sm">{exp.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Settings */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Настройки ИИ для подбора
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifyTopMatches" className="text-sm font-normal text-foreground cursor-pointer">
              Уведомлять о новых топ-совпадениях
            </Label>
            <Switch
              id="notifyTopMatches"
              checked={data.notifyTopMatches}
              onCheckedChange={(checked) => handleChange("notifyTopMatches", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sendWeeklySummary" className="text-sm font-normal text-foreground cursor-pointer flex-1 pr-4">
              Отправлять еженедельную сводку рекомендованных фрилансеров
            </Label>
            <Switch
              id="sendWeeklySummary"
              checked={data.sendWeeklySummary}
              onCheckedChange={(checked) => handleChange("sendWeeklySummary", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoInviteHighMatches" className="text-sm font-normal text-foreground cursor-pointer flex-1 pr-4">
              Разрешить ИИ автоматически приглашать совпадения 95%+
            </Label>
            <Switch
              id="autoInviteHighMatches"
              checked={data.autoInviteHighMatches}
              onCheckedChange={(checked) => handleChange("autoInviteHighMatches", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
