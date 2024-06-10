'use client'

import { cn } from '@/lib/utils'
import { TextAlignLeftIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'

import type { OnThisPage } from '@/lib/types'

type OnThisPageProps = Readonly<{
  items: OnThisPage[]
}>

export function OnThisPage({ items }: OnThisPageProps) {
  const observer = useRef<IntersectionObserver>()
  const visible = useRef(new Map<string, Element>())
  const [reading, setReading] = useState<string>()

  useEffect(() => {
    const page = document.querySelector('article#post')
    const elements = page?.querySelectorAll('h1[id], h2[id], h3[id]') || []

    // clean up if observer is alive
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        // return if no entries to handle
        if (entries.length === 0) return

        // save visible id and element
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.5) {
            visible.current.set(e.target.id, e.target)
          } else if (e.intersectionRatio < 0.5) {
            visible.current.delete(e.target.id)
          }
        })

        // if nothing visible, leave it
        if (visible.current.size === 0) return

        // if visible, use the top element
        let min: Element | undefined
        visible.current.forEach((elem) => {
          if (min == null || min.getBoundingClientRect().y > elem.getBoundingClientRect().y) {
            min = elem
          }
        })
        setReading(min?.id)
      },
      {
        rootMargin: '0px',
        threshold: 0.5,
      }
    )

    elements.forEach((e) => observer.current?.observe(e))

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [])

  return (
    <div className="flex flex-col text-sm leading-normal max-w-full">
      <div className="font-bold text-foreground mb-1 flex flex-row items-center">
        <TextAlignLeftIcon className="mr-2 size-4" />
        On this page
      </div>
      <div className="block max-h-full max-w-full overflow-y-auto overflow-x-hidden">
        {items.length > 0 ? (
          items.map((t) => (
            <OnThisPageItem
              key={'toc_' + t.id}
              id={t.id}
              depth={t.depth}
              text={t.text}
              active={reading != null && reading === t.id}
            />
          ))
        ) : (
          <span className="block max-w-full w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium text-muted-foreground my-2 first:mt-1">
            Nothing to display.
          </span>
        )}
      </div>
    </div>
  )
}

type OnThisPageItemProps = Readonly<{
  id: string
  depth: number
  text: string
  active: boolean
}>

function OnThisPageItem({ id, depth, text, active }: OnThisPageItemProps) {
  return (
    <a
      href={`#${id}`}
      style={{ paddingLeft: `${depth - 1}rem` }}
      className={cn(
        'block max-w-full w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium text-muted-foreground hover:text-foreground my-2 first:mt-1',
        active && 'text-foreground'
      )}
    >
      {text}
    </a>
  )
}
