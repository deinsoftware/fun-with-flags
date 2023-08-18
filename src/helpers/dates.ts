import { TimeFormat } from './events.types'

import { DatePattern, GmTPattern, TimePattern } from '@/types/dates.types'

import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'
import { Timezones } from '@/types/timezones.types'

const arrayHours = Array.from(Array(12).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

export const arrayHours12 = ['12', ...arrayHours.splice(1), '12', ...arrayHours.splice(1)]

export const arrayHours24 = Array.from(Array(24).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

export const arrayMinutes = Array.from(Array(60).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

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

export const extractDate = (date: Date): DatePattern => {
  let year = String(date.getFullYear())
  let month = String(date.getMonth() + 1).padStart(2, '0')
  let day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}` as DatePattern
}

export const extractTime = (date: Date): TimePattern => {
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${hour}:${minute}`
}

export const joinISODate = (
  date: DatePattern,
  time: TimePattern,
  gmt: GmTPattern = 'Z',
) => {
  const isoDate = `${date}T${time}:00${gmt}`
  return new Date(isoDate).toISOString()
}

export const getLocaleDate = (
  options: { timeZone: Timezones },
  originDate: Date,
) => {
  const dateParts = Intl.DateTimeFormat('default', {
    ...options,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    ?.formatToParts(originDate)
    .filter((part) => part.type !== 'literal')

  const { year, month, day } = dateParts.reduce(
    (acc: Record<string, string>, { type, value }) => {
      acc[type] = value
      return acc
    },
    {
      year: '',
      month: '',
      day: '',
    },
  )
  return `${year}-${month}-${day}`
}

export const getLocaleTime = (
  options: { timeZone: Timezones },
  originDate: Date,
) => {
  return originDate.toLocaleTimeString('en-CA', {
    ...options,
    hour12: false,
  })
}

export const getLocaleDayPeriod = (locale?: string) => {
  const getDatePartValue = (date: number, defaultValue: string) => {
    return (
      Intl.DateTimeFormat(locale, { hour: 'numeric' })
        .formatToParts(date)
        .find((part) => part.type === 'dayPeriod')?.value ?? defaultValue
    )
  }

  const am = getDatePartValue(new Date().setHours(0, 0, 0, 0), 'AM')
  const pm = getDatePartValue(new Date().setHours(23, 0, 0, 0), 'PM')

  return { am, pm }
}

export const formatLocaleTime = (
  time: TimePattern,
  format: TimeFormat,
  locale?: string,
) => {
  type Props = {
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    hour12: boolean
  }

  const options: Props = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: format == 12 ?? true,
  }

  const [hours, minutes] = time.split(':')

  const date = new Date()
  date.setHours(Number(hours))
  date.setMinutes(Number(minutes))
  date.setSeconds(0)
  date.setMilliseconds(0)

  return Intl.DateTimeFormat(locale, options).format(date)
}

export const getLocaleAcronym = (
  options: { timeZone: Timezones },
  originDate: Date,
  countryCode: Countries,
) => {
  const acronymList = process?.env?.NEXT_PUBLIC_ACRONYM_COUNTRIES ?? ''
  if (acronymList && !acronymList.includes(countryCode)) {
    return
  }

  return Intl.DateTimeFormat('default', {
    ...options,
    timeZoneName: 'short',
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')?.value
}

export const getLocaleGmt = (
  options: {
    timeZone: Timezones
    timeZoneName?:
      | 'short'
      | 'long'
      | 'shortOffset'
      | 'longOffset'
      | 'shortGeneric'
      | 'longGeneric'
  },
  originDate: Date,
) => {
  return Intl.DateTimeFormat('default', {
    timeZoneName: 'shortOffset',
    ...options,
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
