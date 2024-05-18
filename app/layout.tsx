import type { Metadata } from 'next'
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
    <html lang="en">
      <body className="bg-white dark:bg-black">{children}</body>
    </html>
  )
}
