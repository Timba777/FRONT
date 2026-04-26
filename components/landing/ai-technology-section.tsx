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
    <section 
      className="w-full min-w-0 overflow-x-hidden bg-secondary/30 py-14 sm:py-24"
      aria-labelledby="ai-technology-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="min-w-0 text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
            <Badge 
              variant="secondary" 
              className="rounded-full px-3 py-1"
              aria-label="Технология AI подбора"
            >
              <span 
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" 
                aria-hidden="true"
              />
              AI-Powered Matching
            </Badge>
            </div>
            
            <h2 
              id="ai-technology-heading"
              className="text-pretty text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight"
            >
              Технология, которая понимает ваши потребности
            </h2>
            
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Наш AI не просто подбирает ключевые слова. Он понимает контекст, оценивает портфолио и учитывает доступность, чтобы найти фрилансеров, которые действительно соответствуют требованиям вашего проекта.
            </p>

            <ul className="mt-8 space-y-4" aria-label="Преимущества AI подбора">
              {features.map((feature, index) => (
                <li key={feature} className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-3 md:text-left">
                  <div 
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Freelancer Matches Card */}
          <div className="relative w-full min-w-0 max-w-sm mx-auto md:mx-0 md:max-w-none">
            <Card 
              className="w-full min-w-0 max-w-full overflow-hidden border-border/50 shadow-lg"
              aria-label="Примеры подобранных фрилансеров"
            >
              <CardContent className="p-0">
                {/* Card Header */}
                <div className="flex flex-col items-center justify-center gap-2 border-b border-border/50 bg-muted/30 px-3 py-3 text-center sm:px-5 sm:py-4 md:flex-row md:justify-between md:text-left">
                  <span className="min-w-0 text-sm font-medium text-foreground">
                    Лучшие варианты для вашего проекта
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="shrink-0 rounded-full text-xs"
                    aria-label="Найдено 3 фрилансера"
                  >
                    3 найдено
                  </Badge>
                </div>

                {/* Freelancer List */}
                <ul 
                  className="m-0 list-none divide-y divide-border/50 p-0"
                  aria-label="Список подобранных фрилансеров"
                >
                  {freelancerMatches.map((freelancer) => (
                    <li
                      key={freelancer.name}
                      className="px-3 py-3 sm:px-5 sm:py-4"
                      aria-label={`${freelancer.name}, ${freelancer.role}, ставка ${freelancer.rate}, совпадение ${freelancer.match}%`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarFallback 
                          className="bg-primary/10 text-primary"
                          aria-label={`Аватар ${freelancer.name}`}
                        >
                          {freelancer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="min-w-0 flex-1">
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
                        </div>

                      <div className="flex shrink-0 flex-row items-center justify-end gap-2 sm:flex-col sm:items-end sm:gap-2">
                        <Badge 
                          variant="outline" 
                          className="rounded-full text-xs font-medium text-primary"
                          aria-label={`Совпадение ${freelancer.match} процентов`}
                        >
                          {freelancer.match}% Match
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 rounded-full text-xs"
                          aria-label={`Посмотреть профиль ${freelancer.name}`}
                        >
                          Посмотреть профиль
                        </Button>
                      </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
