import type { Metadata } from 'next'
import { Providers } from './providers'
import { pretendard, jetbrainsMono } from './fonts'

import './globals.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'My blog',
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
