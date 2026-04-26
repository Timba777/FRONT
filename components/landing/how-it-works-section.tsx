import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    number: 1,
    title: "Опишите свой проект",
    description: "Напишите, что вам нужно, наш AI проанализирует ваши требования и определит необходимые навыки",
  },
  {
    number: 2,
    title: "Получите подбор мгновенно",
    description: "Получите подготовленные AI профили фрилансеров, которые доступны и квалифицированы для вашего проекта",
  },
  {
    number: 3,
    title: "Начните работать",
    description: "Просматривайте анкеты, общайтесь в чате с кандидатами и принимайте их на работу с уверенностью. Все это на единой платформе",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full min-w-0 overflow-x-hidden py-14 sm:py-24"
      style={{
        background: "linear-gradient(to bottom, #EAF5FF00 0%, #EAF5FF94 58%, #C1CCF99E 62%, #C1CCF900 100%)"
      }}
      aria-labelledby="how-it-works-heading"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 
            id="how-it-works-heading"
            className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-tight"
            itemProp="name"
          >
            Как это работает
          </h2>
          <p 
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
            itemProp="description"
          >
            Три простых шага, чтобы найти идеального сотрудника
          </p>
        </div>

        {/* Steps Grid */}
        <ol 
          className="mx-auto mt-10 grid max-w-5xl list-none gap-6 p-0 sm:mt-16 lg:grid-cols-3"
          aria-label="Пошаговая инструкция использования сервиса"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {steps.map((step, index) => (
            <li 
              key={step.number}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <Card
                className="relative h-full overflow-hidden border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                role="article"
                aria-label={`Шаг ${step.number}: ${step.title}`}
              >
                <CardContent className="p-5 sm:p-8 text-center md:text-left">
                  {/* Step Number Badge */}
                  <div
                    className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 md:mx-0"
                    style={{
                      background: "linear-gradient(to bottom, #EAF5FF94 40%, #C1CCF99E 70%, #C1CCF900 100%)"
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="text-xl font-semibold sm:text-2xl"
                      style={{ color: "#101073" }}
                      itemProp="position"
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 
                    className="mb-3 text-lg font-semibold text-foreground sm:text-xl"
                    itemProp="name"
                  >
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                    itemProp="text"
                  >
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
