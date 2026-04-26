"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section 
      className="relative min-h-[72svh] w-full min-w-0 overflow-hidden md:min-h-[90vh]"
      aria-labelledby="hero-heading"
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mockup-LUrqlZXmHGjDwnguKrmYZbTla5Ik2B.png"
          alt="Рабочее пространство с ноутбуком - иллюстрация фриланса и удаленной работы"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Multi-layer overlay for text readability */}
        {/* Left side gradient - stronger for text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" aria-hidden="true" />
        {/* Top fade for header area */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/60" aria-hidden="true" />
        {/* Subtle overall tint for cohesion */}
        <div className="absolute inset-0 bg-primary/[0.03]" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[72svh] w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-24 md:min-h-[90vh] md:justify-start lg:px-8 lg:py-32">
        <div className="w-full min-w-0 max-w-full text-center md:text-left lg:w-1/2">
          {/* Glass card for text content */}
          <div className="rounded-3xl bg-white/70 p-5 backdrop-blur-sm sm:p-10 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <h1 
              id="hero-heading"
              className="text-pretty text-center text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-left lg:text-6xl"
              itemProp="headline"
            >
              Наймите специалиста за считанные секунды
            </h1>
            
            <p 
              className="mt-4 mx-auto max-w-xl text-balance text-center text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:mx-0 md:text-left"
              itemProp="description"
            >
              Light использует AI, чтобы подобрать для вас проверенных фрилансеров, которые идеально подойдут для вашего проекта. Прекратите бесконечный просмотр и начните создавать уже сегодня.
            </p>
            
            <div className="mt-6 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start sm:gap-4">
              <Button
                size="lg"
                className="w-full min-w-0 rounded-full px-6 text-sm shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 sm:w-auto sm:px-8 sm:text-base"
                asChild
              >
                <Link 
                  href="/register"
                  aria-label="Перейти к регистрации и найти специалиста прямо сейчас"
                >
                  Найти прямо сейчас
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full min-w-0 rounded-full bg-white/80 px-6 text-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto sm:px-8 sm:text-base"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ 
                    behavior: "smooth",
                    block: "start"
                  })
                }}
                aria-label="Прокрутить к разделу 'Как это работает'"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent md:h-32"
        aria-hidden="true"
      />

      {/* Schema.org разметка для страницы */}

    </section>
  )
}
