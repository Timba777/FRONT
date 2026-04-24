"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProfileData {
  companyName: string
  companySize: string
  industry: string
  freelancerTypes: string[]
  howHeard: string
}

interface ProfileStepProps {
  data: ProfileData
  onChange: (data: ProfileData) => void
  errors: Partial<Record<keyof ProfileData, string>>
  touched: Partial<Record<keyof ProfileData, boolean>>
  onBlur: (field: keyof ProfileData) => void
}

const companySizes = [
  { value: "1", label: "1 человек" },
  { value: "2-10", label: "2-10 человек" },
  { value: "11-50", label: "11-50 человек" },
  { value: "51-200", label: "51-200 человек" },
  { value: "201-500", label: "201-500 человек" },
  { value: "500+", label: "500+ человек" },
]

const industries = [
  { value: "tech", label: "Технологии" },
  { value: "finance", label: "Финансы" },
  { value: "healthcare", label: "Здравоохранение" },
  { value: "education", label: "Образование" },
  { value: "ecommerce", label: "Электронная коммерция" },
  { value: "marketing", label: "Маркетинг" },
  { value: "media", label: "Медиа и развлечения" },
  { value: "consulting", label: "Консалтинг" },
  { value: "other", label: "Другое" },
]

const defaultFreelancerTypes = [
  "Дизайнеры",
  "Разработчики",
  "Копирайтеры",
  "Маркетологи",
]

const howHeardOptions = [
  { value: "search", label: "Поисковая система" },
  { value: "social", label: "Социальные сети" },
  { value: "friend", label: "Рекомендация друга" },
  { value: "ad", label: "Реклама" },
  { value: "other", label: "Другое" },
]

export function ProfileStep({ data, onChange, errors, touched, onBlur }: ProfileStepProps) {
  const [customType, setCustomType] = useState("")

  const handleChange = (field: keyof ProfileData, value: string | string[]) => {
    onChange({ ...data, [field]: value })
  }

  const toggleFreelancerType = (type: string) => {
    const newTypes = data.freelancerTypes.includes(type)
      ? data.freelancerTypes.filter((t) => t !== type)
      : [...data.freelancerTypes, type]
    handleChange("freelancerTypes", newTypes)
  }

  const addCustomType = () => {
    if (customType.trim() && !data.freelancerTypes.includes(customType.trim())) {
      handleChange("freelancerTypes", [...data.freelancerTypes, customType.trim()])
      setCustomType("")
    }
  }

  const removeType = (type: string) => {
    handleChange("freelancerTypes", data.freelancerTypes.filter((t) => t !== type))
  }

  return (
    <div className="space-y-5">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium">
          Название компании <span className="text-muted-foreground">(необязательно)</span>
        </Label>
        <Input
          id="companyName"
          placeholder="ООО Компания"
          value={data.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="h-11"
        />
      </div>

      {/* Company Size */}
      <div className="space-y-2">
        <Label htmlFor="companySize" className="text-sm font-medium">
          Размер компании <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.companySize}
          onValueChange={(value) => handleChange("companySize", value)}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Выберите размер" />
          </SelectTrigger>
          <SelectContent>
            {companySizes.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">
          Индустрия <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.industry}
          onValueChange={(value) => {
            handleChange("industry", value)
            onBlur("industry")
          }}
        >
          <SelectTrigger
            className={cn(
              "h-11 w-full",
              touched.industry && errors.industry && "border-destructive focus:ring-destructive"
            )}
          >
            <SelectValue placeholder="Выберите индустрию" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry.value} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {touched.industry && errors.industry && (
          <p className="text-sm text-destructive">{errors.industry}</p>
        )}
      </div>

      {/* Freelancer Types */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Какой тип фрилансеров вы обычно нанимаете? <span className="text-destructive">*</span>
        </Label>
        
        {/* Selected Types */}
        {data.freelancerTypes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.freelancerTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
              >
                {type}
                <button
                  type="button"
                  onClick={() => removeType(type)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  aria-label={`Удалить ${type}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Default Type Chips */}
        <div className="flex flex-wrap gap-2">
          {defaultFreelancerTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleFreelancerType(type)}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                data.freelancerTypes.includes(type)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Custom Type Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Добавить свой вариант"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomType()
              }
            }}
            className="h-10 flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCustomType}
            disabled={!customType.trim()}
            className="h-10 px-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Добавить
          </Button>
        </div>

        {touched.freelancerTypes && errors.freelancerTypes && (
          <p className="text-sm text-destructive">{errors.freelancerTypes}</p>
        )}
      </div>

      {/* How Heard */}
      <div className="space-y-2">
        <Label htmlFor="howHeard" className="text-sm font-medium">
          Как вы узнали о нас? <span className="text-muted-foreground">(необязательно)</span>
        </Label>
        <Select
          value={data.howHeard}
          onValueChange={(value) => handleChange("howHeard", value)}
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Выберите вариант" />
          </SelectTrigger>
          <SelectContent>
            {howHeardOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
