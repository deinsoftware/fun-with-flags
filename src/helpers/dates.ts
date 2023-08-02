import { Order } from './events.types'

import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'
import { TimeZones } from '@/types/timeZones.types'

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
  const date = Intl.DateTimeFormat('default', {
    ...options,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    ?.formatToParts(originDate)
    ?.reverse()

  // swap day and month
  ;[date[2], date[4]] = [date[4], date[2]]

  return date.reduce(
    (string, part) => string + (part.type === 'literal' ? '-' : part.value),
    '',
  )
}

export const getTime = (options: { timeZone: TimeZones }, originDate: Date) => {
  return originDate.toLocaleTimeString('en-CA', {
    ...options,
    hour12: false,
  })
}

export const getAcronym = (
  options: { timeZone: TimeZones },
  originDate: Date,
  countryCode: Countries,
) => {
  const { FWF_ACRONYM_COUNTRIES = '' } = process?.env || {}
  if (FWF_ACRONYM_COUNTRIES && !FWF_ACRONYM_COUNTRIES.includes(countryCode)) {
    return
  }

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

export const getOrder = (originDate: Date, countryDate: Date): Order => {
  const timePortion = originDate.getTime() % (3600 * 1000 * 24)
  const baseDate = new Date(originDate.valueOf() - timePortion.valueOf())

  const compare = countryDate.valueOf() - baseDate.valueOf()
  if (compare < 0) return 'prev'
  if (compare > 0) return 'next'
  return 'same'
}
