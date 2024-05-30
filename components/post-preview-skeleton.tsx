import { Skeleton } from '@/components/ui/skeleton'

export function PostPreviewSkeleton() {
  return (
    <span className="relative block w-full group focus:outline-none z-[1]">
      {/* Date */}
      <span className="flex flex-row items-center space-x-2">
        <Skeleton className="size-3" />
        <Skeleton className="h-4 w-full max-w-20" />
      </span>
      {/* Title */}
      <span className="h-6 flex flex-row items-center">
        <Skeleton className="h-4 w-full max-w-40" />
      </span>
      {/* Description */}
      <span className="h-5 flex flex-row items-center">
        <Skeleton className="h-3.5 w-full" />
      </span>
      <span className="h-5 flex flex-row items-center">
        <Skeleton className="h-3.5 w-full max-w-80" />
      </span>
      {/* Tags */}
      <span className="flex flex-row flex-wrap w-full items-center gap-2 mt-2">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-6 w-14" />
      </span>
      {/* Hover effect */}
      <span className="absolute block top-[-0.5rem] left-[-1rem] w-[calc(100%+2rem)] h-[calc(100%+1rem)] sm:rounded-md bg-accent/50 invisible group-hover:visible group-focus:visible z-[-1]" />
    </span>
  )
}
