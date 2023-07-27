import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'
import { TimeZones } from '@/types/timeZones.types'

export type Zone = {
  countryCode: Countries
  name: TimeZones
}

export type TimeFormat = {
  format: 12 | 24
}

export type DateInformation = {
  originDate: Date
  zone: Zone
  locale?: Locale
  timeFormat: TimeFormat['format']
}

export type ZoneList = {
  originDate: Date
  zoneList: Zone[]
  locale?: Locale
  timeFormat: TimeFormat['format']
}

export type EventDate = {
  countryCode: Countries
  name: TimeZones
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
