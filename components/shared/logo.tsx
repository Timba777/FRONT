interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function Logo({ size = 40, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="64"
          height="64"
          rx="22"
          fill="url(#paint0_linear_logo)"
        />
        <g clipPath="url(#clip0_logo)">
          <path
            d="M22.8836 40.9729C19.3365 44.35 15.7894 47.7272 12.2381 51.1044C12.1588 37.4041 12.0794 23.7003 12 10H22.8836V40.9729Z"
            fill="#101073"
          />
          <path
            d="M45.1815 43.4056C47.4543 46.3106 49.7272 49.2156 52 52.124C39.7919 52.213 27.5839 52.302 15.3758 52.3875C18.3631 49.3935 21.3503 46.3996 24.3376 43.4056H45.1815Z"
            fill="#101073"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_logo"
            x1="32"
            y1="0"
            x2="32"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.293269" stopColor="#BCE7F6" stopOpacity="0.29" />
            <stop offset="0.9999" stopColor="#395AEF" stopOpacity="0.78" />
          </linearGradient>
          <clipPath id="clip0_logo">
            <rect
              width="40"
              height="43"
              fill="white"
              transform="translate(12 10)"
            />
          </clipPath>
        </defs>
      </svg>
      {showText && (
        <span className="text-lg font-semibold text-foreground">Light</span>
      )}
    </div>
  )
}
