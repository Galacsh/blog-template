import { ThemeProvider } from 'next-themes'
import { pretendard, jetbrainsMono } from '@/app/fonts'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import './globals.css'

import type { Metadata } from 'next'
import { QuickScrollButton } from '@/components/quick-scroll-button'

type Props = Readonly<{
  children: React.ReactNode
}>

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
}

export default function AppLayout({ children }: Props) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="" className="flex flex-col min-h-full">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
          </div>
          <QuickScrollButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
