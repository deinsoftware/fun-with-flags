import { Countries } from "./countries.types"
import { TimeZones } from "./timeZones.types"

export type Zone = {
    capital: string
    initial: string
    offset: Number
    dst: boolean
    zoneNames: TimeZones[]
}

export type Country = {
    id: string
    countryCode: Countries
    regionName?: String
    timeZone: Zone[]
}