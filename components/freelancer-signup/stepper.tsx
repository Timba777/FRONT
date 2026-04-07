"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Шаги регистрации" className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border mx-14" />
      
      {/* Progress bar fill */}
      <div 
        className="absolute top-5 left-0 h-0.5 bg-primary mx-14 transition-all duration-500 ease-out"
        style={{ 
          width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 7rem)`,
          marginLeft: '3.5rem'
        }}
      />

      <ol className="relative m-0 flex list-none items-start justify-between p-0">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep

          return (
            <li key={step.id} className="flex flex-col items-center">
              {/* Step circle */}
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 ease-out",
                  isCompleted && "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25",
                  isCurrent && "border-primary bg-background text-primary ring-4 ring-primary/10",
                  !isCompleted && !isCurrent && "border-border bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                ) : (
                  <span>{step.id}</span>
                )}
                
                {/* Pulse animation for current step */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" style={{ animationDuration: '2s' }} />
                )}
              </div>
              
              {/* Step label */}
              <span
                className={cn(
                  "mt-3 text-xs font-medium transition-all duration-300",
                  isCurrent && "text-foreground",
                  isCompleted && "text-primary",
                  !isCurrent && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
