"use client"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background p-5">
      <p className="text-sm italic text-foreground">{`"${quote}"`}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        — {author}, {role}
      </p>
    </div>
  )
}
