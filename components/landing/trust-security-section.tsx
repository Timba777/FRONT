import { Shield, UserCheck, CreditCard, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: UserCheck,
    title: "Проверенные профили",
    description: "Все фрилансеры проходят проверку личности и квалификации",
  },
  {
    icon: CreditCard,
    title: "Безопасные платежи",
    description: "Защита от успешного депонирования для каждой транзакции",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Квалифицированная помощь в любое время, когда вы в ней нуждаетесь",
  },
]

export function TrustSecuritySection() {
  return (
    <section id="trust-security" className="bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border-border/50 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Trust & Security
              </h2>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
                Ваше спокойствие - наш приоритет. Каждый фрилансер проходит проверку, каждый платеж защищен, а каждый проект подкреплен нашей гарантией.
              </p>

              {/* Features Grid */}
              <ul className="mt-10 grid list-none gap-8 p-0 m-0 sm:grid-cols-3">
                {features.map((feature) => (
                  <li key={feature.title} className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      <feature.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
