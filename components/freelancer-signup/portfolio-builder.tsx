"use client"

import { useState } from "react"
import { Plus, Trash2, ImageIcon, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface PortfolioProject {
  id: string
  title: string
  description: string
  link: string
  imageUrl: string
}

interface PortfolioBuilderProps {
  projects: PortfolioProject[]
  onProjectsChange: (projects: PortfolioProject[]) => void
}

export function PortfolioBuilder({ projects, onProjectsChange }: PortfolioBuilderProps) {
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [newProject, setNewProject] = useState<Omit<PortfolioProject, "id">>({
    title: "",
    description: "",
    link: "",
    imageUrl: "",
  })

  const addProject = () => {
    if (newProject.title.trim()) {
      onProjectsChange([
        ...projects,
        { ...newProject, id: Date.now().toString() },
      ])
      setNewProject({ title: "", description: "", link: "", imageUrl: "" })
      setIsAddingProject(false)
    }
  }

  const removeProject = (id: string) => {
    onProjectsChange(projects.filter((p) => p.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProject((prev) => ({ ...prev, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      {projects.length > 0 && (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex gap-4">
                {project.imageUrl ? (
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground">{project.title}</h4>
                  {project.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Открыть проект
                    </a>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddingProject ? (
        <div className="space-y-4 rounded-xl border border-border bg-card p-4">
          <div className="space-y-2">
            <Label htmlFor="project-title" className="text-sm font-medium">
              Название проекта <span className="text-destructive">*</span>
            </Label>
            <Input
              id="project-title"
              placeholder="Например: Редизайн мобильного приложения"
              value={newProject.title}
              onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description" className="text-sm font-medium">
              Описание
            </Label>
            <Textarea
              id="project-description"
              placeholder="Краткое описание проекта..."
              value={newProject.description}
              onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-link" className="text-sm font-medium">
              Ссылка
            </Label>
            <Input
              id="project-link"
              type="url"
              placeholder="https://..."
              value={newProject.link}
              onChange={(e) => setNewProject((prev) => ({ ...prev, link: e.target.value }))}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Изображение</Label>
            <div className="flex items-center gap-4">
              {newProject.imageUrl ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <img
                    src={newProject.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setNewProject((prev) => ({ ...prev, imageUrl: "" }))}
                    className="absolute right-1 top-1 rounded-full bg-background/80 p-1 hover:bg-background"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="project-image"
                  className={cn(
                    "flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors",
                    "hover:border-primary hover:bg-primary/5"
                  )}
                >
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  <input
                    id="project-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
              <p className="text-sm text-muted-foreground">
                Загрузите изображение проекта (необязательно)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddingProject(false)
                setNewProject({ title: "", description: "", link: "", imageUrl: "" })
              }}
            >
              Отмена
            </Button>
            <Button
              type="button"
              onClick={addProject}
              disabled={!newProject.title.trim()}
            >
              Добавить
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full border-dashed"
          onClick={() => setIsAddingProject(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить проект
        </Button>
      )}

      {projects.length === 0 && !isAddingProject && (
        <>
          <p className="text-center text-sm text-muted-foreground">
            Добавьте проекты, чтобы показать свою работу потенциальным клиентам
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-muted/20 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground">
              Советы по портфолио:
            </h3>

            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Добавьте 3-6 лучших проектов</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Включите кейс-стади с результатами</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Покажите процесс, а не только финальный дизайн</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}