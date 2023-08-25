import { Timezones } from '@/types/timezones.types'

import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'

export function getUserTimezone(): Timezones {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return timezone as Timezones
}

export const isValidTimeZone = (timeZone: Timezones): boolean => {
  try {
    const current = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (current) {
      Intl.DateTimeFormat(undefined, { timeZone: timeZone })
    }
    return true
  } catch (error: unknown) {
    return false
  }
}

export const getRegionNames = (countryCode: Countries, locale?: Locale) => {
  const regionNames = new Intl.DisplayNames(locale, { type: 'region' })
  return regionNames.of(countryCode)
}
