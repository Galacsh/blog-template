import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'
import Providers from './providers'
import { pretendard, jetbrainsMono } from './fonts'

import './globals.css'

import type { Metadata } from 'next'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          <div className="flex flex-col min-h-full">
            <GlobalHeader />
            <main>{children}</main>
            <GlobalFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
