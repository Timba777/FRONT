interface BenefitListProps {
  benefits: string[]
  variant: "light" | "dark"
}

export function BenefitList({ benefits, variant }: BenefitListProps) {
  return (
    <ul className="space-y-4">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <span
            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
              variant === "dark"
                ? "bg-white/60"
                : "bg-primary/60"
            }`}
          />
          <span
            className={`text-base leading-relaxed ${
              variant === "dark"
                ? "text-white/90"
                : "text-foreground/80"
            }`}
          >
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  )
}
