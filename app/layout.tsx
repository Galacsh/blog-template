import type { Metadata } from 'next'
import { Providers } from './providers'
import { pretendard, jetbrainsMono } from './fonts'

import './globals.css'

export const metadata: Metadata = {
  title: process.env.APP_NAME as string,
  description: process.env.APP_DESCRIPTION as string,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
