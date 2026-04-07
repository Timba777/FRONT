"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  const timeUnits = [
    { value: timeLeft.days, label: "ДНЕЙ" },
    { value: timeLeft.hours, label: "ЧАСОВ" },
    { value: timeLeft.minutes, label: "МИНУТ" },
    { value: timeLeft.seconds, label: "СЕКУНД" },
  ]

  if (!mounted) {
    return (
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="flex min-w-[70px] flex-col items-center rounded-xl border border-primary/20 bg-card px-4 py-4 shadow-sm sm:min-w-[85px] sm:px-6 sm:py-5"
          >
            <span className="text-3xl font-bold text-primary sm:text-4xl">--</span>
            <span className="mt-1 text-[10px] font-medium tracking-wider text-muted-foreground sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="animate-in fade-in slide-in-from-bottom-2 flex min-w-[70px] flex-col items-center rounded-xl border border-primary/20 bg-card px-4 py-4 shadow-sm transition-all duration-300 hover:shadow-md sm:min-w-[85px] sm:px-6 sm:py-5"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
        >
          <span className="text-3xl font-bold tabular-nums text-primary sm:text-4xl">
            {formatNumber(unit.value)}
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-wider text-muted-foreground sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
