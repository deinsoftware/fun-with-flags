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

/*
ICU (International Components for Unicode)
https://www.localeplanet.com/icu/

Country List
https://www.localeplanet.com/icu/iso3166.html

Language List
https://www.localeplanet.com/icu/iso639.html
*/