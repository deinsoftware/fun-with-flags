import { Countries } from '@/shared/types/countries.types'
import { Locale } from '@/shared/types/locale.types'
import { DateInformation, Zone, ZoneList, EventDate } from './date-time.types'

export const isValidTimeZone = (timeZone: string): boolean => {
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

export const convertGmtToNumber = (gmtTime: string) => {
  if (!gmtTime) return null

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

  const date = originDate.toLocaleDateString('en-CA', { ...options })

  const time = originDate.toLocaleTimeString('en-CA', {
    ...options,
    hour12: false,
  })

  const acronym = Intl.DateTimeFormat('default', {
    ...options,
    timeZoneName: 'short',
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')?.value

  const gmt = Intl.DateTimeFormat('default', {
    ...options,
    timeZoneName: 'shortOffset',
  })
    ?.formatToParts(originDate)
    ?.find(({ type }) => type == 'timeZoneName')?.value

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
