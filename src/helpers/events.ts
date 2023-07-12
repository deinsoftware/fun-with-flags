import { DateInformation, Zone, ZoneList, EventDate } from './events.types'

import {
  convertGmtToNumber,
  getAcronym,
  getDate,
  getGmt,
  getRegionNames,
  getTime,
  isValidTimeZone,
} from './dates'

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

  const date = getDate(options, originDate)
  const time = getTime(options, originDate)
  const acronym = getAcronym(options, originDate)
  const gmt = getGmt(options, originDate)
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
      hour12: timeFormat == 12,
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
