/**
 * Turn `Date` object to 'yyyy-MM-dd` format
 */
export function ymd(date: Date) {
  return date.toISOString().substring(0, 10)
}

/**
 * Minimal validation for date string.
 */
export function validDateString(str: string | null) {
  if (!str) return ''

  const parsed = Date.parse(str)
  if (isNaN(parsed) || parsed < 0) {
    throw new Error('Invalid date format.')
  }

  return str
}
