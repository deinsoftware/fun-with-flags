import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'
import { Timezones } from '@/types/timezones.types'

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

export const addDateYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() + years)
  return date
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
  try {
    const isoDate = `${date}T${time}${gmt}`
    return new Date(isoDate).toISOString()
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return ''
  }
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

export const getLocaleDayPeriod = (locale: string) => {
  console.log(locale)
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
