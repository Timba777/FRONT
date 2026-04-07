import Image from "next/image"
import Link from "next/link"

export function TelegramSection() {
  return (
    <section className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        {/* QR Code */}
        <div className="flex flex-col items-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl sm:h-32 sm:w-32">
            <Image
              src="/images/telegram-qr.svg"
              alt="QR код для Telegram канала @light_freelance"
              width={120}
              height={120}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="mt-2 text-xs text-primary">@light_freelance</span>
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-foreground">
            Сканируйте, чтобы присоединиться к нашему сообществу
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Присоединяйтесь к Telegram-каналу для эксклюзивных обновлений, советов и прямой связи с командой
          </p>
          <Link
            href="https://t.me/+BXhZ_rMv62E3ZjIy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            https://t.me/+BXhZ_rMv62E3ZjIy
          </Link>
        </div>
      </div>
    </section>
  )
}
