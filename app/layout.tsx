import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Light - AI-маркетплейс для фриланса',
  description: 'Ваш AI-маркетплейс для фриланса. Находите идеальные совпадения за часы, а не недели.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Light — современная фриланс биржа для профессионалов. Без комиссий, быстрые выплаты, умный подбор заказов. Присоединяйтесь к сообществу лучших специалистов на lightfreelance.ru." />
        <meta name="keywords" content="фриланс, биржа фриланса, удаленная работа, заказы на фрилансе, заработок в интернете, Light фриланс, lightfreelance, фриланс биржа нового поколения" />
        <meta name="author" content="Light Team" />
        <meta name="robots" content="noarchive" />
        
        <link rel="canonical" href="https://lightfreelance.ru" />
      
        <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
        
        <meta property="og:title" content="Light — Фриланс биржа нового поколения" />
        <meta property="og:description" content="Работайте без комиссий, получайте быстрые выплаты и находите лучшие заказы. Light меняет правила игры на рынке фриланса." />
        <meta property="og:image" content="https://lightfreelance.ru/images/og-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://lightfreelance.ru" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Light" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Light — Фриланс биржа нового поколения" />
        <meta name="twitter:description" content="Работайте без комиссий, получайте быстрые выплаты и находите лучшие заказы. Light меняет правила игры на рынке фриланса." />
        <meta name="twitter:image" content="https://lightfreelance.ru/images/twitter-preview.jpg" />
        
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#6366f1" />
        

        <link rel="alternate" href="https://lightfreelance.ru" hrefLang="x-default" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
        
      </head>

      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
