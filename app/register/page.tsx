import { Briefcase, Users } from "lucide-react"
import { RolePanel } from "@/components/onboarding/role-panel"

const clientBenefits = [
  "Найдите лучших специалистов для вашего проекта",
  "Публикуйте задачи и получайте предложения",
  "Безопасная оплата и гарантии качества",
  "Доступ к тысячам проверенных фрилансеров",
]

const freelancerBenefits = [
  "Находите проекты, которые вам интересны",
  "Работайте удаленно из любой точки мира",
  "Гарантированные выплаты за выполненную работу",
  "Стройте репутацию и развивайте карьеру",
]

export default function RoleSelectionPage() {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      <section className="min-h-[50vh] lg:min-h-screen">
        <RolePanel
          icon={<Briefcase className="h-10 w-10" strokeWidth={1.5} />}
          title="Я Заказчик"
          benefits={clientBenefits}
          ctaText="Начать как заказчик"
          href="/signup/client"
          variant="client"
        />
      </section>

      <section className="min-h-[50vh] lg:min-h-screen">
        <RolePanel
          icon={<Users className="h-10 w-10" strokeWidth={1.5} />}
          title="Я Фрилансер"
          benefits={freelancerBenefits}
          ctaText="Начать как фрилансер"
          href="/signup/freelancer"
          variant="freelancer"
        />
      </section>
    </main>
  )
}