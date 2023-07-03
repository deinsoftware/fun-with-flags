import {Countries} from '@/shared/types/countries.types'
import {TimeZones} from '@/shared/types/timeZones.types'

export type Zone = {
    countryCode: Countries
    name: TimeZones
}

export type DateInformation = {
    originDate: Date
    zone: Zone
    locale: string
    timeFormat: (12 | 24)
}

export type ZoneList = {
    originDate: Date
    zoneList: Zone[],
    locale: string
    timeFormat: (12 | 24)
}

export type EventDate = {
    countryCode: Countries,
    name: TimeZones,
    date: string,
    time: string,
    acronym: string | undefined,
    gmt: string | undefined,
    offset: number | null,
    i18n: {
      region: string | undefined,
      timestamp: string,
      date: string,
      time: string
    }
  }
