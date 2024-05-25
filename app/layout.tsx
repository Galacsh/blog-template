import { ThemeProvider } from 'next-themes'
import { pretendard, jetbrainsMono } from './fonts'
import './globals.css'

import type { Metadata } from 'next'

type Props = Readonly<{
  children: React.ReactNode
}>

export const metadata: Metadata = {
  title: 'SSG Template',
  description: 'Personal static site generation template',
}

export default function RootLayout({ children }: Props) {
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
