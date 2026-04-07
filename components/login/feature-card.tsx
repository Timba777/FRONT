"use client"

import { Check } from "lucide-react"

interface FeatureCardProps {
  text: string
}

export function FeatureCard({ text }: FeatureCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background p-4">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-4 w-4 text-primary" />
      </div>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  )
}
