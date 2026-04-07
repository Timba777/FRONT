import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const features = [
  "Интеллектуальный подбор навыков в зависимости от сложности проекта",
  "Доступность в режиме реального времени и согласование часовых поясов",
  "Анализ портфолио и проверка качества",
  "Честный рейтинг",
]

const freelancerMatches = [
  {
    name: "Александра Трусова",
    role: "Разработчик",
    rate: "3000 руб/час",
    match: 98,
  },
  {
    name: "Михаил Петров",
    role: "UI/UX Дизайнер",
    rate: "1500 руб/час",
    match: 96,
  },
  {
    name: "Елена Смирнова",
    role: "Менеджер проектов",
    rate: "2500 руб/час",
    match: 94,
  },
]

export function AITechnologySection() {
  return (
    <section className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div>
            <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              AI-Powered Matching
            </Badge>
            
            <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Технология, которая понимает ваши потребности
            </h2>
            
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Наш AI не просто подбирает ключевые слова. Он понимает контекст, оценивает портфолио и учитывает доступность, чтобы найти фрилансеров, которые действительно соответствуют требованиям вашего проекта.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Freelancer Matches Card */}
          <div className="relative">
            <Card className="overflow-hidden border-border/50 shadow-lg">
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-5 py-4">
                  <span className="text-sm font-medium text-foreground">
                    Лучшие варианты для вашего проекта
                  </span>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    3 найдено
                  </Badge>
                </div>

                {/* Freelancer List */}
                <div className="divide-y divide-border/50">
                  {freelancerMatches.map((freelancer) => (
                    <div
                      key={freelancer.name}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {freelancer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {freelancer.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {freelancer.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {freelancer.rate}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="rounded-full text-xs font-medium text-primary">
                          {freelancer.match}% Match
                        </Badge>
                        <Button variant="outline" size="sm" className="h-7 rounded-full text-xs">
                          Посмотреть профиль
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
