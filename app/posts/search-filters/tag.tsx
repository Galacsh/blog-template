import type { Tag as TagType, OnTagToggle } from '@/types'

type Props = {
  value: TagType
  active?: boolean
  onToggle?: OnTagToggle
}

const ACTIVE_CLASS = 'text-white bg-black dark:text-black dark:bg-white'
const INACTIVE_CLASS = 'text-black bg-black-100 dark:text-white dark:bg-white-100'

export default function Tag({ value, active = false, onToggle }: Props) {
  const toggle = () => {
    if (!onToggle) return

    if (active) onToggle(value, 'OFF')
    else onToggle(value, 'ON')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-2 py-1 rounded hover:opacity-50 ${active ? ACTIVE_CLASS : INACTIVE_CLASS}`}
    >
      {value}
    </button>
  )
}
