'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FilterLabel } from '@/components/posts-filter-label'
import { format } from 'date-fns/format'
import { cn } from '@/lib/utils'

export function DateFilter() {
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
