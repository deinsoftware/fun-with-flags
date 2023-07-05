import { Countries } from '../shared/types/countries.types'
import { TimeZones } from '../shared/types/timeZones.types'

export type FlagZone = {
  capital: boolean
  initial: string
  offset: Number
  dst: boolean
  zoneNames: TimeZones[]
}

export type FlagCountry = {
  id: string
  countryCode: Countries
  regionName?: String
  timeZone: FlagZone[]
}
