"use client"

import { PortfolioBuilder, type PortfolioProject } from "../portfolio-builder"

interface PortfolioStepProps {
  projects: PortfolioProject[]
  onProjectsChange: (projects: PortfolioProject[]) => void
}

export function PortfolioStep({ projects, onProjectsChange }: PortfolioStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Покажите свои лучшие работы потенциальным клиентам. 
          Добавьте проекты, которыми вы гордитесь.
        </p>
        <p className="text-sm text-muted-foreground">
          Этот шаг можно пропустить и заполнить позже.
        </p>
      </div>
      <PortfolioBuilder
        projects={projects}
        onProjectsChange={onProjectsChange}
      />
    </div>
  )
}
