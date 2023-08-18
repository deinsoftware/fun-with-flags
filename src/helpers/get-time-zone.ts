import { Timezones } from '@/types/timezones.types'

export function getTimezone(): Timezones {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return timezone as Timezones
}
