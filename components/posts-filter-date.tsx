import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FilterLabel } from '@/components/posts-filter-label'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

import type { Dispatch, SetStateAction } from 'react'
import type { SelectSingleEventHandler } from 'react-day-picker'

type Props = Readonly<{
  from: Date | undefined
  onFromChange: Dispatch<SetStateAction<Date | undefined>>
  to: Date | undefined
  onToChange: Dispatch<SetStateAction<Date | undefined>>
}>

export function DateFilter({ from, onFromChange, to, onToChange }: Props) {
  const { toast } = useToast()

  useEffect(() => {
    if (from && to && from > to) {
      throw new Error('Invalid date range.')
    }
  }, [from, to])

  const safeSelectFrom = (date: Date | undefined) => {
    if (to && date && to < date) {
      toast({
        title: 'Invalid Date',
        description: '"From" cannot be later than "To".',
      })
      return false
    } else {
      onFromChange(date)
      return true
    }
  }

  const safeSelectTo = (date: Date | undefined) => {
    if (from && date && from > date) {
      toast({
        title: 'Invalid Date',
        description: "'To' cannot be earlier than 'From'.",
      })
      return false
    } else {
      onToChange(date)
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
