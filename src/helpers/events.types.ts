import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'
import { Timezones } from '@/types/timezones.types'

export type TimeFormat = 12 | 24

export type Zone = {
  countryCode: Countries
  name: Timezones
}

export type DateInformation = {
  originDate: Date
  zone: Zone
  locale?: Locale
  timeFormat: TimeFormat
}

export type ZoneList = {
  originDate: Date
  zoneList: Zone[]
  locale?: Locale
  timeFormat: TimeFormat
}

export type EventDate = {
  countryCode: Countries
  name: Timezones
  date: string
  time: string
  acronym?: string
  gmt?: string
  offset?: number
  i18n: {
    region?: string
    timestamp: string
    date: string
    time: string
  }
}
