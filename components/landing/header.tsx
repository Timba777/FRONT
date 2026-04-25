"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

const navLinks = [
  { href: "#how-it-works", label: "Как это работает" },
  { href: "#for-freelancers", label: "Для фрилансера" },
  { href: "#trust-security", label: "Trust & Security" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
<header 
  className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  role="banner"
  aria-label="Главная навигация"
>
  <div className="flex h-16 w-full items-center justify-between px-6 lg:px-8">
    {/* Left - Logo */}
    <div className="flex shrink-0 items-center">
      <Link 
        href="/" 
        className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
        aria-label="Light - Главная страница"
      >
        <Logo size={36} />
      </Link>
    </div>

    {/* Center - Desktop Navigation */}
    <nav 
      className="hidden md:block" 
      aria-label="Основная навигация"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul className="flex list-none items-center gap-8 p-0 m-0">
        {navLinks.map((link) => (
          <li key={link.href} itemProp="name">
            <a
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
              itemProp="url"
              aria-label={`Перейти на страницу ${link.label}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>

    {/* Right - Desktop Actions */}
    <div className="hidden shrink-0 items-center gap-3 md:flex">
      <Button 
        variant="ghost" 
        className="text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        asChild
      >
        <Link 
          href="/register"
          aria-label="Зарегистрироваться на платформе Light"
        >
          Регистрация
        </Link>
      </Button>
      <Button 
        className="rounded-full px-5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        asChild
      >
        <Link 
          href="/login"
          aria-label="Войти в аккаунт Light"
        >
          Войти
        </Link>
      </Button>
    </div>

    {/* Mobile Menu Button */}
    <button
      type="button"
      className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-expanded={mobileMenuOpen}
      aria-controls="landing-mobile-nav"
      aria-label={mobileMenuOpen ? "Закрыть меню навигации" : "Открыть меню навигации"}
    >
      {mobileMenuOpen ? (
        <X className="h-6 w-6 text-foreground" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
      )}
      <span className="sr-only">
        {mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
      </span>
    </button>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <nav
      id="landing-mobile-nav"
      className="border-t border-border/40 bg-background md:hidden"
      aria-label="Мобильная навигация"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <ul className="list-none space-y-1 p-0 px-4 py-4 m-0">
        {navLinks.map((link) => (
          <li key={link.href} itemProp="name">
            <a
              href={link.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              itemProp="url"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={`Перейти на страницу ${link.label}`}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li className="mt-4 pt-4">
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
              asChild
            >
              <Link 
                href="/register" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Зарегистрироваться на платформе Light"
              >
                Регистрация
              </Link>
            </Button>
            <Button 
              className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
              asChild
            >
              <Link 
                href="/login" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Войти в аккаунт Light"
              >
                Войти
              </Link>
            </Button>
          </div>
        </li>
      </ul>
    </nav>
  )}

</header>
  )
}