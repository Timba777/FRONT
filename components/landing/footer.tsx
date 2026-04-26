import Link from "next/link"
import { Logo } from "@/components/shared/logo"

const footerLinks = {
  product: {
    title: "Продукт",
    links: [
      { label: "Как это работает", href: "#how-it-works" },
      { label: "Ценообразование", href: "#" },
      { label: "Полное соответствие", href: "#" },
      { label: "Trust & Safety", href: "#trust-security" },
    ],
  },
  freelancers: {
    title: "Для фрилансера",
    links: [
      { label: "Регистрация", href: "/signup/freelancer" },
      { label: "История успеха", href: "#" },
      { label: "Ресурсы", href: "#" },
      { label: "Сообщество", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "О нас", href: "#" },
      { label: "Карьеры", href: "#" },
      { label: "Блог", href: "#" },
      { label: "Контакты", href: "#" },
    ],
  },
}

export function Footer() {
  return (
    <footer 
      className="w-full min-w-0 max-w-full overflow-x-hidden border-t border-border bg-background"
      role="contentinfo"
      aria-label="Нижний колонтитул сайта"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-2">
            <Logo size={36} />
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground md:mx-0">
              Модная торговая площадка для фрилансеров, объединяющая таланты и возможности
            </p>
           
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-foreground" id={`footer-section-${key}`}>
                {section.title}
              </h3>
              <ul 
                className="mt-4 space-y-3"
                aria-labelledby={`footer-section-${key}`}
                role="list"
              >
                {section.links.map((link) => (
                  <li key={link.label} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                      aria-label={`${section.title}: ${link.label}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="w-full text-sm text-muted-foreground sm:w-auto">
            &copy; 2026 Light. Все права защищены.
          </p>
          <nav
            className="flex w-full max-w-full justify-center sm:w-auto sm:justify-end"
            aria-label="Юридическая информация"
          >
            <ul className="m-0 flex list-none flex-wrap justify-center gap-6 p-0 sm:justify-end" role="list">
              <li role="listitem">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label="Политика конфиденциальности"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li role="listitem">
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label="Условия обслуживания"
                >
                  Условия обслуживания
                </Link>
              </li>
              <li role="listitem">
                <Link
                  href="/cookie-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
                  aria-label="Политика использования cookie"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
