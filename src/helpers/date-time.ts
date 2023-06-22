
import {DateInformation} from './date-time.types'

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

export const convertGmtToNumber = (gmtTime: string): number | null => {
    if (!gmtTime) return null
    console.log(gmtTime)

    const time = gmtTime.replace('GMT', '')

    if (!time.includes(':')) {
        return parseInt(time, 10)
    }

    return time.split(':').reduce(function (seconds, time) {
        return +time + seconds * 60;
    }, 0) / 60;
}

export const getDateInformation = ({originDate, zone, locale, timeFormat}: DateInformation) => {
    const options = {
        timeZone: zone.name
    }

    if (!isValidTimeZone(zone.name)) {
        throw new Error(`Incompatible Time Zone: ${zone.name}`)
    }

    const date = originDate.toLocaleDateString(
        'en-CA', { ...options })

    const time = originDate.toLocaleTimeString(
        'en-CA', { ...options, hour12: false })

    const acronym = Intl.DateTimeFormat(
        'default',
        { ...options, timeZoneName: "short" })
        ?.formatToParts(originDate)
        ?.find(({ type }) => type == 'timeZoneName')
        ?.value

    const gmt = Intl.DateTimeFormat(
        'default',
        { ...options, timeZoneName: "shortOffset" })
        ?.formatToParts(originDate)
        ?.find(({ type }) => type == 'timeZoneName')
        ?.value

    const offset = convertGmtToNumber(gmt ?? "")

    const regionNames = new Intl.DisplayNames(locale, { type: 'region' });

    const i18n = {
        region: regionNames.of(zone.countryCode),
        timestamp: originDate.toLocaleString(locale, { ...options, hour12: (timeFormat == 12) }),
        date: originDate.toLocaleDateString(locale, { ...options }),
        time: originDate.toLocaleTimeString(locale, { ...options, hour12: (timeFormat == 12) })
    }

    return {
        ...zone,
        date,
        time,
        acronym,
        gmt,
        offset,
        i18n
    }
}