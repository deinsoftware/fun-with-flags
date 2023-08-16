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

export const extractDate = (date: Date) => {
  let year = date.getFullYear()
  let month = String(date.getMonth() + 1).padStart(2, '0')
  let day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const extractTime = (date: Date) => {
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return `${hour}:${minute}:${second}`
}

export const joinISODate = (date: string, time: string, gmt: string = 'Z') => {
  const isoDate = `${date}T${time}${gmt}`
  return new Date(isoDate).toISOString()
}

export const getLocaleDate = (
  options: { timeZone: TimeZones },
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
  options: { timeZone: TimeZones },
  originDate: Date,
) => {
  return originDate.toLocaleTimeString('en-CA', {
    ...options,
    hour12: false,
  })
}

export const getLocaleAcronym = (
  options: { timeZone: TimeZones },
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
    timeZone: TimeZones
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
