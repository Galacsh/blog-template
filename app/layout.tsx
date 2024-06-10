import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { QuickScrollButton } from '@/components/quick-scroll-button'
import { pretendard, jetbrainsMono } from '@/app/fonts'
import { imageContentType, imageSize } from '@/lib/og/image'
import './globals.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'

type Props = Readonly<{
  children: ReactNode
}>

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL),
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  openGraph: {
    images: [
      {
        alt: process.env.APP_NAME,
        type: imageContentType,
        width: imageSize.width,
        height: imageSize.height,
        url: '/og/default',
      },
    ],
  },
}

export default function AppLayout({ children }: Props) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <body className="selection:bg-active/30">
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
          <QuickScrollButton className="fixed bottom-4 right-4 z-40" />
        </ThemeProvider>
      </body>
    </html>
  )
}
