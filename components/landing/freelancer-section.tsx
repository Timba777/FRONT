"use client"

import Link from "next/link"
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
  return (
    <section 
      id="for-freelancers" 
      className="w-full min-w-0 overflow-x-hidden bg-background py-14 sm:py-24"
      aria-labelledby="freelancers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content - Freelancer Profile Card */}
          <div className="order-2 w-full min-w-0 lg:order-1">
            <Card 
              className="mx-auto w-full max-w-sm max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden border-border/50 shadow-lg"
              aria-label="Пример профиля фрилансера"
            >
              <CardContent className="p-4 text-center md:p-6 md:text-left">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback 
                      className="bg-primary/10 text-xl text-primary"
                      aria-label="Аватар Алексея Вронского"
                    >
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
                  <div 
                    className="mt-2 flex items-center justify-center gap-1 md:justify-start"
                    aria-label="Рейтинг: 5 из 5 звезд, 47 отзывов"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                    <span 
                      className="ml-1 text-sm text-muted-foreground"
                      aria-label="5 звезд, основано на 47 отзывах"
                    >
                      5.0 (47 просмотров)
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 space-y-3 text-center md:text-left">
                  <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground md:justify-start">
                    <Trophy className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Продавец с самым высоким рейтингом</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground md:justify-start">
                    <Star className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>98% успешные работы</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground md:justify-start">
                    <Briefcase className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>Завершено 87 проектов</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-6 border-0 pl-0 text-sm italic text-muted-foreground md:border-l-2 md:border-primary/30 md:pl-4 md:text-left">
                  &quot;Я специализируюсь на создании дизайна, ориентированного на пользователя. Давайте воплотим ваше видение в жизнь.&quot;
                </blockquote>

                {/* CTA */}
                <div className="mt-6 flex justify-center md:block">
                <Button
                  variant="outline"
                  className="w-full max-w-xs rounded-full md:max-w-none"
                  aria-label="Нанять Алексея Вронского"
                >
                  Нанять
                </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="order-1 w-full min-w-0 text-center md:text-left lg:order-2">
            <h2 
              id="freelancers-heading"
              className="text-pretty text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight"
            >
              Для фрилансеров: Найдите нужных клиентов
            </h2>
            
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Прекратите делать ставки на бесчисленные проекты. С Light клиенты, которым нужны именно ваши навыки, автоматически находят вас. Создавайте свою репутацию, устанавливайте расценки и сосредоточьтесь на том, в чем вы профи.
            </p>

            <ul 
              className="mt-8 space-y-4"
              aria-label="Преимущества для фрилансеров на платформе Light"
            >
              {benefits.map((benefit, index) => (
                <li key={benefit} className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-3 md:text-left">
                  <div 
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center md:justify-start">
            <Button 
              variant="outline" 
              className="rounded-full px-8" 
              asChild
            >
              <Link 
                href="/signup/freelancer"
                aria-label="Зарегистрироваться как фрилансер на платформе Light"
              >
                Присоединяйтесь
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
