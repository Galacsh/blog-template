'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FilterLabel } from '@/components/posts-filter-label'
import { format } from 'date-fns/format'
import { cn } from '@/lib/utils'
import { useToast } from './ui/use-toast'
import { SelectSingleEventHandler } from 'react-day-picker'

export function DateFilter() {
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()
  const { toast } = useToast()

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
