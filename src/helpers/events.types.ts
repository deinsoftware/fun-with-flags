import {Countries} from '@/shared/types/countries.types'
import {Locale} from '@/shared/types/locale.types'
import {TimeZones} from '@/shared/types/timeZones.types'

export type Zone = {
    countryCode: Countries
    name: TimeZones
}

export type DateInformation = {
    originDate: Date
    zone: Zone
    locale?: Locale
    timeFormat: (12 | 24)
}

export type ZoneList = {
    originDate: Date
    zoneList: Zone[],
    locale?: Locale
    timeFormat: (12 | 24)
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
