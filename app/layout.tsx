import { pretendard, jetbrainsMono } from './fonts'
import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SSG Template',
  description: 'Personal static site generation template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
