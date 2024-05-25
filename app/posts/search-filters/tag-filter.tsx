'use client'

import Tag from './tag'
import { useSearch } from '@/hooks'

import type { OnTagToggle, Tag as TagType } from '@/types'

type Props = {
  tags: TagType[]
  className?: string
}

export default function TagFilter({ tags, className }: Props) {
  const [activeTags, setActiveTags] = useSearch('tags', [], toState, toParam)

  const onToggle: OnTagToggle = (tag, active) => {
    if (active === 'OFF') {
      setActiveTags((arr) => arr.filter((t) => t !== tag))
    } else {
      setActiveTags((arr) => [...arr, tag])
    }
  }

  return (
    <div className={`w-full flex flex-row flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag, idx) => {
        return (
          <Tag
            key={'tag_' + idx}
            value={tag}
            active={activeTags.includes(tag)}
            onToggle={onToggle}
          />
        )
      })}
    </div>
  )
}

function toState(val: string | null) {
  return val ? val.split(',').map(decodeURIComponent) : []
}

function toParam(state: TagType[]) {
  return state.map(encodeURIComponent).join(',')
}
