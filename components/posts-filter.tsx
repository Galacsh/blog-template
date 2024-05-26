'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns/format'
import { cn } from '@/lib/utils'
import { Tag } from '@/lib/types'

export function PostsFilter() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="block font-bold text-xl">Filter</h1>
      <QueryFilter />
      <DateFilter />
      <TagFilter available={['hello', 'world']} />
    </div>
  )
}

function QueryFilter() {
  const [query, setQuery] = useState<string>()

  return (
    <div className="w-full">
      <FilterLabel htmlFor="query">Search</FilterLabel>
      <Input
        type="search"
        id="query"
        placeholder="Type here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

function DateFilter() {
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()

  useEffect(() => {
    if (from && to && from > to) {
      setTo(undefined)
    }
  }, [from, to])

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <FilterDatePicker
        id="from"
        label="From"
        selected={from}
        onSelect={setFrom}
        placeholder="Pick a date"
      />
      <FilterDatePicker
        id="to"
        label="To"
        selected={to}
        onSelect={setTo}
        placeholder="Pick a date"
      />
    </div>
  )
}

type TagFilterProps = Readonly<{
  available: Tag[]
}>

function TagFilter({ available }: TagFilterProps) {
  const [selected, setSelected] = useState<Tag[]>([])

  return (
    <div className="w-full">
      <FilterLabel htmlFor="tags">Tags</FilterLabel>
      <div id="tags" className="flex flex-row flex-wrap gap-2">
        {available.map((tag, idx) => (
          <TagFilterItem
            key={'tag_' + idx}
            tag={tag}
            isSelected={selected.includes(tag)}
            onSelect={(selectedTag) => setSelected([...selected, selectedTag])}
            onDeselect={(deselected) => setSelected(selected.filter((t) => t !== deselected))}
          ></TagFilterItem>
        ))}
      </div>
    </div>
  )
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
      className={cn('px-2 py-1 text-xs rounded-md border border-input', {
        'text-muted-foreground hover:text-accent-foreground': !isSelected,
        'text-background hover:text-background/80': isSelected,
        'bg-background hover:bg-accent': !isSelected,
        'bg-foreground hover:bg-foreground/80': isSelected,
      })}
      onClick={toggle}
    >
      {tag}
    </button>
  )
}

type FilterLabelProps = Readonly<{
  htmlFor?: string
  children: React.ReactNode
}>

function FilterLabel({ htmlFor, children }: FilterLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="font-bold text-xs text-foreground/60 block mb-1">
      {children}
    </Label>
  )
}

type FilterDatePickerProps = Readonly<{
  id: string
  label: string
  placeholder: string
  selected: Date | undefined
  onSelect: (selected: Date | undefined) => void
}>

function FilterDatePicker({ id, label, placeholder, selected, onSelect }: FilterDatePickerProps) {
  return (
    <div className="flex flex-col">
      <FilterLabel htmlFor={id}>{label}</FilterLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selected && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? <span>{format(selected, 'PPP')}</span> : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={selected} onSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
