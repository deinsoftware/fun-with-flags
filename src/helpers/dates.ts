import { Countries } from '@/shared/types/countries.types'
import { Locale } from '@/shared/types/locale.types'
import { TimeZones } from '@/shared/types/timeZones.types'

export const isValidTimeZone = (timeZone: TimeZones): boolean => {
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

export const getDate = (options: { timeZone: TimeZones }, originDate: Date) => {
  return originDate.toLocaleDateString('en-CA', { ...options })
}

export const getTime = (options: { timeZone: TimeZones }, originDate: Date) => {
  return originDate.toLocaleTimeString('en-CA', {
    ...options,
    hour12: false,
  })
}

export const getAcronym = (options: { timeZone: TimeZones }, originDate: Date) => {
  return Intl.DateTimeFormat('default', {
    ...options,
    timeZoneName: 'short',
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')?.value
}

export const getGmt = (options: { timeZone: TimeZones }, originDate: Date) => {
  return Intl.DateTimeFormat('default', {
    ...options,
    timeZoneName: 'shortOffset',
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')?.value
}

export const convertGmtToNumber = (gmtTime: string) => {
  if (!gmtTime) return

  const time = gmtTime.replace('GMT', '')

  if (!time.includes(':')) {
    return parseInt(time, 10)
  }

  return (
    time.split(':').reduce(function (seconds, time) {
      return +time + seconds * 60
    }, 0) / 60
  )
}

export const getRegionNames = (countryCode: Countries, locale?: Locale) => {
  const regionNames = new Intl.DisplayNames(locale, { type: 'region' })
  return regionNames.of(countryCode)
}
