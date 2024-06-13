import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <h1 className="font-black text-4xl">404</h1>
        <div className="w-[1px] h-6 bg-muted-foreground mx-4" />
        <p className="text-muted-foreground">Page not found.</p>
      </div>
    </div>
  )
}
