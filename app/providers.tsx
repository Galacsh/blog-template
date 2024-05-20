import { ThemeProvider } from 'next-themes'

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Readonly<Props>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
