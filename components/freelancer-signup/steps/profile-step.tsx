"use client"

import { useRef } from "react"
import { Camera, User } from "lucide-react"
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
import { cn } from "@/lib/utils"

interface ProfileData {
  avatarUrl: string
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange("avatarUrl", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-5">
      {/* Avatar Upload */}
      <div className="flex flex-col items-center space-y-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-border transition-colors",
            "hover:border-primary hover:bg-primary/5",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {data.avatarUrl ? (
            <>
              <img
                src={data.avatarUrl}
                alt="Загруженное фото профиля"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity hover:opacity-100">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1">
              <User className="h-8 w-8 text-muted-foreground" />
              <Camera className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
        />
        <p className="text-sm text-muted-foreground">Загрузите фото профиля</p>
      </div>

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
