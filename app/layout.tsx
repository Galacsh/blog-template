import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { QuickScrollButton } from '@/components/quick-scroll-button'
import { pretendard, jetbrainsMono } from '@/app/fonts'
import './globals.css'

import type { Metadata } from 'next'

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
            <main className="flex-1 container">{children}</main>
            <AppFooter />
          </div>
          <Toaster />
          <QuickScrollButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
