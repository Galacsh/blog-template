import { FilterLabel } from '@/components/posts-filter-label'
import { cn } from '@/lib/utils'

import type { Dispatch, SetStateAction } from 'react'
import type { Tag } from '@/lib/types'

type TagFilterProps = Readonly<{
  tags: Tag[]
  selectedTags: Tag[]
  onSelectedTagsChange: Dispatch<SetStateAction<string[]>>
}>

export function TagFilter({ tags, selectedTags, onSelectedTagsChange }: TagFilterProps) {
  if (tags.length) {
    return (
      <div className="w-full">
        <FilterLabel htmlFor="tags">Tags</FilterLabel>
        <div id="tags" className="flex flex-row flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <TagFilterItem
              key={'tag_' + idx}
              tag={tag}
              isSelected={selectedTags?.includes(tag) || false}
              onSelect={(selectedTag) => onSelectedTagsChange([...selectedTags, selectedTag])}
              onDeselect={(deselected) =>
                onSelectedTagsChange(selectedTags.filter((t) => t !== deselected))
              }
            />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full">
        <FilterLabel htmlFor="tags">Tags</FilterLabel>
        <div id="tags" className="flex flex-row flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">No tags found.</span>
        </div>
      </div>
    )
  }
}

type TagFilterItemProps = Readonly<{
  tag: Tag
  isSelected: boolean
  onSelect: (tag: Tag) => void
  onDeselect: (tag: Tag) => void
}>

function TagFilterItem({ tag, isSelected, onSelect, onDeselect }: TagFilterItemProps) {
  const toggle = () => {
    if (isSelected) onDeselect(tag)
    else onSelect(tag)
  }

  return (
    <button
      className={cn(
        'px-2 py-1 text-xs rounded-md',
        'border hover:text-accent-foreground bg-background hover:bg-accent',
        'focus:outline-none focus:text-accent-foreground focus:bg-accent',
        {
          'text-muted-foreground': !isSelected,
          'text-foreground': isSelected,
          'border-input': !isSelected,
          'border-foreground hover:border-accent-foreground': isSelected,
        }
      )}
      onClick={toggle}
    >
      {tag}
    </button>
  )
}
