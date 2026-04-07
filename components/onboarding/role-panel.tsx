"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BenefitList } from "./benefit-list"

interface RolePanelProps {
  icon: ReactNode
  title: string
  benefits: string[]
  ctaText: string
  href: string
  variant: "client" | "freelancer"
}

export function RolePanel({
  icon,
  title,
  benefits,
  ctaText,
  href,
  variant,
}: RolePanelProps) {
  const router = useRouter()
  const isClient = variant === "client"

  return (
    <div
      className={`flex h-full flex-col items-center justify-center px-8 py-12 lg:px-16 xl:px-24 ${
        isClient
          ? "bg-gradient-to-br from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8]"
          : "bg-background"
      }`}
    >
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Icon */}
        <div
          className={`mb-8 flex h-24 w-24 items-center justify-center rounded-full ${
            isClient
              ? "bg-white/20 backdrop-blur-sm"
              : "bg-gradient-to-br from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8]"
          }`}
        >
          <div className={isClient ? "text-white" : "text-white"}>
            {icon}
          </div>
        </div>

        {/* Title */}
        <h2
          className={`mb-8 text-3xl font-bold tracking-tight ${
            isClient ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>

        {/* Benefits */}
        <div className="mb-10 w-full">
          <BenefitList
            benefits={benefits}
            variant={isClient ? "dark" : "light"}
          />
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => router.push(href)}
          className={`h-14 w-full rounded-xl text-base font-medium transition-all hover:scale-[1.02] ${
            isClient
              ? "bg-white text-foreground shadow-lg hover:bg-white/95"
              : "bg-gradient-to-r from-[#a5b4fc] to-[#818cf8] text-white shadow-lg hover:from-[#818cf8] hover:to-[#6366f1]"
          }`}
        >
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
