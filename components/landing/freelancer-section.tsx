"use client"

import { useRouter } from "next/navigation"
import { Star, Check, Trophy, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const benefits = [
  "AI подберет для вас проекты, соответствующие вашему опыту",
  "Безопасные платежи и легкое управление проектами",
  "Выстраивайте долгосрочные отношения с качественными клиентами",
]

export function FreelancerSection() {
  const router = useRouter()

  return (
    <section id="for-freelancers" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Freelancer Profile Card */}
          <div className="order-2 lg:order-1">
            <Card className="mx-auto max-w-sm overflow-hidden border-border/50 shadow-lg">
              <CardContent className="p-6">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-xl text-primary">
                      АВ
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Алексей Вронский
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Старший дизайнер продукта
                  </p>
                  
                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">
                      5.0 (47 просмотров)
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>Продавец с самым высоким рейтингом</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-primary" />
                    <span>98% успешные работы</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>Завершено 87 проектов</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-6 border-l-2 border-primary/30 pl-4 text-sm italic text-muted-foreground">
                  &quot;Я специализируюсь на создании дизайна, ориентированного на пользователя. Давайте воплотим ваше видение в жизнь.&quot;
                </blockquote>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="mt-6 w-full rounded-full"
                >
                  Нанять
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Для фрилансеров: Найдите нужных клиентов
            </h2>
            
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Прекратите делать ставки на бесчисленные проекты. С Light клиенты, которым нужны именно ваши навыки, автоматически находят вас. Создавайте свою репутацию, устанавливайте расценки и сосредоточьтесь на том, в чем вы профи.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className="mt-8 rounded-full px-8"
              onClick={() => router.push("/signup/freelancer")}
            >
              Присоединяйтесь
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
