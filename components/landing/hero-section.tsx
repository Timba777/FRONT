"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mockup-LUrqlZXmHGjDwnguKrmYZbTla5Ik2B.png"
          alt="Laptop workspace background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Multi-layer overlay for text readability */}
        {/* Left side gradient - stronger for text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        {/* Top fade for header area */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/60" />
        {/* Subtle overall tint for cohesion */}
        <div className="absolute inset-0 bg-primary/[0.03]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="w-full lg:w-1/2">
          {/* Glass card for text content */}
          <div className="rounded-3xl bg-white/70 p-8 backdrop-blur-sm sm:p-10 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Наймите специалиста за считанные секунды
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Light использует AI, чтобы подобрать для вас проверенных фрилансеров, которые идеально подойдут для вашего проекта. Прекратите бесконечный просмотр и начните создавать уже сегодня.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                asChild
              >
                <Link href="/register">Найти прямо сейчас</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-white/80 px-8 backdrop-blur-sm transition-colors hover:bg-white"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
