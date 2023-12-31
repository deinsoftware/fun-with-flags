import { DateTimeFormatOptions } from 'next-intl'

import { TimeFormat } from './events.types'

import { DatePattern, GmtPattern, TimePattern } from '@/types/dates.types'

import { Countries } from '@/types/countries.types'
import { TimezoneNames, Timezones } from '@/types/timezones.types'

const arrayHours = Array.from(Array(11).keys(), (num) =>
  (num + 1).toString().padStart(2, '0'),
)
export const arrayHours12 = ['12', ...arrayHours, '12', ...arrayHours]

export const arrayHours24 = Array.from(Array(24).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

export const arrayMinutes = Array.from(Array(60).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

export const addYearsToDate = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() + years)
  return date
}

export const daysBetweenDates = (startDate: Date, endDate: Date) => {
  const ONE_DAY = 1000 * 60 * 60 * 24
  return Math.round((endDate.getTime() - startDate.getTime()) / ONE_DAY)
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

  return `${hour}:${minute}` as TimePattern
}

export const joinISODate = (
  date: DatePattern,
  time: TimePattern,
  gmt: GmtPattern = 'Z',
) => {
  const isoDate = `${date}T${time}:00${gmt}`
  return new Date(isoDate).toISOString()
}

export const getLocaleDate = (
  options: { timeZone: Timezones },
  originDate: Date,
): DatePattern => {
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
  return `${year}-${month}-${day}` as DatePattern
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
    const options: DateTimeFormatOptions = { hour: 'numeric' };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const parts = formatter.formatToParts(date);
    const dayPeriodPart = parts.find(part => part.type === 'dayPeriod');
    const value = dayPeriodPart?.value ?? defaultValue;
    return value;
  };

  const am = getDatePartValue(new Date().setHours(0, 0, 0, 0), 'AM');
  const pm = getDatePartValue(new Date().setHours(23, 0, 0, 0), 'PM');

  return { am, pm };
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
    hour12: format == 12,
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
    ?.find(({ type }) => type == 'timeZoneName')
    ?.value?.replace('GMT', '')
}

export const formatTime = (
  time: string,
  timeFormat: TimeFormat,
  hideMinutes: boolean = false,
) => {
  if (!hideMinutes) return time

  const hour = time.split(':', 1)
  const meridian = time.split(' ').pop()
  const suffix = timeFormat === 12 ? meridian : 'H'
  return `${hour} ${suffix}`
}

export const formatGmt = (
  gmt: GmtPattern,
  timeZoneName: TimezoneNames,
  showInitial = true
) => {
  const isNumber = gmt.startsWith('-') || gmt.startsWith('+')
  const initial = timeZoneName === 'longOffset' ? 'GMT: ' : 'GMT'
  const text = showInitial && isNumber ? initial : ''
  const value = gmt === 'Z' ? 'UTC' : gmt

  return `(${showInitial ? text : ''}${value})`
};

export const getLocaleGmt = (
  options: {
    timeZone: Timezones
    timeZoneName: TimezoneNames
  },
  originDate: Date,
): GmtPattern => {
  return (Intl.DateTimeFormat('default', {
    ...options,
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')
    ?.value?.replace('GMT', '') || 'Z') as GmtPattern
}

export const convertGmtToNumber = (gmtTime: GmtPattern) => {
  if (gmtTime === 'Z') return 0

  if (!gmtTime.includes(':')) {
    return parseInt(gmtTime, 10)
  }

  return (
    gmtTime.split(':').reduce(function (seconds, time) {
      return +time + seconds * 60
    }, 0) / 60
  )
}

export const getUserTimeFormat = (): TimeFormat => {
  const dateString = new Date(
    Date.UTC(1970, 0, 1, 0, 0, 0),
  ).toLocaleTimeString()

  const regExp = /am|pm/i
  return regExp.test(dateString) ? 12 : 24
}
