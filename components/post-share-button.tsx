'use client'

import { Link2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useToast } from './ui/use-toast'
import { cn } from '@/lib/utils'

type Props = Readonly<{
  text: string
  className?: string
}>

/**
 * This will not work if url is insecure.
 * For example:
 * - (X) HTTP: 'http://for-example.com/...'
 * - (X) HTTP & not localhost: 'http://10.12.34.56:3000/...'
 * - (O) localhost: 'http://localhost:3000/...'
 * - (O) HTTPS: 'https://for-example.com/...'
 */
export function CopyToClipboard({ text, className }: Props) {
  const { toast } = useToast()

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard is not available.')

      await navigator.clipboard.writeText(text)
      toast({
        title: '🎉 Link Copied',
        description: 'Link copied to clipboard.',
      })
    } catch (e) {
      toast({
        title: 'Failed to Copy Link',
        description: (e as Error).message,
      })
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={cn('h-8 flex flex-row space-x-2 px-2', className)}
      onClick={copy}
    >
      <Link2Icon className="size-4" />
      <span>Copy</span>
    </Button>
  )
}
