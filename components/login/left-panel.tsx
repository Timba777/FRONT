"use client"

import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./feature-card"
import { TestimonialCard } from "./testimonial-card"

const features = [
  "Находите идеальные совпадения за часы, а не недели",
  "Безопасные эскроу-платежи на каждом проекте",
  "AI, который изучает ваши предпочтения",
  "Присоединяйтесь к 50 000+ фрилансеров и заказчиков",
]

const testimonials = [
  {
    quote: "Light сократил время найма с 2 недель до 2 часов",
    author: "Алексей",
    role: "Tech-основатель",
  },
  {
    quote: "Я получаю проекты, которые действительно соответствуют моим навыкам",
    author: "Мария",
    role: "Продуктовый дизайнер",
  },
]

export function LeftPanel() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col justify-between px-8 py-12 lg:px-12">
      <div className="space-y-8">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 h-16 w-16">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
            >
              <rect
                width="64"
                height="64"
                rx="22"
                fill="url(#paint0_linear_32_2)"
              />
              <g clipPath="url(#clip0_32_2)">
                <path
                  d="M22.8836 40.9729C19.3365 44.35 15.7894 47.7272 12.2381 51.1044C12.1588 37.4041 12.0794 23.7003 12 10H22.8836V40.9729Z"
                  fill="#101073"
                />
                <path
                  d="M45.1815 43.4056C47.4543 46.3106 49.7272 49.2156 52 52.124C39.7919 52.213 27.5839 52.302 15.3758 52.3875C18.3631 49.3935 21.3503 46.3996 24.3376 43.4056H45.1815Z"
                  fill="#101073"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_32_2"
                  x1="32"
                  y1="0"
                  x2="32"
                  y2="64"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.293269" stopColor="#BCE7F6" stopOpacity="0.29" />
                  <stop offset="0.9999" stopColor="#395AEF" stopOpacity="0.78" />
                </linearGradient>
                <clipPath id="clip0_32_2">
                  <rect
                    width="40"
                    height="43"
                    fill="white"
                    transform="translate(12 10)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Light</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ваш AI-маркетплейс для фриланса
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} text={feature} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <Button
          variant="outline"
          className="w-full rounded-full border-primary text-primary hover:bg-primary/5"
          onClick={() => router.push("/register")}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Новичок в Light? Присоединяйтесь сейчас
        </Button>
      </div>
    </div>
  )
}
