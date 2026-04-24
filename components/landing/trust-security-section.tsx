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
    <section 
      id="trust-security" 
      className="bg-secondary/30 py-16 sm:py-24"
      aria-labelledby="trust-security-heading"
      itemScope
      itemType="https://schema.org/Thing"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card 
            className="overflow-hidden border-border/50 shadow-lg"
            role="article"
            aria-label="Информация о безопасности и надежности платформы"
          >
            <CardContent className="p-8 sm:p-12">
              {/* Icon */}
              <div className="flex justify-center">
                <div 
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
                  aria-hidden="true"
                >
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h2 
                id="trust-security-heading"
                className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                itemProp="name"
              >
                Trust & Security
              </h2>

              {/* Description */}
              <p 
                className="mx-auto mt-4 max-w-xl text-center text-muted-foreground"
                itemProp="description"
              >
                Ваше спокойствие - наш приоритет. Каждый фрилансер проходит проверку, каждый платеж защищен, а каждый проект подкреплен нашей гарантией.
              </p>

              {/* Features Grid */}
              <ul 
                className="mt-10 grid list-none gap-8 p-0 m-0 sm:grid-cols-3"
                aria-label="Преимущества безопасности платформы"
                itemScope
                itemType="https://schema.org/ItemList"
              >
                {features.map((feature, index) => (
                  <li 
                    key={feature.title}
                    className="text-center"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/Thing"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                      <feature.icon 
                        className="h-6 w-6 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 
                      className="mt-4 text-sm font-semibold text-foreground"
                      itemProp="name"
                    >
                      {feature.title}
                    </h3>
                    <p 
                      className="mt-2 text-xs leading-relaxed text-muted-foreground"
                      itemProp="description"
                    >
                      {feature.description}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Schema.org разметка для безопасности */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Trust & Security - Безопасность на Light",
            "description": "Узнайте о мерах безопасности и защиты на платформе Light. Проверка фрилансеров, защита платежей и гарантия качества.",
            "mainEntity": {
              "@type": "Thing",
              "name": "Система безопасности Light",
              "description": "Комплексная защита для заказчиков и фрилансеров",
              "hasFeature": features.map((feature) => ({
                "@type": "Thing",
                "name": feature.title,
                "description": feature.description
              }))
            },
            "potentialAction": {
              "@type": "ConfirmAction",
              "name": "Начать безопасную работу",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://lightfreelance.ru/register",
                "inLanguage": "ru"
              }
            }
          }),
        }}
      />
    </section>
  )
}
