"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface ProfileData {
  profileTitle: string
  description: string
  location: string
  experience: string
}

interface ProfileStepProps {
  data: ProfileData
  onChange: (data: ProfileData) => void
  errors: Partial<Record<keyof ProfileData, string>>
  touched: Partial<Record<keyof ProfileData, boolean>>
  onBlur: (field: keyof ProfileData) => void
}

const experienceOptions = [
  { value: "0-1", label: "Менее 1 года" },
  { value: "1-3", label: "1-3 года" },
  { value: "3-5", label: "3-5 лет" },
  { value: "5-10", label: "5-10 лет" },
  { value: "10+", label: "Более 10 лет" },
]

export function ProfileStep({ data, onChange, errors, touched, onBlur }: ProfileStepProps) {
  const handleChange = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      {/* Profile Title */}
      <div className="space-y-2">
        <Label htmlFor="profileTitle" className="text-sm font-medium">
          Заголовок профиля <span className="text-destructive">*</span>
        </Label>
        <Input
          id="profileTitle"
          placeholder="Например: UI/UX дизайнер, Full-stack разработчик"
          value={data.profileTitle}
          onChange={(e) => handleChange("profileTitle", e.target.value)}
          onBlur={() => onBlur("profileTitle")}
          className={`h-11 ${touched.profileTitle && errors.profileTitle ? "border-destructive focus-visible:ring-destructive" : ""}`}
          aria-invalid={touched.profileTitle && !!errors.profileTitle}
        />
        {touched.profileTitle && errors.profileTitle && (
          <p className="text-sm text-destructive">{errors.profileTitle}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          О себе
        </Label>
        <Textarea
          id="description"
          placeholder="Расскажите о своем опыте, навыках и том, что делает вас уникальным специалистом..."
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          {data.description.length}/500 символов
        </p>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-medium">
          Локация
        </Label>
        <Input
          id="location"
          placeholder="Москва, Россия"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="h-11"
        />
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <Label htmlFor="experience" className="text-sm font-medium">
          Опыт работы <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.experience}
          onValueChange={(value) => handleChange("experience", value)}
        >
          <SelectTrigger
            className={`h-11 w-full ${touched.experience && errors.experience ? "border-destructive focus:ring-destructive" : ""}`}
          >
            <SelectValue placeholder="Выберите опыт работы" />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.experience && errors.experience && (
          <p className="text-sm text-destructive">{errors.experience}</p>
        )}
      </div>
    </div>
  )
}
