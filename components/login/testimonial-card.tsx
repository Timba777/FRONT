"use client"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <figure className="rounded-2xl border border-border/50 bg-background p-5">
      <blockquote className="m-0 border-l-0 p-0 before:content-none after:content-none">
        <p className="text-sm italic text-foreground">{`"${quote}"`}</p>
      </blockquote>
      <figcaption className="mt-2 text-sm text-muted-foreground">
        — {author}, {role}
      </figcaption>
    </figure>
  )
}
