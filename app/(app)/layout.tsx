type Props = Readonly<{
  children: React.ReactNode
}>

export default function AppLayout({ children }: Props) {
  return (
    <div vaul-drawer-wrapper="">
      <div className="relative flex min-h-full flex-col">{children}</div>
    </div>
  )
}
