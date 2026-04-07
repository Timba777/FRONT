"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

const navLinks = [
  { href: "#how-it-works", label: "Как это работает" },
  { href: "#for-freelancers", label: "Для фрилансера" },
  { href: "#trust-security", label: "Trust & Security" },
]

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-6 lg:px-8">
        {/* Left */}
        <div className="flex shrink-0 items-center">
          <Link href="/landing" className="flex-shrink-0">
            <Logo size={36} />
          </Link>
        </div>

        {/* Center */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => router.push("/register")}
          >
            Регистрация
          </Button>
          <Button
            className="rounded-full px-5"
            onClick={() => router.push("/")}
          >
            Войти
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/register")}
              >
                Регистрация
              </Button>
              <Button
                className="w-full"
                onClick={() => router.push("/")}
              >
                Войти
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}