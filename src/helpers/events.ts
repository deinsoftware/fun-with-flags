import { DateInformation, Zone, ZoneList, EventDate } from './events.types'

import {
  convertGmtToNumber,
  getLocaleAcronym,
  getLocaleDate,
  getLocaleGmt,
  getLocaleTime,
} from './dates'

import { isValidTimeZone, getRegionNames } from './timezones'

export const getDateInformation = ({
  originDate,
  zone,
  locale,
  timeFormat,
}: DateInformation) => {
  const options = {
    timeZone: zone.name,
  }

  if (!isValidTimeZone(zone.name)) {
    throw new Error(`Incompatible Time Zone: ${zone.name}`)
  }

  const date = getLocaleDate(options, originDate)
  const time = getLocaleTime(options, originDate)
  const gmt = getLocaleGmt(
    { ...options, timeZoneName: 'shortOffset' },
    originDate,
  )
  const acronym = getLocaleAcronym(options, originDate, zone.countryCode) ?? gmt
  const offset = convertGmtToNumber(gmt ?? '')

  const i18n = {
    region: getRegionNames(zone.countryCode, locale),
    timestamp: originDate.toLocaleString(locale, {
      ...options,
      hour12: timeFormat == 12,
    }),
    date: originDate.toLocaleDateString(locale, { ...options }),
    time: originDate.toLocaleTimeString(locale, {
      ...options,
      hourCycle: 'h23',
      hour12: timeFormat == 12 || undefined,
      hour: 'numeric',
      minute: 'numeric',
    }),
  }

  const eventDate: EventDate = {
    ...zone,
    date,
    time,
    acronym,
    gmt,
    offset,
    i18n,
  }

  return eventDate
}

export const getDatesList = ({
  originDate,
  zoneList,
  locale,
  timeFormat,
}: ZoneList) => {
  return zoneList.map((zone: Zone) => {
    const dateInformation: DateInformation = {
      originDate,
      zone,
      locale,
      timeFormat,
    }
    return getDateInformation(dateInformation)
  })
}

export const sortDatesList = (eventList: EventDate[]) => {
  return eventList.sort((a, z) => {
    type Sort = {
      date: number
      offset?: number
      countryCode: number
    }

    const sort: Sort = {
      date: Date.parse(a.date) - Date.parse(z.date),
      offset: a.offset && z.offset ? a.offset - z.offset : undefined,
      countryCode: a.countryCode.localeCompare(z.countryCode),
    }

    return sort.date || sort.offset || sort.countryCode
  })
}
