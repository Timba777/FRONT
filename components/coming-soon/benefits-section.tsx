import { Percent, Zap, Award } from "lucide-react"

const benefits = [
  {
    icon: Percent,
    title: "Комиссия 0%",
    description: "0% комиссии на все сделки после запуска. Никаких скрытых платежей",
  },
  {
    icon: Zap,
    title: "Приоритетный подбор",
    description: "Получите доступ к заказам раньше остальных пользователей",
  },
  {
    icon: Award,
    title: "Пожизненные бонусы",
    description: "Лучшие тарифы навсегда для участников предзапуска",
  },
]

export function BenefitsSection() {
  return (
    <section className="w-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Преимущества ранней регистрации
        </h2>
        <p className="mt-2 text-muted-foreground">
          Эксклюзивные бонусы для первых пользователей
        </p>
      </div>
      
      <ul className="mt-8 grid list-none gap-4 p-0 m-0 sm:grid-cols-3 sm:gap-6">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <benefit.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
