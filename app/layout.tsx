import { ThemeProvider } from 'next-themes'
import { pretendard, jetbrainsMono } from '@/app/fonts'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import './globals.css'

import type { Metadata } from 'next'

type Props = Readonly<{
  children: React.ReactNode
}>

export const metadata: Metadata = {
  title: 'SSG Template',
  description: 'Personal static site generation template',
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
        </ThemeProvider>
      </body>
    </html>
  )
}
