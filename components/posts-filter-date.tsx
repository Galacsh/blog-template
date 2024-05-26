'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FilterLabel } from '@/components/posts-filter-label'
import { useToast } from '@/components/ui/use-toast'
import { useSearch } from '@/lib/hooks/use-search'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { cn } from '@/lib/utils'

import type { SelectSingleEventHandler } from 'react-day-picker'

export function DateFilter() {
  const [from, setFrom] = useSearch('from', undefined, toState, toParam)
  const [to, setTo] = useSearch('to', undefined, toState, toParam)
  const { toast } = useToast()

  useEffect(() => {
    if (from && to && from > to) {
      throw new Error('Invalid date range.')
    }
  }, [from, to])

  const safeSelectTo = (date: Date | undefined) => {
    if (from && date && from > date) {
      toast({
        title: 'Invalid Date',
        description: "'To' cannot be earlier than 'From'.",
      })
      return false
    } else {
      setTo(date)
      return true
    }
  }

  const safeSelectFrom = (date: Date | undefined) => {
    if (to && date && to < date) {
      toast({
        title: 'Invalid Date',
        description: '"From" cannot be later than "To".',
      })
      return false
    } else {
      setFrom(date)
      return true
    }
  }

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <FilterDatePicker
        id="from"
        label="From"
        placeholder="Pick a date"
        align="start"
        selected={from}
        onSelect={safeSelectFrom}
      />
      <FilterDatePicker
        id="to"
        label="To"
        placeholder="Pick a date"
        align="end"
        selected={to}
        onSelect={safeSelectTo}
      />
    </div>
  )
}

function toState(val: string | null) {
  if (!val) return undefined

  const date = parse(val, 'yyyy-MM-dd', new Date())

  if (isNaN(date.valueOf()) || date.valueOf() < 0) {
    throw new Error('Invalid date.')
  }

  return date
}

function toParam(state: Date | undefined) {
  if (!state) return null
  return format(state, 'yyyy-MM-dd')
}

type FilterDatePickerProps = Readonly<{
  id: string
  label: string
  placeholder: string
  align: 'start' | 'end'
  selected: Date | undefined
  onSelect: (selected: Date | undefined) => boolean
}>

function FilterDatePicker({
  id,
  label,
  placeholder,
  align,
  selected,
  onSelect,
}: FilterDatePickerProps) {
  const [isOpen, setOpen] = useState(false)

  const easyOnSelect: SelectSingleEventHandler = (day) => {
    if (onSelect(day)) {
      setOpen(false)
    }
  }

  return (
    <div className="flex flex-col">
      <FilterLabel htmlFor={id}>{label}</FilterLabel>
      <Popover open={isOpen} onOpenChange={setOpen}>
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
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar mode="single" selected={selected} onSelect={easyOnSelect} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
