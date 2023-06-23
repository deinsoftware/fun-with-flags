export type Zone = {
    countryCode: string
    name: string
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
    countryCode: string,
    name: string,
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

/*
ICU (International Components for Unicode)
https://www.localeplanet.com/icu/

Country List
https://www.localeplanet.com/icu/iso3166.html

Language List
https://www.localeplanet.com/icu/iso639.html
*/